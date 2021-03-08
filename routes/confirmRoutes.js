const { confirmUser } = require("../controllers/confirmController");

const router = require("express").Router();

router.post("/", confirmUser);

module.exports = router;
