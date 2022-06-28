const { request, response, query } = require("express");
const { Producto } = require("../models");

const obtenerProductos = async (req = request, res = response) => {
  const { limit = 5, desde = 0 } = req.body;
  const query = { estado: true };
  const producto = await Producto.find();

  if (!producto) {
    const error = new Error("No hay productos en la DB");
    return res.status(400).json({ msg: error.message });
  }
  try {
    const [total, producto] = await Promise([
      Producto.countDocuments(query),
      Producto.find(query)
        .populate("usuario", "nombre")
        .skip(Number(desde))
        .limit(Number(limit)),
    ]);
    res.json({ msg: "Productos", total, producto });
  } catch (error) {
    console.log(error);
    res.status(500).json({ msg: `Algo salio mal ${error.message}` });
  }
};

const obtenerProducto = async (req = request, res = response) => {
  const { id } = req.params;

  try {
    const existeProducto = await Producto.findById(id).populate(
      "usuario",
      "nombre"
    );

    res.json({ msg: "Producto por ID", existeProducto });
  } catch (error) {
    console.log(error.message);
    return res.status(500).json({ msg: `Alogo salio mal ${error.message}` });
  }
};

const actualizarProducto = async (req = request, res = response) => {
  const { id } = req.params;
  const { estado, usuario, ...data } = res.body;
  const nombre = data.nombre.toUpperCase();
  data.usuario = req.usuario;
  const existe = await Producto.findOne({ nombre });
  if (existe) {
    const error = new Error(`El nombre: ${nombre} ya existe`);
    return res.status(400).json({ msg: error.message });
  }
  try {
    const updateProducto = await Producto.findById(id);
    updateProducto.nombre = nombre || updateProducto.nombre;
    updateProducto.precio = precio || updateProducto.precio;
    updateProducto.categoria = categoria || updateProducto.categoria;
    updateProducto.descripcion = descripcion || updateProducto.descripcion;
    updateProducto.disponible = disponible || updateProducto.disponible;
    await updateProducto.save();
    res
      .status(201)
      .json({ msg: "Update producto correctamente", data, updateCategotria });
  } catch (error) {
    console.log(error.message);
    return res.status(500).json(`Algo salio mal ${error.message}`);
  }
};

const borrarProducto = async (req = request, res = response) => {
  const { id } = req.params;

  try {
    const borrarProducto = Producto.findByIdAndUpdate(id, { estado: false });
    res
      .status(201)
      .json({ msg: "producto borrado correctamente", borrarProducto });
  } catch (error) {
    console.log(error.message);
    return res.status(500).json({ msg: `Algo salio mal ${error.message}` });
  }
};

const agregarProducto = async (req = request, res = response) => {
  const { nombre, precio, categoria, descripcion, disponible } = req.body;
  try {
  } catch (error) {
    console.log(error.message);
    return res.status(500).json({ msg: `Algo salio mal ${error.message}` });
  }
};

module.exports = {
  obtenerProductos,
  obtenerProducto,
  actualizarProducto,
  borrarProducto,
  agregarProducto,
};
