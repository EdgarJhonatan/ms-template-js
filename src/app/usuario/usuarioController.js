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
        sucursal,
        tipoAccion
      } = req.body;

      const data = {
        documento,
        nombre,
        apellidoPaterno,
        apellidoMaterno,
        email,
        password: bcrypt.hashSync(password, salt),
        role,
        sucursal,
        tipoAccion
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
          if (r.codRes == "00") {
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
      const documento = req.body.usuario;
      const password = req.body.password;


      //Traer password BD usario
      const userDB = await functions.getUsuario(documento, '1');
      if (userDB.codRes == "01") {
        return res.json({
          codRes: "01",
          message: "El password o usuario no son válidos",
        });
      } else {
        const codigoUsuario = userDB.data[0].codigoUsuario;
        const nombre = userDB.data[0].nombres;

        //Confirmar si es el password hace match
        const validaPassword = bcrypt.compareSync(
          password,
          userDB.data[0].password
        );

        if (!validaPassword) {
          return res.json({
            codRes: "01",
            message: "El password o usuario no son válidos",
          });
        }

        //Generar el JWT
        const token = await generarJWT(documento, nombre);

        //Guardar log de login
        const dataLog = { codigoUsuario, documento };
        const logUsuario = await functions.logLogin(dataLog);

        delete userDB.data[0].password;
        delete userDB.data[0].fe_delete;
        delete userDB.data[0].fe_regist;

        res.json({
          codRes: logUsuario.codRes,
          message: logUsuario.message,
          ...userDB.data[0],
          token,
        });
      }
    } catch (error) {
      console.log("TRY CATCH loginUsuario", error);
      res.json({
        codRes: "99",
        message: "Error Interno (TRY CATCH) loginUsuario ",
      });
      throw new errorTypes.Error500("500", error);
    }
  }

  async listarUsuario (req, res) {
    try {
      const {codigo, tipoAccion} = req.query;
      //Leer la base de datos
      const usuarios = await functions.getUsuario(codigo, tipoAccion);
      console.log("usuarios", usuarios);

      res.json({
        codRes: usuarios.codRes,
        message: usuarios.message,
        data: usuarios.data
      });      
    } catch (error) {
      console.log("TRY CATCH listarUsuario", error);
      res.json({
        codRes: "99",
        message: "Error Interno (TRY CATCH) listarUsuario ",
      });
      throw new errorTypes.Error500("500", error);
    }

  }

  async revalidarToken(req, res) {
    const { documento } = req;

    //Leer la base de datos
    const userDB = await functions.getUsuario(documento, '1');
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
