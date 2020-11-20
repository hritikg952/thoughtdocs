const User = require("../model/user");
const Post = require("../model/post");

exports.getUserById = (req, res, next, id) => {
  User.findById(id).exec((err, user) => {
    if (err) {
      return res.status(400).json({
        error: "User not found in DB",
      });
    }

    req.profile = user;
    next();
  });
};

exports.getUser = (req, res) => {
  //for security reasons salt and encrypted password are
  //not shown as they are sensetive fields
  req.profile.salt = undefined;
  req.profile.encry_password = undefined;
  //these two are just not really relevent to user
  req.profile.updatedAt = undefined;
  return res.json(req.profile);
};

exports.getAllUser = (req, res) => {
  User.find()
    // .populate("post", "title")
    .exec((err, user) => {
      if (err) {
        return res.status(400).json({
          error: "no user in DB",
        });
      }
      res.json(user);
    });
};

exports.updateUser = (req, res) => {
  User.findByIdAndUpdate(
    { _id: req.profile._id },
    { $set: req.body },
    { new: true, useFindAndModify: false },
    (err, user) => {
      if (err) {
        return res.status(400).json({
          error: "Update not Authorized",
        });
      }
      user.salt = undefined;
      user.encry_password = undefined;
      res.json(user);
    }
  );
};

exports.updateProfileImage = (req, res) => {
  console.log(req.file)
  User.findByIdAndUpdate(
    { _id: req.profile._id },
    {
      $set: {
        profileImage: req.file.path,
      },
    },
    { new: true, useFindAndModify: false },
    (err, user) => {
      if (err) {
        return res.status(400).json({
          error: "Image Update not Authorized",
        });
      }
      user.salt = undefined;
      user.encry_password = undefined;
      res.json(user);
    }
  );
};

exports.userPostList = (req, res) => {
  Post.find({ author: req.profile._id })
    .populate("author", "name lastname _id")
    .exec((err, post) => {
      if (err) {
        return res.status(400).json({
          error: "No post in this account",
        });
      }
      res.json(post);
    });
};

//pushing post in user's post list
exports.pushPostInPostList = (req, res, next) => {
  let posts = [];
  posts.push({
    _id: req.profile._id,
    author: req.profile.name,
    post_id: post._id,
    title: req.body.title,
    content: req.body.content,
  });
  User.findOneAndUpdate(
    { _id: req.profile._id },
    { $push: { posts: posts } },
    { new: true },
    (err, posts) => {
      if (err) {
        return res.status(400).json({
          error: "Unable to save Post in list",
        });
      }
      // next();
    }
  );
};

// exports.pushPostIdInPostList=(req,res)=>{
//   User.findOneAndUpdate(
//     { _id: req.profile._id },
//     { $push: { posts: {id: post._id} } },
//     { new: true },
//     (err, posts) => {
//       if (err) {
//         return res.status(400).json({
//           error: "Unable to push PostId in PostList",
//         });
//       }
//       // next();
//     }
//   );
// }

exports.updatePostNumber = (req, res, next) => {
  User.bulkWrite(
    [
      {
        updateOne: {
          filter: { _id: req.profile._id },
          update: { $inc: { postnumber: +req.profile.posts.count } },
        },
      },
    ],
    {},
    (err, post) => {
      if (err) {
        return res.status(400).json({
          error: "Bulk operation failed",
        });
      }
      next();
    }
  );
};
