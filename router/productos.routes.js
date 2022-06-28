const { Router } = require("express");
const { check } = require("express-validator");
const {
  obtenerProductos,
  obtenerProducto,
  actualizarProducto,
  borrarProducto,
  agregarProducto,
} = require("../controllers/productos.controller");
const { validarCampos } = require("../middlewares/validar-campos");
const existeProducto = require("../middlewares/existeProducto");
const existeCategoria = require("../middlewares/existeCategoria");
const { validarJWT } = require("../middlewares/validar-JWT");
const { tieneRole } = require("../middlewares/validar-Rol");
const router = Router();

router.get("/", obtenerProductos);
router.get(
  "/:id",
  [
    check("id", "El id no es valido").isMongoId(),
    check("id").custom(existeProducto),
    validarCampos,
  ],
  obtenerProducto
);
router.put(
  "/:id",
  [
    validarJWT,
    //check("categoria", "El id no es valido").isMongoId(),
    check("id").custom(existeProducto),
    validarCampos,
  ],
  actualizarProducto
);
router.delete(
  "/:id",
  [
    validarJWT,
    tieneRole("ADMIN_ROLE"),
    check("id", "El id no es valido").isMongoId(),
    check("id").custom(existeProducto),
    validarCampos,
  ],
  borrarProducto
);
router.post(
  "/",
  [
    validarJWT,
    check("nombre", "El campo nombre es obligatorio").not().isEmpty(),
    check("categoria", "El campo categorias es obligatorio").isMongoId(),
    check("categoria").custom(existeCategoria),
    validarCampos,
  ],
  agregarProducto
);

module.exports = router;
