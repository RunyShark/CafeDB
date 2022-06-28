const { Router } = require("express");
const { buscar } = require("../controllers/bucar.controller");

const router = Router();

router.get("/", buscar);

module.exports = router;
