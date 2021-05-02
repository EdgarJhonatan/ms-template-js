import Models from "./usuario2Model";
import errorTypes from "../../utils/errorTypes";
import bcrypt from "bcrypt";

class usuarioController {
  async addUsuario(req, res) {
    try {
      let body = req.body;

      let usuario = new Models.Usuario({
        documento: body.documento,
        nombre: body.nombre,
        apellidoPaterno: body.apellidoPaterno,
        apellidoMaterno: body.apellidoMaterno,
        email: body.email,
        password: bcrypt.hashSync(body.password, 10),
        role: body.role,
      });

      const usuarioSave = await usuario.save();

      res.status(200).json({
        codRes: "00",
        message: "Registrado correctamente.",
        data: usuarioSave,
      });
    } catch (err) {
      res.status(401).json({
        codRes: "99",
        message: err.message,
      });

      console.log("ENTRÓ AL CATHC addUsuario", err);
      throw new errorTypes.Error401("P003", err);
    }
  }

  async getUsuario(req, res) {
    try {
      const documento = ({ documento: req.params.documento }, { estado: true });
      const resUsuario = await Models.Usuario.find(
        documento,
        "documento nombre apellidoPaterno apellidoMaterno email role estado"
      );

      if (JSON.stringify(resUsuario) == "[]") {
        res.status(401).json({
          codRes: "00",
          message: `No hay resultados para este documento ${req.params.documento}`,
        });
      } else {
        res.status(200).json({
          codRes: "00",
          message: "OK",
          data: resUsuario,
        });
      }
    } catch (err) {
      res.status(401).json({
        codRes: "99",
        message: err.message,
      });

      console.log("ENTRÓ AL CATHC getUsuario", err);
      throw new errorTypes.Error401("P003", err);
    }
  }
}

export default new usuarioController();
