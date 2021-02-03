'use strict'

//importamos para poder usar
var UsuarioModelo = require('../modelos/usuarioModelo');
var EscritoModelo = require('../modelos/escritoModelo');

//para poder trabajar con el sistema de ficheros
var fs = require('fs'); //file system
var path = require('path'); // acceder a rutas concretas


function getEscrito(req, res){

	var escritoId = req.params.escritoId;

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

function getEscritos(req, res){

	var busqueda = EscritoModelo.find({}).sort('date');
	//console.log(busqueda);

	if(busqueda == null || busqueda == ""){
		res.status(500).send({message: 'busqueda incorrecta'});
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

			//todo ok
			}else{

				res.status(200).send({escritos});

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


function getEscritosPorTipoOrdenadoFecha(req, res){

	var tipoEscrito = req.params.tipoEscrito;

	if(tipoEscrito){

		var busqueda = EscritoModelo.find({tipo: tipoEscrito}).sort('date');

	}else{
		res.status(500).send({message: 'El tipo del escrito no consta'});


	}

	//TODO controlar que busqueda tenga valor
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
	escrito.titulo = params.titulo;
	escrito.texto = params.texto;
	escrito.tipo = params.tipo;
	escrito.audio = null;
	escrito.imagen = null;
	escrito.usuario = params.usuario; //relacion con usuario

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


function actualizarEscritoAutor(req, res){

	var escritoId = req.params.escritoId;
	var update = req.body;
	/*var update=  {
		imagen: null
	}*/

	var idUsuario = req.usuario.sub;
	var autorEscrito = "";


	//intentamos consultar datos escrito
	EscritoModelo.findById(escritoId,(err, escrito) => {

		if(err){

			res.status(500).send({message: 'Error al consultar el escrito para conocer su autor'});

		}else{

			//guardamos autor
			autorEscrito = escrito.usuario;

			//si usuario y autor escrito son distintos
			if(idUsuario != autorEscrito){

				res.status(500).send({message: 'El usuario actual no es el autor del escrito que se desea modificar'});

			//si se ha introducido un dato en el titulo, texto o tipo
			}else if(req.body.titulo == null && req.body.texto == null && req.body.tipo == null){

				return res.status(404).send({message: 'No hay datos para actualizar'});

			}else{

				//intentamos actualizar escrito
				EscritoModelo.findByIdAndUpdate(escritoId, update, (err, escritoActualizado) => {

					if(err){

						res.status(500).send({message: 'Error al actualizar el escrito'});

					}else{

						if(!escritoActualizado){

							res.status(404).send({message: 'No se ha podido actualizar el escrito'});

						}else{

							res.status(200).send({escritoViejo: escritoActualizado, escritoNuevo: update});

						}
					}
				});
			}

		}

	});
}


function borrarEscrito(req, res){

	var escritoId = req.params.escritoId;
	//var idUsuario = req.usuario.sub;

		EscritoModelo.findByIdAndRemove(escritoId, (err, escritoBorrado) => {

		if(err){

			res.status(500).send({message: 'Error en el servidor'});

		}else{

			if(!escritoBorrado){

				res.status(404).send({message: 'No se ha borrado el escrito'});

			}else{

				res.status(200).send({escrito: escritoBorrado});

			}
		}
	});

}

function subirActualizarImagenEscrito(req, res){

	var escritoId = req.params.escritoId;
	var nombre_fichero = 'Imagen no subida...';

	//si viene algun archivo
	if(req.files){

		//sacamos los datos de la imagen
		var fichero_path = req.files.imagen.path; //ruta
		var fichero_split = fichero_path.split('\\');
		nombre_fichero = fichero_split[2];
		var ext_split = nombre_fichero.split('\.');
		var fichero_ext = ext_split[1];

		//si la extension es valida
		if(fichero_ext === 'png' || fichero_ext === 'jpg' || fichero_ext === 'gif'){

			//actualizamos o guardamos la imagen al usuario, le pasamos el id, el objeto JSON con la propiedad a modificar
			EscritoModelo.findByIdAndUpdate(escritoId, {imagen: nombre_fichero}, (err, escritoActualizado) => {

				//si hay error en la actualizacion
				if(!escritoActualizado){

					res.status(404).send({message: 'No se ha podido subir la imagen del escrito'});

					//si se actualiza correctamente
				}else{

					res.status(200).send({imagen: nombre_fichero, escrito: escritoActualizado});
				}
			});

			//si la extension NO es valida
		}else{

			res.status(200).send({message: 'Extensión del archivo no valida (png, jpg, gif)'});

		}

		//sino viene fichero
	}else{

		res.status(200).send({message: 'No has subido ninguna imagen...'});

	}
}

function getImagenEscrito(req, res){

	//recojo el parametro que nos llega por la url
	var imagenEscrito = req.params.imagenEscrito;
	var path_file = './subidas/imagenEscritos/'+imagenEscrito;

	//comprobamos si existe dicho archivo
	fs.exists(path_file, function(exists){

		//si existe
		if(exists){

			//enviamos el archivo solicitado
			res.sendFile(path.resolve(path_file));

			//si no existe
		}else{

			res.status(200).send({message: 'No existe la imagen...'});

		}

	});
}

function borrarImagenEscrito(req, res){

	var escritoId = req.params.escritoId;
	var idUsuario = req.usuario.sub;
	var autorEscrito;
	var imagenEscrito;

	//var update = req.body;
	var update=  {
		imagen: null
	};

	//intentamos consultar datos escrito
	EscritoModelo.findById(escritoId,(err, escrito) => {

		if(err){

			res.status(500).send({message: 'Error al consultar el escrito para conocer su autor'});

		}else{

			autorEscrito = escrito.usuario;
			imagenEscrito = escrito.imagen;
			var nombreImagen = escrito.imagen;
			var path_file = './subidas/imagenEscritos/'+escrito.imagen;

			if(nombreImagen == null){

				res.status(500).send({message: 'El escrito actual no tiene imagen'});

			}else if(idUsuario != autorEscrito){

				res.status(500).send({message: 'El usuario actual no puede borrar la imagen del escrito, debido a que no es el autor del mismo'});

			}else{

				//actualizamos el campo imagen del escrito a null y borramos la imagen del fichero
				EscritoModelo.findByIdAndUpdate(escritoId, update, (err, escritoActualizado) => {

					if(err){

						res.status(500).send({message: 'Error al actualizar el escrito'});

					}else{

						//borramos la imagen del archivo
						fs.unlink(path_file, function(err) {
							if (err) throw err;

							console.log("La imagen "+nombreImagen+" del escrito "+escrito.titulo+" esta borrada del archivo");
						});

						res.status(200).send({escritoImagen: update, escrito: escritoActualizado});					}
				});

			}

		}

	});
}


function subirActualizarAudioEscrito(req, res){

	var escritoId = req.params.escritoId;
	var nombre_fichero = 'Audio no subida...';

	if(req.files){

		//sacamos los datos del audio
		var fichero_path = req.files.audio.path; //ruta
		var fichero_split = fichero_path.split('\\');
		nombre_fichero = fichero_split[2];
		var ext_split = nombre_fichero.split('\.');
		var fichero_ext = ext_split[1];

		if(fichero_ext === 'mp3'){

			EscritoModelo.findByIdAndUpdate(escritoId, {audio: nombre_fichero}, (err, escritoActualizado) => {

				if(!escritoActualizado){

					res.status(404).send({message: 'No se ha podido subir el audio del escrito'});

				}else{

					res.status(200).send({audio: nombre_fichero, escrito: escritoActualizado});
				}
			});

		}else{

			res.status(200).send({message: 'Extensión del archivo no valida (mp3)'});

		}

	}else{

		res.status(200).send({message: 'No has subido ningun audio...'});

	}

}


function getAudioEscrito(req, res) {

	console.log("----------------------------- ESTAMOS ------------------------");

	//recojo el parametro que nos llega por la url
	var audioEscrito = req.params.audioEscrito;
	var path_file = './subidas/audioEscritos/' + audioEscrito;

	//comprobamos si existe dicho archivo
	fs.exists(path_file, function (exists) {

		//si existe
		if (exists) {

			//enviamos el archivo solicitado
			res.sendFile(path.resolve(path_file));

			//si no existe
		} else {

			res.status(200).send({message: 'No existe el audio...'});

		}

	});
}




//Para poder exportar los metodos
module.exports = {
	getEscrito,
	getEscritos,
	guardarEscrito,
	getEscritosPorUsuario,
	getEscritosPorTipoOrdenadoFecha,
	actualizarEscritoAutor,
	borrarEscrito,
	subirActualizarImagenEscrito,
	getImagenEscrito,
	borrarImagenEscrito,
	subirActualizarAudioEscrito,
	getAudioEscrito

};