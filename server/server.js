const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const fileUpload = require("express-fileUpload");
const { dbConnection } = require("../dataBase/config");
require("colors");

class Server {
  constructor() {
    this.app = express();
    this.port = process.env.PORT_SEV;
    this.paths = {
      RoutePath: "/api/usuarios",
      RoutePathAuth: "/api/auth",
      RoutePathFiles: "/api/file",
      RoutePathBuscar: "/api/buscar",
      RoutePathProductos: "/api/productos",
      RoutePathcategorias: "/api/categorias",
    };

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
    this.app.use(
      fileUpload({
        useTempFiles: true,
        tempFileDir: "/tmp/",
        createParentPath: true,
      })
    );

    //Directorio Público
    this.app.use(express.static("public"));
  }
  routet() {
    this.app.use(this.paths.RoutePath, require("../router/user.routes"));
    this.app.use(
      this.paths.RoutePathBuscar,
      require("../router/buscar.routes")
    );
    this.app.use(this.paths.RoutePathFiles, require("../router/files.routes"));
    this.app.use(this.paths.RoutePathAuth, require("../router/login.routes"));
    this.app.use(
      this.paths.RoutePathProductos,
      require("../router/productos.routes")
    );
    this.app.use(
      this.paths.RoutePathcategorias,
      require("../router/categorias.routes")
    );
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
