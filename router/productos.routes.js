const { Router } = require("express");
const { check } = require("express-validator");
const {
  get,
  post,
  put,
  delee,
} = require("../controllers/productos.controller");
const { validarCampos } = require("../middlewares/validar-campos");

const router = Router();

router.get("/", get);
router.post("/", post);
router.put("/", put);
router.delete("/", delee);

module.exports = router;
