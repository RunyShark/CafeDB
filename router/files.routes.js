const { Router } = require("express");
const { check } = require("express-validator");
const {
  cargarArchivo,
  updateImg,
  imgEnviar,
} = require("../controllers/files.controller");
const { colecionesPermitidas } = require("../helpers/dbValideitors");
const { validarCampos } = require("../middlewares/validar-campos");
const validarArchivo = require("../middlewares/validar-archivo");

const router = Router();

router.post("/", validarArchivo, cargarArchivo);
router.put(
  "/:colecion/:id",
  [
    validarArchivo,
    check("id", "El ID no es valido").isMongoId(),
    check("colecion").custom((c) =>
      colecionesPermitidas(c, ["usuarios", "productos"])
    ),
    validarCampos,
  ],
  updateImg
);
router.get(
  "/:colecion/:id",
  check("id", "El ID no es valido").isMongoId(),
  check("colecion").custom((c) =>
    colecionesPermitidas(c, ["usuarios", "productos"])
  ),
  imgEnviar
);

module.exports = router;
