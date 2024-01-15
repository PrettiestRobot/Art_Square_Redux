const { User, Post, Tag } = require("../models");
const { signToken, AuthenticationError } = require("../utils/auth");

const resolvers = {
  Query: {
    users: async () => {
      return User.find().populate(["posts", "followed"]);
    },
    user: async (parent, { username }) => {
      return User.findOne({ username }).populate(["posts", "followed"]);
    },
    userById: async (parent, { id }) => {
      return User.findById(id).populate(["posts", "followed"]);
    },
    posts: async (parent, { username }) => {
      const params = username ? { username } : {};
      return Post.find(params).sort({ createdAt: -1 }).populate("postAuthor");
    },
    post: async (parent, { postId }) => {
      return Post.findOne({ _id: postId })
        .populate("postAuthor")
        .populate("comments.commentAuthor")
        .populate("tags");
    },
    isUserFollowed: async (_, { userId, followedId }) => {
      const user = await User.findById(userId);
      return user.followed.includes(followedId);
    },
    followedUsers: async (_, { ids }) => {
      return await User.find({ _id: { $in: ids } }).populate(["posts"]);
    },

    searchPosts: async (_, { searchString }) => {
      // Find matching tags first
      const matchingTags = await Tag.find({
        tagName: { $regex: searchString, $options: "i" },
      });

      // Extract the tag IDs
      const tagIds = matchingTags.map((tag) => tag._id);

      // Find posts that match postName or have one of the matching tag IDs
      return await Post.find({
        $or: [
          { postName: { $regex: searchString, $options: "i" } },
          { tags: { $in: tagIds } },
        ],
      });
    },
  },

  Mutation: {
    addUser: async (parent, { username, email, password }) => {
      const user = await User.create({ username, email, password });
      const token = signToken(user);
      return { token, user };
    },

    login: async (parent, { email, password }) => {
      const user = await User.findOne({ email });

      if (!user) {
        throw AuthenticationError;
      }

      const correctPw = await user.isCorrectPassword(password);

      if (!correctPw) {
        throw AuthenticationError;
      }

      const token = signToken(user);

      return { token, user };
    },

    addFollow: async (parent, { userId, followedId }) => {
      const user = await User.findById(userId);
      if (!user.followed.includes(followedId)) {
        user.followed.push(followedId);
        await user.save();
      }
      return user;
    },

    addPost: async (parent, { postName, imageUrl, userId }, context) => {
      const user = await User.findById(userId);

      if (!user) {
        throw new Error("User not found!");
      }

      const post = await Post.create({
        postName,
        postAuthor: user,
        imageUrl,
      });

      await User.findByIdAndUpdate(userId, {
        $addToSet: { posts: post._id },
      });

      return post;
    },

    addComment: async (
      parent,
      { postId, commentText, commentAuthor, username }
    ) => {
      return Post.findOneAndUpdate(
        { _id: postId },
        {
          $addToSet: { comments: { commentText, commentAuthor, username } },
        },
        {
          new: true,
          runValidators: true,
        }
      );
    },

    addRating: async (parent, { postId, rating, ratingAuthor }) => {
      return Post.findOneAndUpdate(
        { _id: postId },
        {
          $addToSet: { ratings: { rating, ratingAuthor } },
        },
        {
          new: true,
          runValidators: true,
        }
      );
    },

    addTagToPost: async (_, { postId, tag }) => {
      try {
        // Find the post
        const post = await Post.findById(postId);

        // Check if the tag already exists
        let existingTag = await Tag.findOne({ tagName: tag });

        // If the tag doesn't exist, create a new one
        if (!existingTag) {
          existingTag = new Tag({ tagName: tag });
          existingTag = await existingTag.save();
        }

        // Update the post to associate it with the tag
        if (!post.tags.includes(existingTag._id)) {
          post.tags.push(existingTag._id);
          await post.save();
        }

        // Update the tag to associate it with the post
        if (!existingTag.posts.includes(postId)) {
          existingTag.posts.push(postId);
          await existingTag.save();
        }

        return Post.findById(postId).populate("tags");
      } catch (error) {
        console.error("Error adding tag:", error);
        throw error;
      }
    },

    removeFollow: async (parent, { userId, followedId }) => {
      const user = await User.findById(userId);
      const index = user.followed.indexOf(followedId);
      if (index > -1) {
        user.followed.splice(index, 1);
        await user.save();
      }
      return user;
    },

    removePost: async (parent, { postId }) => {
      return Post.findOneAndDelete({ _id: postId });
    },

    removeComment: async (parent, { postId, commentId }) => {
      return Post.findOneAndUpdate(
        { _id: postId },
        { $pull: { comments: { _id: commentId } } },
        { new: true }
      );
    },

    removeTagFromPost: async (_, { postId, tagId }) => {
      try {
        // Remove the tag ID from the tags array of the specified Post document
        await Post.findByIdAndUpdate(postId, { $pull: { tags: tagId } });

        // Remove the post ID from the posts array of the specified Tag document
        await Tag.findByIdAndUpdate(tagId, { $pull: { posts: postId } });

        // Find the tag and check if it has any more associated posts
        const tag = await Tag.findById(tagId);
        if (!tag.posts || tag.posts.length === 0) {
          // If no more associated posts, you can delete the tag
          await Tag.findByIdAndRemove(tagId);
        }

        return Post.findById(postId).populate("tags");
      } catch (error) {
        console.error("Error removing tag:", error);
        throw error;
      }
    },

    async updateUsername(_, { userId, newUsername }) {
      return await User.findByIdAndUpdate(
        userId,
        { username: newUsername },
        { new: true }
      );
    },

    async updateProfilePicture(_, { userId, newProfilePicture }) {
      return await User.findByIdAndUpdate(
        userId,
        { profilePicture: newProfilePicture },
        { new: true }
      );
    },
  },

  Post: {
    averageRating: async (parent) => {
      // 'parent' contains the current post object
      const ratings = parent.ratings;

      // Check if there are no ratings
      if (!ratings.length) return 0;

      // Sum up all ratings
      const total = ratings.reduce((acc, curr) => acc + curr.rating, 0);

      // Return average
      return total / ratings.length;
    },
  },
};

module.exports = resolvers;
