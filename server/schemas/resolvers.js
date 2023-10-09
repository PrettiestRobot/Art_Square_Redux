const { User, Post } = require("../models");
const { signToken, AuthenticationError } = require("../utils/auth");

const resolvers = {
  Query: {
    users: async () => {
      return User.find().populate("posts");
    },
    user: async (parent, { username }) => {
      return User.findOne({ username }).populate("posts");
    },
    posts: async (parent, { username }) => {
      const params = username ? { username } : {};
      return Post.find(params).sort({ createdAt: -1 }).populate("postAuthor");
    },
    post: async (parent, { postId }) => {
      return Post.findOne({ _id: postId }).populate("postAuthor");
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

    addComment: async (parent, { postId, commentText, commentAuthor }) => {
      return Post.findOneAndUpdate(
        { _id: postId },
        {
          $addToSet: { comments: { commentText, commentAuthor } },
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
