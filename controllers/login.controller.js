const { request, response } = require("express");
const Usuario = require("../models/usuario");
const bcryptjs = require("bcryptjs");
const generadorJWT = require("../helpers/generadorJWT");
const googleVerify = require("../helpers/google-verify");

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
  try {
    const { nombre, img, correo } = await googleVerify(id_token);

    let usuario = await Usuario.findOne({ correo });

    if (!usuario) {
      const data = {
        nombre,
        correo,
        password: ":P",
        img,
        rol: "USER_ROLE",
        google: true,
      };
      usuario = new Usuario(data);
      await usuario.save();
    }
    if (!usuario.estado) {
      const error = new Error("Usuario baneado");
      return res.status(401).json({ msg: error.message });
    }
    const token = await generadorJWT(usuario.id);

    res.json({
      usuario,
      token,
    });
  } catch (error) {
    console.log(error);
    const errorr = new Error("El token no se pudo verificar");
    return res.status(400).json({
      msg: errorr.message,
    });
  }
};
//*
module.exports = {
  login,
  googleSingIn,
};
