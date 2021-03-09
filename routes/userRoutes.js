const router = require("express").Router();
const User = require("../models/userModel");
const Confirm = require("../models/confirmModel");
var crypto = require("crypto");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const auth = require("../middleware/auth");
const nodemailer = require("nodemailer");
const {
  createUser,
  loginUser,
  checkToken,
  deleteUser,
  getUser,
} = require("../controllers/userController");

// register an account
// ROUTE: /user/register
router.post("/register", createUser);

// login user
// ROUTE: /user/login
router.post("/login", loginUser);

// delete a user
// ROUTE: /user/delete
router.delete("/delete", auth, deleteUser);

// return user if token is valid
// ROUTE: /user/tokenIsValid
router.get("/tokenIsValid", checkToken);

// get a single user based on auth
// ROUTE: /user/
router.get("/", auth, getUser);

module.exports = router;
