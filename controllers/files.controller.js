const { request, response } = require("express");
const subirArchivo = require("../helpers/subir-archivo");

const cargarArchivo = async (req = request, res = response) => {
  if (!req.files || Object.keys(req.files).length === 0 || !req.files.archivo) {
    const error = new Error("No hay archivos en la peticion");
    return res.status(400).json({ msg: error.message });
  }
  try {
    const pathCompleto = await subirArchivo(
      req.files,
      ["txt", "json", "rar"],
      "archv"
    );
    res.json({ msg: "Todo salio bien", nombre: pathCompleto });
  } catch (error) {
    console.log(error.message);
    return res.status(500).json({ msg: `Algo salio mal ${error}` });
  }
};

module.exports = {
  cargarArchivo,
};
