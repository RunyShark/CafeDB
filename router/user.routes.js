const { Router } = require("express");
const { check } = require("express-validator");
const { usuarioGet, usuarioPost } = require("../controllers/user.controller");

const router = Router();

router.get("/", usuarioGet);
router.post(
  "/",
  [check("correo", "El correo no es valido").isEmail()],
  usuarioPost
);

module.exports = router;
