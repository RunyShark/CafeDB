const path = require("path");
const { request, response } = require("express");

const cargarArchivo = async (req = request, res = response) => {
  if (!req.files || Object.keys(req.files).length === 0 || !req.files.archivo) {
    const error = new Error("No hay archivos en la peticion");
    return res.status(400).json({ msg: error.message });
  }

  const { archivo } = req.files;

  const uploadPath = path.join(__dirname, "../uploads/", archivo.name);

  archivo?.mv(uploadPath, (err) => {
    if (err) {
      console.log(err.message);
      const error = new Error(`Algo salio mal ${err.message}`);
      return res.status(500).json({ msg: error.message });
    }

    res.json({ msg: `El archivo se subio al path ${uploadPath}` });
  });
};

module.exports = {
  cargarArchivo,
};
