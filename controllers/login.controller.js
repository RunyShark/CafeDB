const { request, response } = require("express");

//*
const registro = async (req = request, res = response) => {
  res.json({ msg: "Hola mundo" });
};
//*
module.exports = {
  registro,
};
