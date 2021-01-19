'use strict'

//para poder acceder y crear rutas
var express = require('express');
//cargamos el UsuarioController
var EscritoControlador = require('../controlador/escritoControlador');
//cargamos el router de expres para poder hacer todas las peticiones get-push-post...
var api = express.Router();
//cargamos el mediador de autenticacion
var med_autoriza = require('../mediador/autenticado');
//nos permite enviar archivos por el protocolo http
var multipart = require('connect-multiparty');
//cargamos el mediador para la subida de archivos
var med_subida = multipart({ uploadDir: './subidas/escritos' });


//TODO y si no quiero que todos los visitantes esten logueados?? distintas rutas para logueados o no logueados?

//cargamos rutas
api.get('/ver-escrito/:id', med_autoriza.asegurarAutenticacion, EscritoControlador.getEscrito);
api.post('/guardar-escrito', med_autoriza.asegurarAutenticacion, EscritoControlador.guardarEscrito);
api.get('/escritos-id/:usuarioId?', med_autoriza.asegurarAutenticacion, EscritoControlador.getEscritosPorUsuario);
api.get('/escritos-tipo/:tipo?', EscritoControlador.getEscritosPorTipo);

//actualizarEscrito
//actualizarEscritoUsuario
//actualizarEscritoAdmin
//borrarEscrito
//borrarEscritoUsuario
//borrarEscritoAdmin
//subirActualizarImagenUsuario
//actualizarSubirImagenAdmin
//subirActualizarAudioUsuario
//actualizarAudioAdmin


//TODO
//function getEscritosPorFecha(req, res)
//function getEscritosPorTipo(req, res)



//exportamos api para poder usarlo fuera
module.exports = api;