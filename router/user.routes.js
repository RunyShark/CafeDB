const { Router } = require("express");
const { check } = require("express-validator");
const validarCampos = require("../middlewares/validarCampos");
const Role = require("../models/role");
const { usuarioGet, usuarioPost } = require("../controllers/user.controller");
require("colors");
const router = Router();

router.get("/", usuarioGet);
router.post(
  "/",
  [
    check("nombre", "El nombre es obligatorio").not().isEmpty(),
    check("correo", "El correo no es valido").isEmail(),
    check(
      "password",
      "La contraseña es obligatoria y debe de tener mas de 6 letras"
    ).isLength({ min: 6, max: 15 }),
    check("rol").custom(async (rol = "") => {
      const existeRol = await Role.findOne({ rol });
      if (!existeRol) {
        throw new Error(`${"El rol no existe".red} ${rol}`);
      }
    }),
    // check("rol", "El rol es obligatorio").isIn(["ADMIN_ROLE", "USER_ROLE"]),
    validarCampos,
  ],
  usuarioPost
);

module.exports = router;
