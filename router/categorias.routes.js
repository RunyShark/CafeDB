const { Router } = require("express");
const { check } = require("express-validator");
const { validarCampos } = require("../middlewares/validar-campos");
const {
  categoriaGet,
  categoriaPost,
  categoriaPut,
  categoriaDelete,
} = require("../controllers/categorias.controller");

const router = Router();

router.get("/", categoriaGet);
router.post("/", categoriaPost);
router.put("/", categoriaPut);
router.delete("/", categoriaDelete);

module.exports = router;
