const router = require("express").Router();
const auth = require("../middleware/auth");
const Log = require("../models/logModel");

router.post("/", auth, async (req, res) => {
  try {
    const newLog = new Log({ text: req.body.text, authorId: req.user });
    res.json(await newLog.save());
  } catch (err) {
    res.send(err);
  }
});

router.get("/", auth, async (req, res) => {
  try {
    res.json(await Log.find({ authorId: req.user }));
  } catch (err) {
    res.send(err);
  }
});

module.exports = router;
