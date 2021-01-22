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
var med_subida_imagen_escrito = multipart({ uploadDir: './subidas/escritos' });
var med_subida_audio_escrito = multipart({ uploadDir: './subidas/audioEscritos' });


//cargamos rutas
api.get('/ver-escrito/:escritoId', med_autoriza.asegurarAutenticacion, EscritoControlador.getEscrito);
api.get('/ver-escritos', EscritoControlador.getEscritos);

api.post('/guardar-escrito', med_autoriza.asegurarAutenticacion, EscritoControlador.guardarEscrito);

api.get('/escritos-id/:usuarioId?', med_autoriza.asegurarAutenticacion, EscritoControlador.getEscritosPorUsuario);
api.get('/escritos-tipo/:tipoEscrito?', EscritoControlador.getEscritosPorTipo);

//TODO en principio un usuario solo vera sus escritos, pero lo ideal seria controlar que un usuario solo pueda actualizar su escrito, un admin todo
api.post('/actualizar-escrito/:escritoId', med_autoriza.asegurarAutenticacion, EscritoControlador.actualizarEscrito);
//actualizarEscritoUsuario

//borrarEscritoUsuario
api.delete('/borrar-escrito/:escritoId', med_autoriza.asegurarAutenticacion, EscritoControlador.borrarEscrito);
//borrarEscritoAdmin


api.post('/subida-imagen-escrito/:escritoId', [med_autoriza.asegurarAutenticacion, med_subida_imagen_escrito], EscritoControlador.subirActualizarImagenEscrito);
api.get('/get-imagen-escrito/:imagenEscrito', EscritoControlador.getImagenEscrito);

api.post('/guardar_audio_escrito/:escritoId', [med_autoriza.asegurarAutenticacion, med_subida_audio_escrito], EscritoControlador.subirActualizarAudioEscrito);
//api.get('/get_audio_escrito/:id', med_autoriza.asegurarAutenticacion, EscritoControlador.getAudio);
//api.get('/get_audios_escritos/:album?', med_autoriza.asegurarAutenticacion, EscritoControlador.getAudios);
//api.put('/actualizar_audio_escrito/:id', med_autoriza.asegurarAutenticacion, EscritoControlador.actualizarAudios);
//api.delete('/borrar_audio_escrito/:id', med_autoriza.asegurarAutenticacion, EscritoControlador.borrarAudios);



//TODO
//function getEscritosPorFecha(req, res)
//function getEscritosPorTipo(req, res)



//exportamos api para poder usarlo fuera
module.exports = api;