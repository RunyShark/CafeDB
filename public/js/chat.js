const socket = null;
const validarJWT = async () => {
  let usuario = null;
  const token = localStorage.getItem("token") || "";
  if (token.length <= 10) {
    window.location = "index.html";
    throw new Error("no hay token en el servidlor");
  }
  const respuesta = await fetch("http://localhost:3001/api/auth", {
    headers: { "x-token": token },
  });

  const { usuario: userDB, token: tokenDB } = await respuesta.json();
  localStorage.setItem("token", tokenDB);
  usuario = userDB;

  document.title = usuario.nombre;
  await conectarSocket();
};

const conectarSocket = async () => {
  const socket = io({
    extraHeaders: {
      "x-token": localStorage.getItem("token"),
    },
  });
};

const main = async () => {
  await validarJWT();
};

main();
