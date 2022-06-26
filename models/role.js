const { Schema, model } = require("mongoose");

const RolesShema = Schema({
  rol: {
    type: String,
    require: true,
  },
});

module.exports = model("Role", RolesShema);
