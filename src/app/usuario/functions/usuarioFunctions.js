import services from "../../../axios/index";
import { setearVariables } from "../../../utils/setearVariables";

class functions {
  async getUsuario(documento) {
    try {
      var rpta;
      await services(
        process.env.LB_CENTRAL,
        `/lb/central/listarUsuario?documento=${documento}`,
        {},
        "GET"
      )
        .then((r) => {
          if (r.codRes == "00") {
            const datos = r.data;
            const json = datos.map((item) => setearVariables(item, true));
            rpta = {
              codRes: "00",
              data: json,
            };
          } else {
            rpta = {
              codRes: "99",
              message: "Error interno",
            };
          }
        })
        .catch((e) => {
          console.log("el error ", e);
          rpta = { codRes: "99", message: "Error Interno, funcion getUsuario" };
        });
      console.log("Data usuario -->", rpta);
      return rpta;
    } catch (error) {
      console.log(error);
      return { codRes: "99", message: "Error Interno, funcion getUsuario" };
    }
  }

  async logLogin(data) {
    try {
      console.log(data);
      var rpta;
      await services(
        process.env.LB_CENTRAL,
        `/lb/central/logUsuario`,
        data,
        "POST"
      )
        .then((r) => {
          if (r.codRes == "00") {
            rpta = {
              codRes: "00",
              message: "Login correcto",
            };
          } else {
            rpta = {
              codRes: "99",
              message: "Error interno",
            };
          }
        })
        .catch((e) => {
          console.log("el error ", e);
          rpta = { codRes: "99", message: "Error Interno, funcion logLogin" };
        });
      console.log("Data Log -->", rpta);
      return rpta;
    } catch (error) {
      console.log(error);
      return { codRes: "99", message: "Error Interno, funcion logLogin" };
    }
  }
}

export default new functions();
