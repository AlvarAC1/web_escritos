'use strict'

//importamos para poder usar
var UsuarioModelo = require('../modelos/usuarioModelo');

var bcrypt = require('bcrypt-nodejs'); //para guardar contraseñas encriptadas
var jwt = require('../servicios/jwt'); //para generar tokens que contendran los datos del usuario en un objeto
//para poder trabajar con el sistema de ficheros
var fs = require('fs'); //file system
var path = require('path'); // acceder a rutas concretas


function guardarUsuario(req, res){

	var usuario = new UsuarioModelo();
	var params = req.body; //guardamos todos los paramatros que nos lleguen en la request del body por la peticion post

	//asignamos los valores que nos lleguen de la solicitud a nuestro objeto usuario
	usuario.nombre = params.nombre;
	usuario.apellidos = params.apellidos;
	usuario.email = params.email;
	usuario.rol = 'ROL_ESCRITOR';
	usuario.imagen = 'null';
	//usuario.escritosFav = [] ;

	//si nos llega por post la contraseña
	if(params.password){
		
		// Encriptar contraseña
		bcrypt.hash(params.password, null, null, function(err, hash){

		usuario.password = hash; //asignamos la contraseña encriptada hasheada 

			//si el nombre apellido y email esten llenos
			if(usuario.nombre != null && usuario.nombre !== '' && usuario.apellidos != null && usuario.apellidos !== '' && usuario.email != null && usuario.email !== ''){
				
				// Guardar el usuario con el metodo de mongoose .save(), devolvera error o el usuario guardado
				usuario.save((err, usuarioGuardado) => {
					
					//si hay error al guardar
					if(err){

						res.status(500).send({message: 'Error al guardar el usuario'});

					//si no hay error al guardar
					}else{

						//si no lo guardara por algun motivo
						if(!usuario){

							res.status(404).send({message: 'No se ha podido registrar al usuario'});
						
						//si todo va correctamente
						}else{

							//res.status(200).send({usuario: usuarioGuardado});
							res.status(200).send({usuario});

						}
					}
				});

			//si el nombre apellido y email NO estan llenos
			}else{

			    res.status(200).send({message: 'Rellena todos los campos'});

			}
		});

	//si no nos llega la contraseña
	}else{

		res.status(200).send({message: 'Introduce la contraseña'});

	}

}


function loginUsuario(req, res){

	var params = req.body;

	var email = params.email;
	var password = params.password;

	//Usamos metodo de mongoose findOne(), metiendole como un where clasico un json dentro de los parametros y un callback de error o devolviendo usuario
	UsuarioModelo.findOne({email: email.toLowerCase()}, (err, usuario) => {
		
		//si hay error
		if(err){

			res.status(500).send({message: 'Error en la petición'});

		//si no hay error
		}else{

			//si no existe el usuario
			if(!usuario){

				res.status(404).send({message: 'Ningún usuario tiene este email'});

			//si el usuario existe	
			}else{

				// Comprobar la contraseña
				bcrypt.compare(password, usuario.password, function(err, check){
					
					//si la comprobacion es correcta
					if(check){
						
						//si existe parametro gethash en la request del body devolver los datos del usuario logueado con un token de jwt
						if(params.gethash){
							
							//devuelve un token generado de jwt con el objeto del usuario para tener sus datos y poder decodificarlo 
							//y enviar ese toke en cada una de las peticiones que haremos como usuario en la aplicacion para poder estar identificado con todos lus datos
							res.status(200).send({
								token: jwt.createToken(usuario)
							});

						//sino nos devolvera el usuario que se ha logueado
						}else{

							res.status(200).send({usuario});

						}
					}else{

						res.status(404).send({message: 'Contraseña incorrecta'});
					
					}
				});
			}
		}
	});
}

function getUsuarios(req, res){

	var busquedaUsuarios = UsuarioModelo.find({}).sort('tipo');
	//console.log(busqueda);

	if(busquedaUsuarios == null || busquedaUsuarios == ""){
		res.status(500).send({message: 'busqueda incorrecta'});
	}

	busquedaUsuarios.populate({
		path: 'usuario'
	}).exec(function(err, usuarios){

		if(err){

			res.status(500).send({message: 'Error en la petición'});

		}else{

			if(!usuarios){

				res.status(404).send({message: 'No hay escritos de ese usuario !!'});

				//todo ok
			}else{

				res.status(200).send({usuarios});

			}
		}
	});
}


function actualizarUsuario(req, res){
	var usuarioId = req.params.id;
	var actualizacion = req.body;

	if(usuarioID !== req.usuario.sub){
	  return res.status(500).send({message: 'No tienes permiso para actualizar este usuario'});
	}

	UsuarioModelo.findByIdAndUpdate(usuarioId, actualizacion, (err, usuarioActualizado) => {
		if(err){
			res.status(500).send({message: 'Error al actualizar el usuario'});
		}else{
			if(!usuarioActualizado){
				res.status(404).send({message: 'No se ha podido actualizar el usuario'});
			}else{
				res.status(200).send({usuario: usuarioActualizado});
			}
		}
	});
}


function subirActualizarImagen(req, res){
	
	var usuarioId = req.params.usuarioId;
	var nombre_fichero = 'Imagen no subida...';

	//si viene algun fichero
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
			UsuarioModelo.findByIdAndUpdate(usuarioId, {imagen: nombre_fichero}, (err, usuarioActualizado) => {

				//si hay error en la actualizacion
				if(!usuarioActualizado){

					res.status(404).send({message: 'No se ha podido actualizar el usuario'});
				
				//si se actualiza correctamente
				}else{

					res.status(200).send({imagen: nombre_fichero, usuario: usuarioActualizado});
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

//este metodo nos devuelve un archivo pasandole una solicitud con el nombre del archivo
function getImagenUsuario(req, res){

	//recojo el parametro que nos llega por la url
	var imagenArchivo = req.params.imagenArchivo;
	var path_file = './subidas/usuarios/'+imagenArchivo;

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

//TODO comprobar que es tipo ROL_ADMIN
function borrarUsuarioPorAdmin(req, res){

	var rolUsuario = req.usuario.role;
	var usuarioId = req.params.usuarioId;

	if(rolUsuario == "ROL_ADMIN"){

		UsuarioModelo.findByIdAndRemove(usuarioId, (err, usuarioBorrado) => {

			if(err){

				res.status(500).send({message: 'Error en el servidor'});

			}else{

				if(!usuarioBorrado){

					res.status(404).send({message: 'No se ha borrado el usuario'});

				}else{

					res.status(200).send({song: usuarioBorrado});

				}
			}
		});

	}else{
		return res.status(500).send({message: 'Solo un administrador puede borrar usuaraios'});
	}


}


//Para poder exportar los metodos
module.exports = {
	guardarUsuario,
	loginUsuario,
	getUsuarios,
	actualizarUsuario,
	subirActualizarImagen,
	getImagenUsuario,
	borrarUsuarioPorAdmin

};