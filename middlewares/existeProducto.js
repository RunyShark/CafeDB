const { Producto } = require("../models");

const existeProducto = async (id = "") => {
  const existeP = await Producto.findById(id);

  if (!existeP) {
    throw new Error(`No se encontro ningun producto con el ID: ${id}`);
  }
};

module.exports = existeProducto;
