const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const { dbConnection } = require("../dataBase/config");
require("colors");

class Server {
  constructor() {
    this.app = express();
    this.port = process.env.PORT_SEV;
    this.usuariosRoutePath = "/api/usuarios";
    this.usuariosRoutePathAuth = "/api/auth";

    //DB conect
    this.conectarDB();

    // Midelwares
    this.midelwares();

    //Rutas de mi app
    this.routet();
  }
  async conectarDB() {
    await dbConnection();
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
    this.app.use(this.usuariosRoutePathAuth, require("../router/login.routes"));
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
