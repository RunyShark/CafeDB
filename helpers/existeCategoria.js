const { Categoria } = require("../models");
require("colors");
const existeCategoria = async (id = "") => {
  const existe = await Categoria.findById(id);
  console.log(existe);
  if (!existe) {
    console.log(`Holaaaaaa`.red);
    throw new Error(`La categoria con el ID: ${id} no existe`);
  }
};

module.exports = existeCategoria;
