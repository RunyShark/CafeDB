const { validationResult } = require("express-validator");

const validarCampos = async (req, res, next) => {
  try {
    const erros = validationResult(req);
    if (!erros.isEmpty()) {
      return res.status(400).json(erros);
    }
    next();
  } catch (error) {
    console.log(error);
  }
};

module.exports = validarCampos;
