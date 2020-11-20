const Post = require("../model/post");

const express = require("express");
const router = express.Router();

const {
  getUserById,
  userPostList,
  pushPostInPostList,
  pushPostIdInPostList,
  updatePostNumber,
} = require("../controllers/user");
const { isSignedIn, isAdmin, isAuthenticated } = require("../controllers/auth");
const {
  getPostById,
  createPost,
  getPost,
  getAllPost,
  updatePost,
  updatePublishStatusInPost,
  deletePost,
} = require("../controllers/post");

//?PARAM route
router.param("userId", getUserById);
router.param("postId", getPostById);

//? CREATE post route
router.post(
  "/post/create/:userId",
  isSignedIn, //should be signed in
  isAuthenticated, //should be authenticated
  //isAdmin, //only admin can create a category
  createPost
  // pushPostInPostList,
  // pushPostIdInPostList,
  //updatePostNumber,
);

//?READ routes
router.get("/post/:userId/:postId", getPost);
router.get("/post", getAllPost);
// router.get("/post/list/:userId", userPostList);

//?UPDATE route
router.put(
  "/post/update/:userId/:postId",
  isSignedIn,
  isAuthenticated,
  updatePost
);
router.put(
  "/post/publishUpdate/:userId/:postId",
  isSignedIn,
  isAuthenticated,
  updatePublishStatusInPost
);

//?DELETE route
router.delete(
  "/post/delete/:userId/:postId",
  isSignedIn,
  isAuthenticated,
  deletePost
);

module.exports = router;
