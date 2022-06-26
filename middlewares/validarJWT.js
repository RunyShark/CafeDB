const { request, response } = require("express");
const Usuario = require("../models/usuario");
const jtw = require("jsonwebtoken");
const usuario = require("../models/usuario");

const validarJWT = async (req = request, res = response, next) => {
  const token = req.header("x-token");

  if (!token) {
    const error = new Error("No hay token en la peticion");
    return res.status(401).json({
      msg: error,
    });
  }
  try {
    const { uid } = jtw.verify(token, process.env.PRIVATE_KEY);
    const usuario = await Usuario.findById(uid).select(
      "-password -nombre -correo -estado -google -__v"
    );

    req.usuario = usuario;
    next();
  } catch (error) {
    console.log(error);
    return res.status(401).json({ msg: "Token no valido" });
  }
};

module.exports = validarJWT;
