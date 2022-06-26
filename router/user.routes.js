const { Router } = require("express");
const { check } = require("express-validator");
const validarCampos = require("../middlewares/validarCampos");
const {
  usuarioGet,
  usuarioPost,
  usuarioPut,
} = require("../controllers/user.controller");
const {
  dbValideitor,
  emailExiste,
  userExisteID,
} = require("../helpers/dbValideitors");
require("colors");
const router = Router();

router.get("/", usuarioGet);
router.put(
  "/:id",
  [
    check("id", "No es un ID valido").isMongoId(),
    check("id").custom(userExisteID),
    check("rol").custom(dbValideitor),
    validarCampos,
  ],
  usuarioPut
);
router.post(
  "/",
  [
    check("nombre", "El nombre es obligatorio").not().isEmpty(),
    check("correo", "El correo no es valido").isEmail(),
    check("correo", "El correo no es valido").custom(emailExiste),
    check(
      "password",
      "La contraseña es obligatoria y debe de tener mas de 6 letras"
    ).isLength({ min: 6, max: 15 }),
    check("rol").custom(dbValideitor),
    // check("rol", "El rol es obligatorio").isIn(["ADMIN_ROLE", "USER_ROLE"]),
    validarCampos,
  ],
  usuarioPost
);

module.exports = router;
