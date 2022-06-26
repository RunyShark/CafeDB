const { Router } = require("express");
const { registro } = require("../controllers/login.controller");
const router = Router();

router.get("/", registro);

module.exports = router;
