'use strict'

//importamos
var jwt = require('jwt-simple');
var moment = require('moment');
var secret = 'NLB3JWl@U+5zgdyE5';

//esta funcion comprobara si los datos del token son correctos, se ejecutara antes de la accion del controlador
exports.asegurarAutenticacion = function(req, res, next){

	//TODO y si no quiero que todos los usuarios esten logueados?? el flujo no pasaria del primer IF

	//si no nos llega el token por la cabecera, autorizacion
	if(!req.headers.autorizacion){
		return res.status(403).send({message: 'La petición no tiene la cabecera de autenticación'});
	}


	//si llegamos aqui tenemos la cabecera autorizacion
	//guardamos el token sin comillas
	var token = req.headers.autorizacion.replace(/['"]+/g, '');

	//decodificacion
	try{
		//decodificamos y guardamos el token
		var payload = jwt.decode(token, secret);

		//comprobamos si ha expirado el token
		if(payload.exp <= moment().unix()){
			return res.status(401).send({message: 'El token ha expirado'});
		}
	//capturamos error si hubiera fallo
	}catch(ex){
		console.log(ex);
		return res.status(404).send({message: 'Token no válido'});
	}

	//añadimos a la request una propiedad con un objeto con todos los datos del usuario
	req.usuarioDesencriptado = payload;

	//salimos de este mediador
	next();
};