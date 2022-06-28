const { Router } = require("express");
const { file } = require("../controllers/files.controller");

const router = Router();

router.get("/", file);

module.exports = router;
