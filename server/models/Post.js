const { Schema, model } = require("mongoose");
const dateFormat = require("../utils/dateFormat");

const postSchema = new Schema({
  postName: {
    type: String,
    required: "You need to name your post!",
    minlength: 1,
    maxlength: 60,
    trim: true,
  },
  postAuthor: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  imageUrl: {
    type: String,
    required: true,
    trim: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
    get: (timestamp) => dateFormat(timestamp),
  },
  ratings: [
    {
      rating: {
        type: Number,
        required: true,
        min: 1,
        max: 5,
      },
      ratingAuthor: {
        type: Schema.Types.ObjectId,
        ref: "User",
        required: true,
      },
    },
  ],
  comments: [
    {
      commentText: {
        type: String,
        required: true,
        minlength: 1,
        maxlength: 600,
      },
      commentAuthor: {
        type: Schema.Types.ObjectId,
        ref: "User",
        required: true,
      },
      createdAt: {
        type: Date,
        default: Date.now,
        get: (timestamp) => dateFormat(timestamp),
      },
      username: {
        type: String,
        required: true,
        trim: true,
      },
    },
  ],
  tags: [
    {
      type: Schema.Types.ObjectId,
      ref: "Tag",
    },
  ],
});

const Post = model("Post", postSchema);

module.exports = Post;
