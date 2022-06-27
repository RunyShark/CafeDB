const { Categoria } = require("../models");

const existeCategoria = async (id = "") => {
  const existe = await Categoria.findById(id);

  if (!existe) {
    throw new Error(`La categoria con el ID: ${id} no existe`);
  }
};

module.exports = existeCategoria;
