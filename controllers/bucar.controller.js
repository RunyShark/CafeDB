const { request, response } = require("express");

const buscar = async (req = request, res = response) => {
  res.json({ msg: "Soy buscar" });
};

module.exports = {
  buscar,
};
