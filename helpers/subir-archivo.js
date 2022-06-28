const path = require("path");
const { v4: uuidev4 } = require("uuid");
const subirArchivo = (
  files,
  extencionValidas = ["png", "jpg", "gif", "jpeg"],
  carpeta = ""
) => {
  return new Promise((resolve, reject) => {
    const { archivo } = files;
    const nombreCortado = archivo.name.split(".");
    const extencion = nombreCortado[nombreCortado.length - 1];

    if (!extencionValidas.includes(extencion)) {
      return reject(
        `El tipo de archivo ${archivo.name} no contiene una extencion valida: ${extencionValidas}`
      );
    }
    const nombreTemp = uuidev4() + "." + extencion;

    const uploadPath = path.join(__dirname, "../uploads/", carpeta, nombreTemp);

    archivo?.mv(uploadPath, (err) => {
      if (err) {
        console.log(err.message);
        return reject(`Algo salio mal ${err.message}`);
      }

      resolve(nombreTemp);
    });
  });
};

module.exports = subirArchivo;
