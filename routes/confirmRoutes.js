const router = require("express").Router();
const Confirm = require("../models/confirmModel");
const User = require("../models/userModel");

router.post("/", async (req, res) => {
  try {
    const confirmation = await Confirm.findOne({ token: req.body.token });
    console.log(confirmation.authorId);

    const confirmedUser = await User.findById(confirmation.authorId);

    confirmedUser.confirmed = true;
    confirmedUser.save();

    res.send("success");
  } catch (err) {
    console.log(err);
    res.send({ err: "problems" });
  }
});
router.post("/resend", (req, res) => {});

module.exports = router;
