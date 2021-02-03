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
var med_subida_imagen_escrito = multipart({ uploadDir: './subidas/imagenEscritos' });
var med_subida_audio_escrito = multipart({ uploadDir: './subidas/audioEscritos' });


//cargamos rutas
api.get('/ver-escrito/:escritoId', med_autoriza.asegurarAutenticacion, EscritoControlador.getEscrito);
api.get('/ver-escritos', EscritoControlador.getEscritos);
api.post('/guardar-escrito', med_autoriza.asegurarAutenticacion, EscritoControlador.guardarEscrito);
api.get('/escritos-id/:usuarioId?', med_autoriza.asegurarAutenticacion, EscritoControlador.getEscritosPorUsuario);
api.get('/escritos-tipo/:tipoEscrito?', EscritoControlador.getEscritosPorTipoOrdenadoFecha);
api.post('/actualizar-escrito-autor/:escritoId', med_autoriza.asegurarAutenticacion, EscritoControlador.actualizarEscritoAutor);
api.delete('/borrar-escrito/:escritoId', med_autoriza.asegurarAutenticacion, EscritoControlador.borrarEscrito);
api.post('/subir-actualizar-imagen-escrito/:escritoId', [med_autoriza.asegurarAutenticacion, med_subida_imagen_escrito], EscritoControlador.subirActualizarImagenEscrito);
api.get('/get-imagen-escrito/:imagenEscrito', EscritoControlador.getImagenEscrito);
api.post('/subir-actualizar-audio-escrito/:escritoId', [med_autoriza.asegurarAutenticacion, med_subida_audio_escrito], EscritoControlador.subirActualizarAudioEscrito);
api.get('/get_audio_escrito/:audioEscrito', EscritoControlador.getAudioEscrito);

api.post('/borrar-imagen-escrito-autor/:escritoId', med_autoriza.asegurarAutenticacion, EscritoControlador.borrarImagenEscrito);
//api.get('/get_audios_escritos/:album?', med_autoriza.asegurarAutenticacion, EscritoControlador.getAudios); -------------> Seria interesante una sección donde poder escuchar todos los audios
//api.delete('/borrar_imagen_escrito/:idEscrito', med_autoriza.asegurarAutenticacion, EscritoControlador.borrarImagen); --------> Podemos borrar el campo imagen del escrito PERO tambien habria que eliminar el archivo del directorio
//api.delete('/borrar_audio_escrito/:idEscrito', med_autoriza.asegurarAutenticacion, EscritoControlador.borrarAudio); ----------> Podemos borrar el campo audio del escrito PERO tambien habria que eliminar el archivo del directorio



//function getEscritosPorFecha(req, res)
//function getEscritosPorTipo(req, res)



//exportamos api para poder usarlo fuera
module.exports = api;