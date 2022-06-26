const { request, response } = require("express");

const validarRol = (req = request, res = response, next) => {
  if (!req.usuario) {
    const error = new Error(
      "Se quiere verificar el rol sin velidar el token primero"
    );

    return res.status(500).json({ msg: error.message });
  }

  const { rol, nombre } = req.usuario;
  if (rol !== "ADMIN_ROLE") {
    const error = new Error(`El ${nombre} no es administrado -Ruta denegada`);
    return res.status(401).json({ msg: error.message });
  }

  next();
};

module.exports = validarRol;
