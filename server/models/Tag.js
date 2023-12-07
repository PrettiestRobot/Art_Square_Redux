const { Schema, model } = require("mongoose");

const tagSchema = new Schema({
  tagName: {
    type: String,
    required: true,
    unique: true,
    trim: true,
  },
  posts: [
    {
      type: Schema.Types.ObjectId,
      ref: "Post",
    },
  ],
});

const Tag = model("Tag", tagSchema);

module.exports = Tag;
