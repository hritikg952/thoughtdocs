const jwt = require("jsonwebtoken");
const expressJwt = require("express-jwt");

const secret = process.env.SECRET || "localStringSecretKey"

const User = require("../model/user"); //User Model is imported to Update it with Auth process
const { check, validationResult } = require("express-validator");

//**SIGNUP route */
exports.signup = (req, res) => {
  //if error
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(422).json({
      error: errors.array()[0].msg,
      param: errors.array()[0].param,
    });
  }
  //if no error
  const user = new User(req.body);
  user.save((err, user) => {
    if (err) {
      return res.status(400).json({
        error: "Not able to save in DB",
      });
    }
    res.json({
      name: user.name,
      email: user.email,
      id: user._id,
    });
  });
};

//**SIGNIN route */
exports.signin = (req, res) => {
  const { email, password } = req.body;
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(422).json({
      error: errors.array()[0].msg,
      param: errors.array()[0].param,
    });
  }

  //by using "findOne" method find user by its email and then check if email
  // and password exists and they match or not
  User.findOne({ email }, (err, user) => {
    if (err || !user) {
      return res.status(400).json({
        error: "Email not found",
      });
    }

    if (!user.authenticate(password)) {
      return res.status(400).json({
        error: "Email and password does not match",
      });
    }

    //create token
    const token = jwt.sign({ _id: user._id }, secret);
    //put token in cookie
    res.cookie("token", token, { expire: new Date() + 9999 });

    //send response to front end
    const { _id, name, lastname, email, role, profileImage } = user;
    return res.json({
      token,
      user: { _id, name, email, lastname, role, profileImage },
    });
  });
};

//**SIGNOUT route */

exports.signout = (req, res) => {
  res.clearCookie("token");
  res.json({
    message: "User SIGNED OUT successfully",
  });
};

//?protected route */

//**isSignedIn route */

exports.isSignedIn = expressJwt({
  secret: secret,
  userProperty: "auth",
});

//**isAuthenticated middleware */
exports.isAuthenticated = (req, res, next) => {
  const checker = req.profile && req.auth && req.profile._id == req.auth._id;
  if (!checker) {
    return res.status(403).json({
      error: "ACCESS DENIED",
    });
  }
  next();
};

//**isAdmin middleware */
exports.isAdmin = (req, res, next) => {
  if (req.profile.role === 0) {
    return req.status(403).json({
      error: "You are not ADMIN, ACCESS DENIED",
    });
  }
  next();
};
