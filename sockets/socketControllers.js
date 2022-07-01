const comprobarJWT = require("../helpers/comprobarJWT");
const { Socket } = require("socket.io");

const socketControllers = async (socket = new Socket()) => {
  const token = socket.handshake.headers["x-token"];
  const usuario = await comprobarJWT(token);

  if (!usuario) {
    return socket.disconnect();
  }
  console.log("Se conecto", usuario.nombre);
};

module.exports = socketControllers;
