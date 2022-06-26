const { Router } = require("express");
const { usuarioGet } = require("../controllers/user.controller");

const router = Router();

router.get("/", usuarioGet);

module.exports = router;
