const { Router } = require("express");
const galletas = require("../controllers/categorias.controller");

const router = Router();

router.get("/", galletas);

module.exports = router;
