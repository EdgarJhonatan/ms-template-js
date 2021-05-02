const jwt = require("jsonwebtoken");

const generarJWT = (documento, nombre) => {
  const payload = { documento, nombre };

  return new Promise((resolve, reject) => {
    jwt.sign(
      payload,
      process.env.SECRET_JWT_SEED,
      {
        expiresIn: "24h",
      },
      (err, token) => {
        if (err) {
          //Todo Mal
          console.log("error jswt", err);
          reject(err);
        } else {
          //Todo Bien
          resolve(token);
        }
      }
    );
  });
};

module.exports = {
  generarJWT,
};
