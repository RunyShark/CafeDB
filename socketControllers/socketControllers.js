const { Socket } = require("socket.io");

const socketControllers = (socket = new Socket()) => {
  socket.on("cliente conetectado", socket.id);
};

module.exports = socketControllers;
