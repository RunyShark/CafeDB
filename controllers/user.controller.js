const bcryptjs = require("bcryptjs");
const { response, request } = require("express");
const { Usuario } = require("../models");

//*
const usuarioGet = async (req, res = response) => {
  try {
    const { limit = 5, desde = 0 } = req.body;
    const query = { estado: true };

    const respuesta = await Promise.all([
      Usuario.countDocuments(query),
      Usuario.find(query).skip(Number(desde)).limit(Number(limit)),
    ]);
    res.json({
      respuesta,
    });
  } catch (error) {
    console.log(error.message);
  }
};

//*
const usuarioPost = async (req = request, res = response) => {
  const { nombre, correo, password, rol } = req.body;

  try {
    const usuario = await Usuario({
      nombre,
      correo,
      password,
      rol,
    });

    usuario.password = bcryptjs.hashSync(password, bcryptjs.genSaltSync());

    await usuario.save();

    res.json({
      usuario,
    });
  } catch (error) {
    console.log(error.message);
  }
};

//*
const usuarioPut = async (req = request, res = response) => {
  const { id } = req.params;
  const { _id, password, google, correo, ...resto } = req.body;
  try {
    if (password) {
      resto.password = bcryptjs.hashSync(password, bcryptjs.genSaltSync());
    }
    const usuario = await Usuario.findByIdAndUpdate(id, resto);

    res.json(usuario);
  } catch (error) {
    console.log(error.message);
  }
};
//*

const borrarUser = async (req = request, res = response) => {
  const { id } = req.params;

  const user = await Usuario.findByIdAndUpdate(id, { estado: false });
  const usuarioAutenticado = req.usuario;
  res
    .status(202)
    .json({ msg: "Usuario eliminado correctamente", user, usuarioAutenticado });
};
//*
module.exports = {
  usuarioGet,
  usuarioPost,
  usuarioPut,
  borrarUser,
};
