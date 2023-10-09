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
        maxlength: 60,
      },
      commentAuthor: {
        type: String,
        required: true,
      },
      createdAt: {
        type: Date,
        default: Date.now,
        get: (timestamp) => dateFormat(timestamp),
      },
    },
  ],
});

const Post = model("Post", postSchema);

module.exports = Post;
