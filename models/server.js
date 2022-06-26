const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
require("colors");

class Server {
  constructor() {
    this.app = express();
    this.port = process.env.PORT_SEV;
    this.usuariosRoutePath = "/api/usuarios";

    // Midelwares
    this.midelwares();
    //Rutas de mi app
    this.routet();
  }
  midelwares() {
    this.app.use(cors());
    this.app.use(express.json());
    this.app.use(morgan("dev"));

    //Directorio Público
    this.app.use(express.static("public"));
  }
  routet() {
    this.app.use(this.usuariosRoutePath, require("../router/user.routes"));
  }
  lister() {
    this.app.listen(this.port, (err) => {
      if (err) {
        console.log(`${"Algo salio mal".red} ${err}`);
      }
      console.log(
        `${"Server coriendo en el puerto".yellow} ${this.port.rainbow}`
      );
    });
  }
}

module.exports = Server;
