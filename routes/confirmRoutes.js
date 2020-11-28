const router = require("express").Router();
const Confirm = require("../models/confirmModel");

router.post("/", async (req, res) => {
  console.log(req.body);

  try {
    const confirmationToken = await Confirm.find({ token: req.body.token });
    console.log(confirmationToken);
    res.send(confirmationToken);
  } catch (err) {
    res.send({ err: "problems" });
  }
});
router.post("/resend", (req, res) => {});

module.exports = router;
