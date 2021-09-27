const { Categoria, Usuario, Producto } = require('../models');
const Role = require('../models/role');

const esRoleValido = async(rol = '') => {

    const existeRol = await Role.findOne({ rol });
    if (!existeRol) throw new Error(`El rol ${ rol } no esta registrado en la BD`);

}

const emailExiste = async(correo = '') => {

    // Verificar si el correo existe (10 por defecto -- 100 mas seguro)
    const existeEmail = await Usuario.findOne({ correo });
    if (existeEmail) throw new Error(`El correo: ${ correo }, ya se encuentra registrado`);
}

const existeUsuarioPorId = async(id) => {

    // Verificar si el usuario existe
    const existeUsuario = await Usuario.findById(id);
    if (!existeUsuario) throw new Error(`El id del usuario no existe: ${ id }`);
}


/**
 * Categorias 
 */
const existeCategoriaPorId = async(id) => {

    // Verificar si la categoria existe
    const existeCategoria = await Categoria.findById(id);
    if (!existeCategoria) throw new Error(`El id de la categoria no existe: ${ id }`);

}

/**
 * Productos 
 */
const existeProductoPorId = async(id) => {

    // Verificar si la categoria existe
    const existeProducto = await Producto.findById(id);
    if (!existeProducto) throw new Error(`El id del producto no existe: ${ id }`);

}

/**
 * Validar colecciones permitidas 
 */
const coleccionesPermitidas = (coleccion = '', colecciones = []) => {

    const incluida = colecciones.includes(coleccion);
    if (!incluida) {
        throw new Error(`La coleccion ${ coleccion } no es permitida, ${ colecciones }`);
    }

    return true;
}


module.exports = {
    esRoleValido,
    emailExiste,
    existeUsuarioPorId,
    existeCategoriaPorId,
    existeProductoPorId,
    coleccionesPermitidas
}