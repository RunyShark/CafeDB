const { request, response } = require("express");
//obtener todas las categotias
//obtener categoria por id
//crear categoria -privado-cualquier persona con token valido
//actualizar -privado-cualquier token valido
//borrar una categoria -admin
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
