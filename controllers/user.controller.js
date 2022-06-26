const { response } = require("express");

const usuarioGet = (req, res = response) => {
  res.json({
    msg: "Buenas",
  });
};

module.exports = {
  usuarioGet,
};
