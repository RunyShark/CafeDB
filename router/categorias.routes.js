const { Router } = require("express");
const { check } = require("express-validator");
const { validarCampos } = require("../middlewares/validar-campos");
const { validarJWT } = require("../middlewares/validar-JWT");
const {
  obtenerCategorias,
  categoriaPost,
  obtenerCategoria,
  actutalizarCategorioa,
  borrarCategoria,
} = require("../controllers/categorias.controller");

const router = Router();

router.get("/", obtenerCategorias);
router.get(
  "/:id",
  [check("id", "El ID no es valido").isMongoId(), validarCampos],
  obtenerCategoria
);
router.post(
  "/",
  [
    validarJWT,
    check("nombre", "El nombre es un campo obligatorio").not().isEmpty(),
    validarCampos,
  ],
  categoriaPost
);
router.put(
  "/:id",
  [
    check("id", "El ID no es valido").isMongoId(),
    check("nombre", "El nombre es un campo obligatorio").not().isEmpty(),
    validarCampos,
  ],
  actutalizarCategorioa
);
router.delete(
  "/:id",
  [check("id", "El ID no es valido").isMongoId(), validarCampos],
  borrarCategoria
);

module.exports = router;
