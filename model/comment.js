const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema;

function autoPopulateChildComments(next) {
  this.populate({
    path: "children",
    populate: {
      path: "author",
      select: "name lastname _id",
    },
  });

  next();
}

const commentSchema = mongoose.Schema(
  {
    text: {
      type: String,
      required: true,
      trim: true,
    },
    author: {
      type: ObjectId,
      ref: "User",
    },
    post: {
      type: ObjectId,
      ref: "Post",
    },
    commentType: {
      type: String,
      enum: ["Parent", "Child"],
    },
    children: [
      {
        type: ObjectId,
        ref: "Comment",
      },
    ],
  },
  { timestamps: { createdAt: "created_at" } }
);

commentSchema.pre("findById", autoPopulateChildComments);
commentSchema.pre("find", autoPopulateChildComments);

module.exports = mongoose.model("Comment", commentSchema);
