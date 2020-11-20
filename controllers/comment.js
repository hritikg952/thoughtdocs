const Post = require("../model/post");
const User = require("../model/user");
const Comment = require("../model/comment");

//?PARAM route
exports.getCommentById = (req, res, next, id) => {
  Comment.findById(id).exec((err, comment) => {
    if (err) {
      res.status(400).json({
        error: "Comment does not exist",
      });
    }
    req.comment = comment;
    next();
  });
};

//?CREATE route
exports.createComment = (req, res) => {
  req.body.author = req.profile;
  req.body.post = req.post;
  const comment = new Comment(req.body);
  comment.save((err, comment) => {
    if (err) {
      return res.status(400).json({
        error: "NOT able to save comment in DB",
      });
    }

    let comments = [];
    comments.push({
      _id: comment._id,
      text: comment.text,
      post_id: req.post._id,
      author_id: req.profile._id,
      author_name: req.profile.name,
    });

    Post.findOneAndUpdate(
      { _id: req.post._id },
      { $push: { comments: comments } },
      { new: true },
      (err) => {
        if (err) {
          return res.status(400).json({
            error: "Unable to save comment in comment list of Post",
          });
        }
      }
    );

    return res.json(comment);
  });
};

exports.createChildComment = (req, res) => {
  console.log("profile",req.profile)
  req.body.author = req.profile;
  req.body.post = req.post;
  req.body.comment = req.comment;
  const ChildComment = new Comment(req.body);
  ChildComment.save((err, childComment) => {
    if (err) {
      return res.status(400).json({
        error: "Not able to save comment in DB",
      });
    }

    let comments = [];
    comments.push({
      _id: childComment._id,
    });
    Comment.findByIdAndUpdate(
      { _id: req.comment._id },
      { $push: { children: comments } },
      { new: true },
      (err) => {
        if (err) {
          return res.status(400).json({
            error: "Unable to save comment in children list of comment",
          });
        }
      }
    );

    return res.json(childComment);
  });
};

//?READ routes
exports.getCommentsByPost = (req, res) => {
  Comment.find({ post: req.post._id, commentType: "Parent" })
    .sort({ created_at: -1 })
    .populate("author", "name lastname _id")
    .exec((err, comment) => {
      if (err) {
        return res.status(400).json({
          error: "No Comment of Post in DB",
        });
      }
      return res.json(comment);
    });
};
