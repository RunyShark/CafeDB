const { request, response } = require("express");

const file = async (req = request, res = response) => {
  res.json({ msg: "ok" });
};

module.exports = {
  file,
};
