const { request, response } = require("express");
const { Categoria } = require("../models");

//rutas midelware personalizado para validar id -existecategoria si la categoria no existe error
//**
//obtenerCategorias -paginado -total -populate
const obtenerCategorias = async (req = request, res = response) => {
  const categorias = await Categoria.find();
  const { limit = 5, desde = 0 } = req.body;
  const query = { estado: true };
  if (!categorias) {
    const error = new Error("No hay categorias en la DB");
    return res.status(400).json({ msg: error.message });
  }
  try {
    const [total, categorias] = await Promise.all([
      Categoria.countDocuments(query),
      Categoria.find(query)
        .populate("usuario", "nombre")
        .skip(Number(desde))
        .limit(Number(limit)),
    ]);
    res.json({ msg: "Categorias", total, categorias });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ msg: `Algo salio mal ${error.message}` });
  }
};

//**
//obtenerCategorias -pupulate -{}
const obtenerCategoria = async (req = request, res = response) => {
  const { id } = req.params;
  try {
    const idCategoria = await Categoria.findById(id).populate(
      "usuario",
      "nombre"
    );
    res.json({ msg: "Categoria por ID", idCategoria });
  } catch (error) {
    console.log(error);
    res.status(500).json({ msg: `Algo salio mal ${error.message}` });
  }
};
//*
//actutalizarCategorioa
const actutalizarCategorioa = async (req = request, res = response) => {
  const { id } = req.params;
  const nombre = req.body.nombre.toUpperCase();

  const existeNombre = await Categoria.findOne({ nombre });

  if (existeNombre) {
    const error = new Error(
      `El nombre: ${nombre} ya existe, intenta con otro nombre`
    );
    return res.status(400).json({ msg: error.message });
  }

  try {
    const updateCategotria = await Categoria.findById(id);
    updateCategotria.nombre = nombre;
    await updateCategotria.save();
    res.status(201).json({ msg: "update categoria", updateCategotria });
  } catch (error) {
    console.log(error);
    res.status(500).json({ msg: `Algo salio mal ${error.message}` });
  }
};
//*
//borrarCategoria -estado false
const borrarCategoria = async (req = request, res = response) => {
  const { id } = req.params;

  try {
    const borrarCategoria = await Categoria.findById(id);
    borrarCategoria.estado = false;
    borrarCategoria.save();
    res.status(201).json({ msg: "Categoria borrada", borrarCategoria });
  } catch (error) {
    console.log(error);
    res.status(500).json({ msg: `Algo salio mal ${error.message}` });
  }
};
//*
//crear categoria -privado-cualquier persona con token valido
const categoriaPost = async (req = request, res = response) => {
  const nombre = req.body.nombre.toUpperCase();

  const categoriaDb = await Categoria.findOne({ nombre });
  if (categoriaDb) {
    const error = new Error(`La categoria ${nombre} ya existe en la DB`);
    return res.status(400).json({ msg: error.message });
  }

  try {
    const data = {
      nombre,
      usuario: req.usuario._id,
    };

    const categoria = new Categoria(data);
    await categoria.save();

    res
      .status(201)
      .json({ msg: "Categoria agregada correctamente", categoria });
  } catch (error) {
    console.log(error.message);
  }
};

module.exports = {
  obtenerCategorias,
  categoriaPost,
  obtenerCategoria,
  actutalizarCategorioa,
  borrarCategoria,
};
