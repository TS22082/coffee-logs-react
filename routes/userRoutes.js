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
router.post("/register", createUser);

// login user
router.post("/login", loginUser);

router.delete("/delete", auth, deleteUser);

router.post("/tokenIsValid", checkToken);

router.put("/", auth, getUser);

module.exports = router;
