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
var med_subida = multipart({ uploadDir: './subidas/usuarios' });


//TODO y si no quiero que todos los visitantes esten logueados?? distintas rutas para logueados o no logueados?

//cargamos rutas
api.get('/probando-controlador', med_autoriza.asegurarAutenticacion, UsuarioController.pruebas); 
//sin pasar por autenticacion //api.get('/probando-controlador', UsuarioController.pruebas);
api.post('/registrar', UsuarioController.guardarUsuario);
api.post('/login', UsuarioController.loginUsuario);
api.put('/actualizacion-usuario/:id', med_autoriza.asegurarAutenticacion, UsuarioController.actualizarUsuario);
api.post('/subida-imagen-usuario/:id', [med_autoriza.asegurarAutenticacion, med_subida], UsuarioController.subirImagen);
api.get('/get-imagen-archivo/:imagenArchivo', UsuarioController.getImagenArchivo);

//exportamos api para poder usarlo fuera
module.exports = api;