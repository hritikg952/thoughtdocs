const express = require("express");
const router = express.Router();

const { check, validationResult } = require("express-validator");
const { signup, signin, signout } = require("../controllers/auth");

router.post(
  "/signup",
  [
    check("name", "name should be at least 3 char").isLength({ min: 3 }),
    check("lastname", "lastname should be at least 3 char").isLength({
      min: 3,
    }),
    check("email", "email is required").isEmail(),
    check("password", "password should be at least 3 char").isLength({
      min: 3,
    }),
  ],
  signup
);

router.post(
  "/signin",
  [
    check("email", "email is required").isEmail(),
    check("password", "password should be at least 3 char").isLength({
      min: 3,
    }),
  ],
  signin
);

router.get("/signout",signout);

module.exports = router;
