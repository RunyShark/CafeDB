const { Schema, model } = require("mongoose");

const productosShema = Schema({
  nombre: {
    type: String,
    require: [true, "Este campo es obligatorio"],
  },
});

module.exports = model("Producto", productosShema);
