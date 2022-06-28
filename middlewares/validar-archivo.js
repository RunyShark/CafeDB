const { request, response } = require("express");
const validarArchivo = async (req = request, res = response, next) => {
  if (!req.files || Object.keys(req.files).length === 0 || !req.files.archivo) {
    const error = new Error(
      "No hay archivos en la peticion -validar Archivo subir"
    );
    return res.status(400).json({ msg: error.message });
  }
  next();
};

module.exports = validarArchivo;
