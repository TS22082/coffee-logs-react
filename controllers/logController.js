const Log = require("../models/logModel");

module.exports = {
  newLog: async (req, res) => {
    try {
      const newLog = new Log({ text: req.body.text, authorId: req.user });
      res.json(await newLog.save());
    } catch (err) {
      res.send(err);
    }
  },

  getUserLogs: async (req, res) => {
    try {
      res.json(await Log.find({ authorId: req.user }));
    } catch (err) {
      res.send(err);
    }
  },

  findLog: async (req, res) => {
    try {
      res.json(await Log.findOne({ _id: req.params.id }));
    } catch (err) {
      res.send(err);
    }
  },

  deleteLog: async (req, res) => {
    try {
      res.json(await Log.findByIdAndDelete(req.params.logid));
    } catch (err) {
      res.send(err);
    }
  },

  editLog: async (req, res) => {
    try {
      res.json(
        await Log.findByIdAndUpdate(req.body._id, { text: req.body.text })
      );
    } catch (err) {
      res.send(err);
    }
  },
};
