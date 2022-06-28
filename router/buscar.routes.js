const { Router } = require("express");
const { check } = require("express-validator");
const { buscar } = require("../controllers/bucar.controller");
const buscarColeciones = require("../controllers/buscarColeciones.controller");

const router = Router();

router.get("/:coleccion", buscar);
router.get("/curs/:model/:termino", buscarColeciones);

module.exports = router;
