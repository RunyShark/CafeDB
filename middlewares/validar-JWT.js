const { request, response } = require("express");
const Usuario = require("../models/usuario");
const jtw = require("jsonwebtoken");

const validarJWT = async (req = request, res = response, next) => {
  const token = req.header("x-token");

  if (!token) {
    const error = new Error("No hay token en la peticion");
    return res.status(401).json({
      msg: error.message,
    });
  }

  try {
    const { uid } = jtw.verify(token, process.env.PRIVATE_KEY);
    const usuario = await Usuario.findById(uid).select(
      "-password -correo  -google -__v"
    );

    if (!usuario) {
      const error = new Error("Token no valido -El usuario no se existe");
      return res.status(401).json({
        msg: error.message,
      });
    }

    if (!usuario.estado) {
      const error = new Error("Token no valido -Usuario baneado");
      return res.status(401).json({
        msg: error.message,
      });
    }

    req.usuario = usuario;
    next();
  } catch (error) {
    console.log(error);
    return res.status(401).json({ msg: "Token no valido" });
  }
};

module.exports = { validarJWT };
