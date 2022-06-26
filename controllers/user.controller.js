const bcryptjs = require("bcryptjs");
const { response, request } = require("express");
const Usuario = require("../models/usuario");

//*
const usuarioGet = (req, res = response) => {
  res.json({
    msg: "Buenas",
  });
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
module.exports = {
  usuarioGet,
  usuarioPost,
};
