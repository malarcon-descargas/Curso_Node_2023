const Role = require('../models/role');
const Usuario = require('../models/usuario');

const existeRol = async(nombre = '') => {
    console.log(nombre);
    const existeRol = await Role.findOne({nombre});
    if ( !existeRol ) {
        throw new Error(`El rol: ${nombre} no está registrado.`);
    }
}

const existeEmail = async(correo = '') => {
    const existeEmail = await Usuario.findOne({correo});
    if (existeEmail) {
        throw new Error(`El correo: ${correo}, ya está registrado.`);
    }
}

const existeUsuario = async(id) => {
    const existeUsuario = await Usuario.findById(id);
    if (!existeUsuario) {
        throw new Error(`El id: ${ id }, no existe.`);
    }
}

module.exports = {
    existeRol,
    existeEmail,
    existeUsuario
}

