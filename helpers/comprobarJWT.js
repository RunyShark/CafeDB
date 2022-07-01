const jwt = require("jsonwebtoken");
const { Usuario } = require("../models");
const usuario = require("../models/usuario");
const comprobarJWT = async (token = "") => {
  try {
    if (token.length < 10) {
      return null;
    }
    const { uid } = jwt.verify(token, process.env.PRIVATE_KEY);
    const usuario = await Usuario.findById(uid);
    if (!usuario) {
      throw new Error("El usuario no existe");
    }
    if (!usuario.estado) {
      throw new Error("El usuario esta prohivido");
    }
    return usuario;
  } catch (error) {
    console.log(error);
    return null;
  }
};

module.exports = comprobarJWT;
