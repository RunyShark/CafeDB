const { request, response } = require("express");
const { isValidObjectId } = require("mongoose");
const modelosPermitidas = ["usuarios", "categoria", "productos", "roles"];
const { Categoria, Producto, Usuario } = require("../models");

const buscarUsuarios = async (termino = "", res = response) => {
  const esMogoId = isValidObjectId(termino);

  if (esMogoId) {
    const usuarios = await Usuario.findById(termino);
    return res.json({ results: usuarios ? [usuarios] : [] });
  }

  const regex = new RegExp(termino, "i");

  const usuarios = await Usuario.find({
    $or: [{ nombre: regex }, { correo: regex }],
    $and: [{ estado: true }],
  });

  res.json({ results: usuarios });
};
const buscarCategoria = async (termino = "", res = response) => {
  const esMogoId = isValidObjectId(termino);

  if (esMogoId) {
    const categoria = await Categoria.findById(termino).populate(
      "categorias",
      "nombre"
    );
    return res.json({ results: categoria ? [categoria] : [] });
  }

  const regex = new RegExp(termino, "i");

  const categorias = await Categoria.find({ nombre: regex });

  res.json({ results: categorias });
};
const buscarProducto = async (termino = "", res = response) => {
  const esMogoId = isValidObjectId(termino);

  if (esMogoId) {
    const producto = await Producto.findById(termino).populate(
      "categorias",
      "nombre"
    );
    return res.json({ results: producto ? [producto] : [] });
  }

  const regex = new RegExp(termino, "i");

  const producto = await Producto.find({
    nombre: regex,
  });

  res.json({ results: producto });
};

const buscarColeciones = async (req = request, res = response) => {
  const { model, termino } = req.params;

  if (!modelosPermitidas.includes(model)) {
    const error = new Error(`Los modelos permitodos son ${modelosPermitidas}`);
    return res.status(400).json({ msg: error.message });
  }

  switch (model) {
    case "usuarios":
      buscarUsuarios(termino, res);
      break;
    case "categoria":
      buscarCategoria(termino, res);
      break;
    case "productos":
      buscarProducto(termino, res);
      break;

    default:
      res.status(500).json({ msg: "Esta busqueda no esta disponible" });
  }
};

module.exports = buscarColeciones;
