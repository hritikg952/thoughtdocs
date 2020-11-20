const mongoose = require("mongoose");
const { ObjectId, Mixed } = mongoose.Schema;

const postSchema = new mongoose.Schema(
  {
    author: {
      type: ObjectId,
      ref: "User",
    },
    title: {
      type: String,
      required: true,
      trim: true,
    },
    content: {
      type: String,
      required: true,
    },
    published: {
      type: Boolean,
      required: true,
    },
    comments: [
      {
        type: ObjectId,
        ref: "Comment",
      },
    ],
    likes: {
      type: Number,
      default: 0,
    },
    // photo: {
    //   data: Buffer,
    //   contentType: String,
    // },
  },
  { timestamps: { createdAt: "created_at" } }
);

module.exports = mongoose.model("Post", postSchema);
