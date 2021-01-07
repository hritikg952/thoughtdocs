const express = require("express");
const router = express.Router();

const { getUserById } = require("../controllers/user");
const { isSignedIn, isAdmin, isAuthenticated } = require("../controllers/auth");
const {
  getPostById,
  createPost,
  getPost,
  getAllPost,
  getAllPostOnlyPublished,
  getAllPostOnlyPublishedPaginated,
  updatePost,
  updatePublishStatusInPost,
  deletePost,
  toggleLike,
} = require("../controllers/post");

//?PARAM route
router.param("userId", getUserById);
router.param("postId", getPostById);

//? CREATE post route
router.post(
  "/post/create/:userId",
  isSignedIn, //should be signed in
  isAuthenticated, //should be authenticated
  createPost
);

//?READ routes
router.get("/post/:userId/:postId", getPost);
router.get("/postsOnlyPublished", getAllPostOnlyPublished);
router.get("/postsOnlyPublishedPaginated", getAllPostOnlyPublishedPaginated);
router.get("/posts", getAllPost);

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

//?Other services route
//!LIKE
router.post(
  "/post/like/:userId/:postId",
  isSignedIn,
  isAuthenticated,
  toggleLike
);

module.exports = router;
