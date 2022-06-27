const { Router } = require("express");
const { check } = require("express-validator");
const { validarCampos } = require("../middlewares/validar-campos");
const galletas = require("../controllers/categorias.controller");

const router = Router();

router.get("/", galletas);

module.exports = router;
