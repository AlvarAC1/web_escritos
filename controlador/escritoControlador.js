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

function getEscritosPorUsuario(req, res){

	var usuarioId = req.params.usuarioId;

	//si nos llega el usuarioId a FALSE mostramos todos los escritos
	if(!usuarioId){

		var busqueda = EscritoModelo.find({}).sort('date');

	//si nos llega el usuarioId a TRUE mostramos todos los escritos asociados a ese usuarioId
	}else{

		var busqueda = EscritoModelo.find({usuario: usuarioId}).sort('date');
		//var busqueda = EscritoModelo.find({}).sort('date');
		//var busqueda = EscritoModelo.find({tipo: "Poma"}).sort('date');

	}

	busqueda.populate({
		path: 'escrito',
		populate: {
			path: 'usuario',
			model: 'usuarioModelo'
		}
	}).exec(function(err, escritos){

		if(err){

			res.status(500).send({message: 'Error en la petición'});

		}else{

			if(!escritos){

				res.status(404).send({message: 'No hay escritos de ese usuario !!'});

			}else{

				res.status(200).send({escritos});

			}
		}
	});
}


function getEscritosPorTipo(req, res){

	var tipo = req.params.tipo;

	if(tipo){

		var busqueda = EscritoModelo.find({tipo: tipo}).sort('date');

	}else{
		res.status(500).send({message: 'El tipo del escrito no consta'});


	}

	busqueda.populate({
		path: 'escrito',
		populate: {
			path: 'usuario',
			model: 'usuarioModelo'
		}
	}).exec(function(err, escritos){

		if(err){

			res.status(500).send({message: 'Error en la petición'});

		}else{

			if(!escritos){

				res.status(404).send({message: 'No hay escritos de dicho tipo !!'});

			}else{

				res.status(200).send({escritos});

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
	escrito.imagen = null;
	//relacion con usuario
	escrito.usuario = params.usuario;

	escrito.save((err, escritoGuardado) => {

		if(err){

			res.status(500).send({message: 'Error al guardar el escrito'});

		}else{

			if(!escritoGuardado){

				res.status(404).send({message: 'El escrito no ha sido guardado'});

			}else{

				res.status(200).send({escrito: escritoGuardado});

			}
		}
	});
}

function actualizarEscrito(req, res){

	var escritoId = req.params.id;
	var update = req.body;

	if(userId != req.user.sub){

		return res.status(500).send({message: 'No tienes permiso para actualizar este usuario'});

	}

	User.findByIdAndUpdate(userId, update, (err, userUpdated) => {

		if(err){

			res.status(500).send({message: 'Error al actualizar el usuario'});

		}else{

			if(!userUpdated){

				res.status(404).send({message: 'No se ha podido actualizar el usuario'});

			}else{

				res.status(200).send({user: userUpdated});

			}
		}
	});
}


//Para poder exportar los metodos
module.exports = {
	getEscrito,
	guardarEscrito,
	getEscritosPorUsuario,
	getEscritosPorTipo

};