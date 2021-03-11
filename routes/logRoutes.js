const router = require("express").Router();
const {
  newLog,
  getUserLogs,
  findLog,
  deleteLog,
  editLog,
} = require("../controllers/logController");
const auth = require("../middleware/auth");
const Log = require("../models/logModel");

router.post("/", auth, newLog);

router.get("/", auth, getUserLogs);

router.get("/find/:id", auth, findLog);

router.delete("/:logid", auth, deleteLog);

router.patch("/edit", auth, editLog);

module.exports = router;
