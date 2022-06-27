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

router.use("/", get);
router.use("/", post);
router.use("/", put);
router.use("/", delee);

module.exports = router;
