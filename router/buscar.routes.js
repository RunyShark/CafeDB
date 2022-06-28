const { Router } = require("express");
const { buscar } = require("../controllers/bucar.controller");

const router = Router();

router.get("/:coleccion", buscar);

module.exports = router;
