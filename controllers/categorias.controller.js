const { request, response } = require("express");

const categoriaGet = (req = request, res = response) => {
  res.json({ msg: "Oreo" });
};

const categoriaPost = (req = request, res = response) => {
  res.json({ msg: "Oreo" });
};

const categoriaPut = (req = request, res = response) => {
  res.json({ msg: "Oreo" });
};

const categoriaDelete = (req = request, res = response) => {
  res.json({ msg: "Oreo" });
};

module.exports = {
  categoriaGet,
  categoriaPost,
  categoriaPut,
  categoriaDelete,
};
