const jwt = require("jsonwebtoken");

const validarJWT = (req, res, next) => {
  const token = req.header("x-token");

  if (!token) {
    return res.json({
      codRes: "01",
      message: "error en el token",
    });
  }

  try {
    const { documento, nombre } = jwt.verify(
      token,
      process.env.SECRET_JWT_SEED
    );

    req.documento = documento;
    req.nombre = nombre;
  } catch (error) {
    return res.json({
      ok: false,
      msg: "Token no válido",
    });
  }

  next();
};

module.exports = {
  validarJWT,
};
