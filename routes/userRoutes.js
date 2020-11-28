const router = require("express").Router();
const User = require("../models/userModel");
const Confirm = require("../models/confirmModel");
var crypto = require("crypto");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const auth = require("../middleware/auth");
const nodemailer = require("nodemailer");

// register an account
router.post("/register", async (req, res) => {
  try {
    const { email, password, passwordCheck, displayName } = req.body;

    // validation (need one conditional for email validation)
    if (!email || !password || !passwordCheck || !displayName)
      return res.status(400).json({ msg: "Not all fields have been entered!" });

    if (password.length < 8)
      return res
        .status(400)
        .json({ msg: "Password needs to be at least 8 characters long!" });

    if (password !== passwordCheck)
      return res.status(400).json({ msg: "Password not match!" });

    const existingUser = await User.findOne({ email: email });

    if (existingUser)
      return res
        .status(400)
        .json({ msg: "An account with this email already exists!" });

    const salt = await bcrypt.genSalt();
    const passwordHash = await bcrypt.hash(password, salt);

    const newUser = new User({
      email,
      password: passwordHash,
      displayName,
    });

    const confirmToken = new Confirm({
      authorId: newUser._id,
      token: crypto.randomBytes(16).toString("hex"),
    });

    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: "coffeelogzz2208@gmail.com",
        pass: process.env.EPASS,
      },
    });

    const mailOptions = {
      from: "coffeelogzz2208@gmail.com",
      to: newUser.email,
      subject: "Confirm your account",
      text:
        "Thanks for signing up! Confirm your account here: \n http://localhost:3000/confirm_account/" +
        confirmToken.token,
    };

    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.log(error);
      } else {
        console.log("Email sent: " + info.response);
      }
    });

    await confirmToken.save();
    const savedUser = await newUser.save();

    res.json(savedUser);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// login user
router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    // validation
    if (!email || !password)
      return res.status(400).json({ msg: "Not all fields have been entered!" });

    const user = await User.findOne({ email: email });

    if (!user)
      return res
        .status(400)
        .json({ msg: "No account with this email has been registered." });

    if (!user.confirmed)
      return res
        .status(401)
        .json({ msg: "This account needs to be confirmed." });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ msg: "Invalid credentials!" });

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "24h",
    });

    res.json({
      token,
      user: {
        id: user._id,
        displayName: user.displayName,
      },
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.delete("/delete", auth, async (req, res) => {
  try {
    const deletedUser = await User.findByIdAndDelete(req.user);
    res.json(deletedUser);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.post("/tokenIsValid", async (req, res) => {
  try {
    const token = req.header("x-auth-token");
    if (!token) return res.json(false);

    const verified = jwt.verify(token, process.env.JWT_SECRET);
    if (!verified) return res.json(false);

    const user = await User.findById(verified.id);
    if (!user) return res.json(false);

    return res.json(true);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.get("/", auth, async (req, res) => {
  const user = await User.findById(req.user);

  if (!user.confirmed) {
    res.json({ confirmed: user.confirmed });
  } else {
    res.json({
      displayName: user.displayName,
      id: user._id,
      confirmed: user.confirmed,
    });
  }
});

module.exports = router;
