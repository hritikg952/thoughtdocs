const express = require("express");
const router = express.Router();

const { isSignedIn, isAuthenticated } = require("../controllers/auth");

const { getUserById } = require("../controllers/user");
const { getPostById } = require("../controllers/post");
const {
  getCommentById,
  createComment,
  createChildComment,
  getCommentsByPost,
} = require("../controllers/comment");
const { route } = require("./post");

//?PARAM route
router.param("postId", getPostById);
router.param("userId", getUserById);
router.param("commentId", getCommentById);

//? CREATE comment route
router.post(
  "/comment/post/:postId/:userId",
  isSignedIn,
  isAuthenticated,
  createComment
);

router.post(
  "/child/comment/post/:commentId/:postId/:userId",
  isSignedIn,
  isAuthenticated,
  createChildComment
);

//? READ comment route
router.get("/allComments/post/:postId", getCommentsByPost);

module.exports = router;
