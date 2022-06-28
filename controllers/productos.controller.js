const { request, response, query } = require("express");
const { Producto } = require("../models");

const obtenerProductos = async (req = request, res = response) => {
  const { limit = 5, desde = 0 } = req.body;
  const query = { estado: true };
  const productos = await Producto.find();

  if (!productos) {
    const error = new Error("No hay productos en la DB");
    return res.status(400).json({ msg: error.message });
  }
  try {
    const [total, productos] = await Promise.all([
      Producto.countDocuments(query),
      Producto.find(query)
        .populate("usuario", "nombre")
        .populate("categoria", "nombre")
        .skip(Number(desde))
        .limit(Number(limit)),
    ]);
    res.json({ msg: "Productos", total, productos });
  } catch (error) {
    console.log(error);
    res.status(500).json({ msg: `Algo salio mal ${error.message}` });
  }
};

const obtenerProducto = async (req = request, res = response) => {
  const { id } = req.params;

  try {
    const existeProducto = await Producto.findById(id)
      .populate("usuario", "nombre")
      .populate("categoria", "nombre");

    res.json({ msg: "Producto por ID", existeProducto });
  } catch (error) {
    console.log(error.message);
    return res.status(500).json({ msg: `Alogo salio mal ${error.message}` });
  }
};

const actualizarProducto = async (req = request, res = response) => {
  const { id } = req.params;
  const { estado, usuario, ...data } = req.body;

  if (data.nombre) {
    data.nombre = data.nombre.toUpperCase();
    const nombre = data.nombre.toUpperCase();

    const existe = await Producto.findOne({ nombre });
    if (existe) {
      const error = new Error(`El nombre: ${nombre} ya existe`);
      return res.status(400).json({ msg: error.message });
    }
  }

  data.usuario = req.usuario._id;

  try {
    const producto = await Producto.findByIdAndUpdate(id, data, { new: true });
    res.status(201).json({ msg: "Actualizacion correcta", producto });
  } catch (error) {
    console.log(error.message);
    return res.status(500).json(`Algo salio mal ${error.message}`);
  }
};

const borrarProducto = async (req = request, res = response) => {
  const { id } = req.params;

  try {
    const productoBorrado = await Producto.findByIdAndUpdate(
      id,
      { estado: false },
      { new: true }
    );
    res
      .status(201)
      .json({ msg: "producto borrado correctamente", productoBorrado });
  } catch (error) {
    console.log(error.message);
    return res.status(500).json({ msg: `Algo salio mal ${error.message}` });
  }
};

const agregarProducto = async (req = request, res = response) => {
  const { estado, usuario, ...body } = req.body;
  const nombre = req.body.nombre.toUpperCase();
  const productoDB = await Producto.findOne({ nombre });
  if (productoDB) {
    const error = new Error(`El producto con el nombre: ${nombre} ya existe`);
    return res.status(400).json({ msg: error.message });
  }
  try {
    const data = {
      ...body,
      nombre: body.nombre.toUpperCase(),
      usuario: req.usuario._id,
    };

    const producto = new Producto(data);
    await producto.save();
    res.json({ msg: "Se agrego correctamente", producto });
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
