const { request, response } = require("express");

const galletas = (req = request, res = response) => {
  res.json({ msg: "Oreo" });
};

module.exports = galletas;
