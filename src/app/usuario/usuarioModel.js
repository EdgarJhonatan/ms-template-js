export default class UsuarioModel {
    CodigoEstadoApi;
    NombreEstadoApi;
    documentoIdentidad;
    nombres;
    apellidoPaterno;
    apellidoMaterno;
    email;
    constructor(v) {
        this.CodigoEstadoApi = v.co_estado
        this.NombreEstadoApi = v.no_estado
        this.documentoIdentidad = v.co_docide
        this.nombres = v.no_usuari
        this.apellidoPaterno = v.no_apepat
        this.apellidoMaterno = v.no_apemat
        this.email = v.no_correo
    }
}