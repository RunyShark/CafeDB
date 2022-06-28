const { request, response } = require("express");

const cargarArchivo = async (req = request, res = response) => {
  if (!req.files || Object.keys(req.files).length === 0 || !req.files.archivo) {
    const error = new Error("No hay archivos en la peticion");
    return res.status(400).json({ msg: error.message });
  }
};

module.exports = {
  cargarArchivo,
};
