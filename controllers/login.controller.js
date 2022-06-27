const { request, response } = require("express");
const Usuario = require("../models/usuario");
const bcryptjs = require("bcryptjs");
const generadorJWT = require("../helpers/generadorJWT");

//*
const login = async (req = request, res = response) => {
  const { correo, password } = req.body;

  try {
    const usuario = await Usuario.findOne({ correo });

    if (!usuario) {
      const error = new Error("El usuario no existe");
      return res.status(400).json({ msg: error.message });
    }

    if (!usuario.estado) {
      const error = new Error("Cuenta desactivada");
      return res.status(400).json({ msg: error.message });
    }
    const validarPassword = bcryptjs.compareSync(password, usuario.password);

    if (!validarPassword) {
      const error = new Error("Las contraseñas no coninciden");
      return res.status(400).json({ msg: error.message });
    }

    const token = await generadorJWT(usuario.id);

    res.json({
      usuario,
      token,
    });
  } catch (error) {
    console.log(error.message);
    return res.status(500).json({
      msg: `Algo salio mal`,
    });
  }
};
//*
const googleSingIn = async (req = request, res = response, next) => {
  const { id_token } = req.body;

  res.json({
    msg: "token de google",
    id_token,
  });
};
//*
module.exports = {
  login,
  googleSingIn,
};
