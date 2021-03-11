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

// create new log
// ROUTE: /logs/
router.post("/", auth, newLog);

// get all user logs by auth
// ROUTE: /logs/
router.get("/", auth, getUserLogs);

// find specific user log
// ROUTE: /logs/:id
router.get("/find/:id", auth, findLog);

// delete specific user log
// ROUTE: /logs/:id
router.delete("/:logid", auth, deleteLog);

// edit specific user log, id to edit passed through req.body
// ROUTE: /logs/edit
router.patch("/edit", auth, editLog);

module.exports = router;
