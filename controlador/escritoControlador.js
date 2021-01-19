'use strict'

//importamos para poder usar
var UsuarioModelo = require('../modelos/usuarioModelo');
var EscritoModelo = require('../modelos/escritoModelo');

//para poder trabajar con el sistema de ficheros
var fs = require('fs'); //file sistem
var path = require('path'); // acceder a rutas concretas


function getEscrito(req, res){

	var escritoId = req.params.id;

	EscritoModelo.findById(escritoId, (err, escrito) => {

		if(err){

			res.status(500).send({message: 'Error en la petición.'});

		}else{

			//si no lo guardara por algun motivo
			if(!escrito){

				res.status(404).send({message: 'El escrito no existe'});

			}else{

				res.status(200).send({escrito});

			}
		}
	});
}


function guardarEscrito(req, res){

	var escrito = new EscritoModelo();
	var params = req.body;

	//Parametros
	escrito.titulo = params.titulo;
	escrito.texto = params.texto;
	escrito.tipo = params.tipo;

	//media
	escrito.audio = null;
	escrito.image = null;
	//relacion con usuario
	escrito.usuario = params.usuarioId;

	escrito.save((err, escritoGuardado) => {

		if(err){

			res.status(500).send({message: 'Error al guardar el escrito'});

		}else{

			if(!escritoGuardado){

				res.status(404).send({message: 'El escrito no ha sido guardado'});

			}else{

				res.status(200).send({artist: escritoGuardado});

			}
		}
	});
}


//Para poder exportar los metodos
module.exports = {
	getEscrito,
	guardarEscrito

};