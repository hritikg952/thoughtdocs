const express = require("express");
const router = express.Router();

const {
  getUserById,
  getUser,
  getAllUser,
  updateUser,
  updateProfileImage,
  userPostList,
} = require("../controllers/user");

const parser = require("../middleware-config/cloudinary.config");

//auth controler for middlewares
const { isSignedIn, isAuthenticated, isAdmin } = require("../controllers/auth");
//?PARAM route
router.param("userId", getUserById);

//?READ routes onlyAdmin
router.get(
  "/alluser/:userId",
  isSignedIn,
  isAuthenticated,
  isAdmin,
  getAllUser
);

//?READ routes
router.get("/user/:userId", getUser);

//?get user post list
router.get("/user/post/:userId",userPostList);

//?UPDATE route
router.put("/user/:userId", isSignedIn, isAuthenticated, updateUser);
router.put(
  "/user/profileImage/:userId",
  isSignedIn,
  isAuthenticated,
  parser.single("profileImage"),
  updateProfileImage
);

module.exports = router;
