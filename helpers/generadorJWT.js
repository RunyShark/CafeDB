const jwt = require("jsonwebtoken");

const generadorJWT = (uid = "") => {
  return new Promise((resolve, reject) => {
    const payload = { uid };
    jwt.sign(
      payload,
      process.env.PRIVATE_KEY,
      {
        expiresIn: "1h",
      },
      (err, token) => {
        if (err) {
          console.log(err);
          reject("No se puedo generar el token");
        } else {
          resolve(token);
        }
      }
    );
  });
};

module.exports = generadorJWT;
