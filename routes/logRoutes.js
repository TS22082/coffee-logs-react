const router = require("express").Router();
const auth = require("../middleware/auth");
const { findByIdAndUpdate } = require("../models/logModel");
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

router.get("/find/:id", auth, async (req, res) => {
  try {
    res.json(await Log.find({ _id: req.params.id }));
  } catch (err) {
    res.send(err);
  }
});

router.delete("/:logid", auth, async (req, res) => {
  try {
    res.json(await Log.findByIdAndDelete(req.params.logid));
  } catch (err) {
    res.send(err);
  }
});

router.patch("/edit", auth, async (req, res) => {
  try {
    res.json(
      await Log.findByIdAndUpdate(req.body._id, { text: req.body.text })
    );
  } catch (err) {
    res.send(err);
  }
});

module.exports = router;
