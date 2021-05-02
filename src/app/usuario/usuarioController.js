import errorTypes from "../../utils/errorTypes";
import services from "../../axios/index";
import bcrypt from "bcrypt";
import { generarJWT } from "../../utils/jwt";
import functions from "../usuario/functions/usuarioFunctions";

class Usuario {
  async addUsuario(req, res) {
    try {
      let rpta;
      const salt = bcrypt.genSaltSync();
      const {
        documento,
        nombre,
        apellidoPaterno,
        apellidoMaterno,
        email,
        password,
        role,
      } = req.body;

      const data = {
        documento,
        nombre,
        apellidoPaterno,
        apellidoMaterno,
        email,
        password: bcrypt.hashSync(password, salt),
        role,
      };

      console.log(documento, nombre);

      //Generar el JWT
      const token = await generarJWT(documento, nombre);

      await services(
        process.env.LB_CENTRAL,
        `/lb/central/registrarUsuario`,
        data,
        "POST"
      )
        .then((r) => {
          console.log("res", r);
          if ((r.codRes = "00")) {
            rpta = r;
          } else {
            rpta = r;
          }
        })
        .catch((e) => {
          console.log("El error", e);
          rpta = { codRes: "99", message: "Error Interno" };
        });
      res.json({
        codRes: rpta.codRes,
        message: rpta.message,
        nombre,
        documento,
        token,
      });
    } catch (error) {
      console.log("TRY CATCH", error);
      res.json({
        codRes: "99",
        message: "Error Interno (TRY CATCH) addUsuario ",
      });
      throw new errorTypes.Error500("500", error);
    }
  }

  async loginUsuario(req, res) {
    try {
      const { documento, password } = req.body;

      //Traer password BD usario
      const userDB = await functions.getUsuario(documento);
      const codigoUsuario = userDB.data[0].codigoUsuario;
      const nombre = userDB.data[0].nombres;

      //Confirmar si es el password hace match
      const validaPassword = bcrypt.compareSync(
        password,
        userDB.data[0].password
      );

      if (!validaPassword) {
        return res.json({
          codRed: "01",
          mesagge: "El password o usuario no son válidos",
        });
      }

      //Generar el JWT
      const token = await generarJWT(documento, nombre);

      //Guardar log de login
      const dataLog = { codigoUsuario, documento };
      const logUsuario = await functions.logLogin(dataLog);

      res.json({
        codRes: logUsuario.codRes,
        message: logUsuario.message,
        nombre: userDB.data[0].nombres,
        documento: documento,
        token,
      });
    } catch (error) {
      console.log("TRY CATCH addUsuario", error);
      res.json({
        codRes: "99",
        message: "Error Interno (TRY CATCH) addUsuario ",
      });
      throw new errorTypes.Error500("500", error);
    }
  }

  async revalidarToken(req, res) {
    const { documento } = req;

    //Leer la base de datos
    const userDB = await functions.getUsuario(documento);
    const nombre = userDB.data[0].nombres;

    //Generar el JWT
    const token = await generarJWT(documento, nombre);

    return res.json({
      codRes: userDB.codRes,
      message: userDB.message,
      nombre: nombre,
      documento,
      token,
    });
  }
}

export default new Usuario();
