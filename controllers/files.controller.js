const path = require("path");
const fs = require("fs");
const { request, response } = require("express");
const { Usuario, Producto } = require("../models");
const subirArchivo = require("../helpers/subir-archivo");

const cargarArchivo = async (req = request, res = response) => {
  if (!req.files || Object.keys(req.files).length === 0 || !req.files.archivo) {
    const error = new Error("No hay archivos en la peticion");
    return res.status(400).json({ msg: error.message });
  }
  try {
    // const pathCompleto = await subirArchivo(
    //   req.files,-fils
    //   ["txt", "json", "rar"],-expermi
    //   "archv"-carpeta nombre
    // );
    const pathCompleto = await subirArchivo(req.files);
    res.json({ msg: "Todo salio bien", nombre: pathCompleto });
  } catch (error) {
    console.log(error.message);
    return res.status(500).json({ msg: `Algo salio mal ${error}` });
  }
};

const updateImg = async (req = request, res = response) => {
  const { colecion, id } = req.params;

  let modelo;

  switch (colecion) {
    case "usuarios":
      modelo = await Usuario.findById(id);
      if (!modelo) {
        const error = new Error(`El usuario con el ID ${id} no existe`);
        return res.status(400).json({ msg: error.message });
      }
      break;
    case "productos":
      modelo = await Producto.findById(id);
      if (!modelo) {
        const error = new Error(`El usuario con el ID ${id} no existe`);
        return res.status(400).json({ msg: error.message });
      }

      break;
    default:
      return res.status(500).json({ msg: "Olvide validar esto" });
  }

  if (modelo.img) {
    const pathImagen = path.join(__dirname, "../uploads", colecion, modelo.img);
    if (fs.existsSync(pathImagen)) {
      fs.unlinkSync(pathImagen);
    }
  }

  const pathCompleto = await subirArchivo(req.files, undefined, colecion);
  modelo.img = await pathCompleto;
  await modelo.save();
  res.status(201).json({ msg: "Actualizacions correcta", results: [modelo] });
};

const imgEnviar = async (req = request, res = response) => {
  const { colecion, id } = req.params;

  let modelo;

  switch (colecion) {
    case "usuarios":
      modelo = await Usuario.findById(id);
      if (!modelo) {
        const error = new Error(`No se encontro el usuario con el ID ${id}`);
        return res.status(400).json({ msg: error.message });
      }
      break;
    case "productos":
      modelo = await Producto.findById(id);
      if (!modelo) {
        const error = new Error(`No se encontro producto con esas ID ${id}`);
        return res.status(400).json({ msg: error.message });
      }
      break;
    default:
      return res.status(500).json({ msg: "Olvide validar esta ruta" });
  }

  res.json({
    msg: `Imagen del usuiario con el ID ${id}`,
    img: modelo.img ? modelo.img : "No tiene imagen disponible",
  });
};
module.exports = {
  cargarArchivo,
  updateImg,
  imgEnviar,
};
