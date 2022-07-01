const { Socket } = require("socket.io");

const socketControllers = (socket = new Socket()) => {
  console.log("cliente conetectado", socket.id);
};

module.exports = socketControllers;
