const { response, request, query } = require('express');
const bcryptjs = require('bcryptjs');

const Usuario = require('../models/usuario');

const usuariosGet = async(req = request, res = response) => {

    // const { q, nombre = 'No name', apikey, limit, page = 1 } = req.query;
    const { limite = 5, 
        desde = 0 
    } = req.query;

    const estadoBorrado = { estado: true };

    //forma tradicional
    // const usuarios = await Usuario.find( estadoBorrado )
    // .skip(Number( desde ))
    // .limit(Number( limite ));
    // const total = await Usuario.countDocuments( estadoBorrado );

    // mejor perfomance con una promesa
    const [ total, usuarios ] = await Promise.all([
        Usuario.count( estadoBorrado ),
        Usuario.find( estadoBorrado )
            .skip(Number( desde ))
            .limit(Number( limite ))
    ]);

    res.json({
        total,
        usuarios
    });
}

const usuariosPost = async(req, res = response) => {

    const { nombre, correo, password, rol } = req.body;
    const usuario = new Usuario({ nombre, correo, password, rol });

    // Encriptar la contraseña
    const salt = bcryptjs.genSaltSync();
    usuario.password = bcryptjs.hashSync( password, salt );

    // Guardar en BD
    await usuario.save();

    res.json({
        usuario
    });
}

const usuariosPut = async(req, res = response) => {

    const { id } = req.params;
    const { _id, password, google, correo, ...resto } = req.body;

    // TODO validar contra base de datos
    if ( password ) {
        // Encriptar la contraseña
        const salt = bcryptjs.genSaltSync();
        resto.password = bcryptjs.hashSync( password, salt );
    }

    const usuario = await Usuario.findByIdAndUpdate( id, resto );

    res.json({
        msg: 'put API - usuariosPut',
        id,
        usuario
    });
}

const usuariosPatch = (req, res = response) => {
    res.json({
        msg: 'patch API - usuariosPatch'
    });
}

const usuariosDelete = async(req, res = response) => {

    const { id } = req.params;

    // Borrado Fisico
    // const usuario = await Usuario.findByIdAndDelete( id );

    // Borrado Lógico
    const usuario = await Usuario.findByIdAndUpdate ( id, { estado: false } );

    res.json( usuario );
}

module.exports = {
    usuariosGet,
    usuariosPut,
    usuariosPost,
    usuariosPatch,
    usuariosDelete
}