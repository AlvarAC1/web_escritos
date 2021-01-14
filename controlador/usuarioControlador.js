'use strict'

//importamos para poder usar
var Usuario = require('../modelos/usuarioModelo');
var bcrypt = require('bcrypt-nodejs'); //para guardar contraseñas encriptadas
var jwt = require('../servicios/jwt');


function pruebas(req, res){
	res.status(200).send({
		message: 'Probando una acción del usuarioControlador del api rest con Node y Mongo'
	});
}


function guardarUsuario(req, res){

	var usuario = new Usuario();
	var params = req.body; //guardamos todos los paramatros que nos lleguen por la peticion post

	console.log(params);

	usuario.nombre = params.nombre;
	usuario.apellidos = params.apellidos;
	usuario.email = params.email;
	usuario.rol = 'ROL_ADMIN';
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
	Usuario.findOne({email: email.toLowerCase()}, (err, usuario) => {
		
		//si hay error
		if(err){

			res.status(500).send({message: 'Error en la petición'});

		//si no hay error
		}else{

			//si no existe el usuario
			if(!usuario){

				res.status(404).send({message: 'El usuario no existe'});

			//si el usuario existe	
			}else{

				// Comprobar la contraseña
				bcrypt.compare(password, usuario.password, function(err, check){
					
					//si la comprobacion es correcta
					if(check){
						
						//si existe parametro gethash devolver los datos del usuario logueado con un token de jwt
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

						res.status(404).send({message: 'El usuario no ha podido loguease, contraseña incorrecta'});
					
					}
				});
			}
		}
	});
}





//Para poder exportar los metodos
module.exports = {
	pruebas,
	guardarUsuario,
	loginUsuario

};