const Role = require('../models/role');
const Usuario = require('../models/usuario');

const esRoleValido = async(rol = '') => {

    const existeRol = await  Role.findOne({ rol });
    if ( !existeRol) throw new Error(`El rol ${ rol } no esta registrado en la BD`);

}

const emailExiste = async( correo = '' ) => {

    // Verificar si el correo existe (10 por defecto -- 100 mas seguro)
    const existeEmail = await Usuario.findOne({ correo });
    if ( existeEmail ) throw new Error(`El correo: ${ correo }, ya se encuentra registrado`);
}

const existeUsuarioPorId = async( id ) => {

    // Verificar si el usuario existe
    const existeUsuario = await Usuario.findById(id);
    if ( !existeUsuario ) throw new Error(`El id no existe: ${ id }`);
}


module.exports = {
    esRoleValido,
    emailExiste,
    existeUsuarioPorId
}