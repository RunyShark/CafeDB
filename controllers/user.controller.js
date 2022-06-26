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
  const { nombre, correo, password, img, rol, estado, google } = req.body;

  if (!nombre || !correo || !password) {
    const error = new Error("Nombre, correo y cotraseña son campos requeridos");
    return res.status(403).json({ msg: error.message });
  }

  const CheckDuplicateEmail = await Usuario.findOne({ correo });

  if (CheckDuplicateEmail) {
    const error = new Error(
      "El correo ya se encuentra registrado, intente con otro correo"
    );
    return res.status(400).json({ msg: error.message });
  }

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
      id: usuario._id,
      nombre: usuario.nombre,
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
