const mongoose = require("mongoose");
const crypto = require("crypto");
const { v4: uuidv4 } = require("uuid");

const { ObjectId } = mongoose.Schema;

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      trim: true,
      required: true,
    },
    lastname: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      trim: true,
      required: true,
      unique: true,
    },
    location: {
      type: String,
      trim: true,
      default: "",
    },
    profile: {
      type: String,
      trim: true,
      default: "",
    },
    profileImage: {
      type: String,
      default: null,
    },
    fbUrl: {
      type: String,
      trim: true,
      default: "",
    },
    instaUrl: {
      type: String,
      trim: true,
      default: "",
    },
    linkInUrl: {
      type: String,
      trim: true,
      default: "",
    },
    role: {
      type: Number,
      default: 0,
    },
    posts: [
      {
        type: ObjectId,
        ref: "Post",
      },
    ],
    salt: String,
    encry_password: {
      type: String,
      required: true,
    },
  },
  { timestamps: { createdAt: "created_at" } }
);

userSchema
  .virtual("password")
  .set(function (password) {
    this._password = password;
    this.salt = uuidv4();
    this.encry_password = this.securePassword(password);
  })
  .get(function () {
    return this._password;
  });

userSchema.methods = {
  authenticate: function (plainpassword) {
    return this.securePassword(plainpassword) === this.encry_password;
  },
  securePassword: function (plainpassword) {
    if (!plainpassword) return "";

    try {
      return crypto
        .createHmac("sha256", this.salt)
        .update(plainpassword)
        .digest("hex");
    } catch (err) {
      return "";
    }
  },
};

module.exports = mongoose.model("User", userSchema);
