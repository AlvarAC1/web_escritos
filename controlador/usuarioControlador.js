'use strict'

//importamos para poder usar
var Usuario = require('../modelos/usuarioModelo');
var bcrypt = require('bcrypt-nodejs'); //para guardar contraseñas encriptadas


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


	if(params.password){
		// Encriptar contraseña
		bcrypt.hash(params.password, null, null, function(err, hash){
			usuario.password = hash;

			if(usuario.nombre != null && usuario.nombre !== '' && usuario.apellidos != null && usuario.apellidos !== '' && usuario.email != null && usuario.email !== ''){
				// Guardar el usuario
				usuario.save((err, usuarioGuardado) => {
					if(err){
						res.status(500).send({message: 'Error al guardar el usuario'});
					}else{
						if(!usuario){
							res.status(404).send({message: 'No se ha registrado el usuario'});
						}else{
							//res.status(200).send({usuario: usuarioGuardado});
							res.status(200).send({usuario});
						}
					}
				});

			}else{
			    res.status(200).send({message: 'Rellena todos los campos'});

			}
		});
	}else{
		res.status(200).send({message: 'Introduce la contraseña'});
	}

}


module.exports = {
	pruebas,
	guardarUsuario

};