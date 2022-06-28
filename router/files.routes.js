const { Router } = require("express");
const { check } = require("express-validator");
const { cargarArchivo } = require("../controllers/files.controller");
const { validarCampos } = require("../middlewares/validar-campos");

const router = Router();

router.post("/", cargarArchivo);

module.exports = router;
