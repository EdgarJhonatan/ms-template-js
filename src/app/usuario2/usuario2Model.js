import { Schema, model, connection } from "mongoose";
import uniqueValidator from "mongoose-unique-validator"; //npm i mongoose-unique-validator --save
const usuarioDB = connection.useDb("usuario");

let rolesValidos = {
    values: ['ADMIN_ROLE', 'USER_ROLE'],
    message: '{VALUE} no es un rol válido'
};


const usuario = new Schema({
    documento: {
        type: String,
        unique: true,
        required: [true, 'El documento de identidad es necesario']
    },
    nombre: {
        type: String,
        required: [true, 'El nombre es necesario']
    },
    apellidoPaterno: {
        type: String,
        required: [true, 'El apellido paterno es necesario']
    },
    apellidoMaterno: {
        type: String,
        required: [true, 'El apellido materno es necesario']
    },
    email: {
        type: String,
        required: [true, 'El email es necesario']
    },
    password: {
        type: String,
        required: [true, 'La contraseña es necesario']
    },
    role: {
        type: String,
        default: 'USER_ROLE',
        enum: rolesValidos
    },
    estado: {
        type: Boolean,
        default: true
    },
}, {
    versionKey: false,
    timestamps: true
});

usuario.plugin(uniqueValidator, { message: '{PATH} debe de ser único' });

const models = {
    Usuario: usuarioDB.model('Usuario', usuario)
}

export default models;