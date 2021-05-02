const variables = [
  ["nombreEstado", "no_estado"],
  ["codigoEstadoApi", "co_estado"],
  ["codigoUsuario", "id_usuari"],
  ["documentoIdentidad", "co_docide"],
  ["nombres", "no_usuari"],
  ["apellidoPaterno", "no_apepat"],
  ["apellidoMaterno", "no_apemat"],
  ["email", "no_correo"],
  ["password", "no_passwo"],
];

const setearVariables = (json, db) => {
  let newJson = {};
  for (const key in json) {
    const formato = variables.find((item) =>
      db ? item[1] == key : item[0] == key
    );
    if (formato) {
      if (db) {
        newJson[formato[0]] = json[key];
      } else {
        newJson[formato[1]] = json[key];
      }
    } else {
      newJson[key] = json[key];
    }
  }
  return newJson;
};

module.exports = {
  setearVariables,
};
