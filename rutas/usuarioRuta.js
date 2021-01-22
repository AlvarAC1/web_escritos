'use strict'

//para poder acceder y crear rutas
var express = require('express');
//cargamos el UsuarioController
var UsuarioController = require('../controlador/usuarioControlador');
//cargamos el router de expres para poder hacer todas las peticiones get-push-post...
var api = express.Router();
//cargamos el mediador de autenticacion
var med_autoriza = require('../mediador/autenticado');
//nos permite enviar ficheros por el protocolo http
var multipart = require('connect-multiparty');
//cargamos el mediador para la subida de archivos
var med_subida_usuario = multipart({ uploadDir: './subidas/usuarios' });


//cargamos rutas
api.post('/registrar', UsuarioController.guardarUsuario);
api.post('/login', UsuarioController.loginUsuario);
api.get('/ver-usuarios', med_autoriza.asegurarAutenticacion, UsuarioController.getUsuarios);
api.put('/actualizacion-usuario/:usuarioId', med_autoriza.asegurarAutenticacion, UsuarioController.actualizarUsuario);

api.post('/subida-imagen-usuario/:usuarioId', [med_autoriza.asegurarAutenticacion, med_subida_usuario], UsuarioController.subirActualizarImagen);
api.get('/get-imagen-usuario/:imagenArchivo', UsuarioController.getImagenUsuario);

//borrarUsuarioAdmin - TODO en principio solo podra hacer esto un admin, solo deberia ver esta opcion el mismo
api.delete('/borrar-usuario/:usuarioId', med_autoriza.asegurarAutenticacion, UsuarioController.borrarUsuarioPorAdmin);

//exportamos api para poder usarlo fuera
module.exports = api;