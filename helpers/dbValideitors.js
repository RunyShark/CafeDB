const Role = require("../models/role");
const Usuario = require("../models/usuario");

const dbValideitor = async (rol = "") => {
  const existeRol = await Role.findOne({ rol });
  if (!existeRol) {
    throw new Error(`${"El rol no existe"} ${rol}`);
  }
};

const emailExiste = async (correo = "") => {
  const CheckDuplicateEmail = await Usuario.findOne({ correo });
  console.log(CheckDuplicateEmail);
  if (CheckDuplicateEmail) {
    throw new Error(
      `El correo: ${correo} ya se encuentra registrado, intente con otro correo`
    );
  }
};
const userExisteID = async (id = "") => {
  const CuserExisteID = await Usuario.findById(id);

  if (!userExisteID) {
    throw new Error(`El usuario con el ID: ${id}, no existe`);
  }
};

module.exports = {
  dbValideitor,
  emailExiste,
  userExisteID,
};
