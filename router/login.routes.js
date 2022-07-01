const { Router } = require("express");
const { check } = require("express-validator");
const {
  login,
  googleSingIn,
  renovarToken,
} = require("../controllers/login.controller");
const { validarCampos } = require("../middlewares/validar-campos");
const { validarJWT } = require("../middlewares/validar-JWT");
const router = Router();

router.post(
  "/login",
  [
    check("correo", "El correo es obligatorio").isEmail(),
    check("password", "La contraseña es un campo obligatorio").not().isEmpty(),
    validarCampos,
  ],
  login
);
router.post(
  "/google",
  [
    check("id_token", "Token de google es necesario").not().isEmpty(),
    validarCampos,
  ],
  googleSingIn
);
router.get("/", validarJWT, renovarToken);
module.exports = router;
