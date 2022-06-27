const { request, response } = require("express");

const get = (req, res = response) => {
  res.json({ msg: "get" });
};

const put = (req, res = response) => {
  res.json({ msg: "put" });
};

const delee = (req, res = response) => {
  res.json({ msg: "delete" });
};

const post = (req, res = response) => {
  res.json({ msg: "post" });
};

module.exports = {
  get,
  put,
  delee,
  post,
};
