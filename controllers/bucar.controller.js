const { request, response, json } = require("express");
const { Categoria, Producto, Role, Usuario } = require("../models");
require("colors");
const buscar = async (req = request, res = response) => {
  const { coleccion } = req.params;
  console.log(coleccion);
  const { nombre } = req.query;
  let nombreMayus = "";

  if (nombre) {
    nombreMayus = req.query.nombre.toUpperCase();
  }

  try {
    const nombre = nombreMayus;
    if (coleccion === "producto") {
      if (nombreMayus !== "") {
        const buscarNombre = await Producto.findOne({ nombre });
        if (!buscarNombre) {
          const error = new Error(
            `El producto con el nombre: ${buscarNombre} no se encontro`
          );
          return res.status(400).json({ msg: error.message });
        }
        return res.json({ msg: "Productos con ese nombre", buscarNombre });
      }

      const getAllProductos = await Producto.find();
      if (!getAllProductos) {
        const error = new Error("No se encontro data de la categoria manda");
        return res.status(400).json({ msg: error.message });
      }
      res.json({ msg: "Todos los productos", getAllProductos });
    } else if (coleccion === "categoria") {
      if (nombreMayus !== "") {
        const buscarNombre = await Categoria.findOne({ nombre });
        if (!buscarNombre) {
          const error = new Error(
            `La categoria con el nombre: ${nombre} no se encontro`
          );
          return res.status(400).json({ msg: error.message });
        }
        return res.json({ msg: "Categoria por nombre", buscarNombre });
      }

      const getAllCategorias = await Categoria.find();

      if (!getAllCategorias) {
        const error = new Error("No se encontro data de la categoria manda");
        return res.status(400).json({ msg: error.message });
      }

      res.json({ msg: "Todas las categorias", getAllCategorias });
    } else if (coleccion === "rol") {
      if (nombreMayus !== "") {
        const rol = nombreMayus;
        const buscarNombre = await Role.findOne({ rol });
        if (!buscarNombre) {
          const error = new Error(
            `No se encontro ningun rol con el nombre: ${nombre}`
          );
          return res.status(400).json({ msg: error.message });
        }
        return res.json({ msg: "Rol", buscarNombre });
      }
      const getAllRol = await Role.find();
      if (!getAllRol) {
        const error = new Error("No se encontraron roles en la db");
        return res.status(400).json({ msg: error.message });
      }
      res.json({ msg: "Todos los roles", getAllRol });
    } else if (coleccion === "usuario") {
      if (nombreMayus !== "") {
        const nombre = req.query.nombre;
        const buscarNombre = await Usuario.findOne({ nombre });
        if (!buscarNombre) {
          const error = new Error(
            `No se encontro usuario con ese nombre:${nombre}`
          );
          return res.status(400).json({ msg: error.message });
        }
        return res.json({ msg: "Usuario por nombre", buscarNombre });
      }

      const getAllUsuarios = await Usuario.find();
      if (!getAllUsuarios) {
        const error = new Error("No se encontraron usuarios en la DB");
        return res.status(400).json({ msg: error.message });
      }
      res.json({ msg: "Todos los usuarios", getAllUsuarios });
    } else {
      const error = new Error(`La coleccion: ${coleccion} no existe`);
      return res.status(400).json({ msg: error.message });
    }
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ msg: `Algo salio mal ${error.message}` });
  }
};

module.exports = {
  buscar,
};
