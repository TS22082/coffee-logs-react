const router = require("express").Router();
const Confirm = require("../models/confirmModel");
const User = require("../models/userModel");

router.post("/", async (req, res) => {
  // console.log(req.body);

  try {
    const confirmation = await Confirm.find({ token: req.body.token });
    console.log(confirmation[0].authorId);

    const confirmedUser = await User.findById(confirmation[0].authorId);

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
