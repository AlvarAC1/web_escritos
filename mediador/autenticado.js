'use strict'

//importamos
var jwt = require('jwt-simple');
var moment = require('moment');
var secret = 'NLB3JWl@U+5zgdyE5';

//esta funcion comprobara si los datos del token son correctos, se ejecutara antes de la accion del controlador
exports.ensureAuth = function(req, res, next){

	//TODO y si no quiero que todos los usuarios esten logueados?? el flujo no pasaria del primer IF

	//si no nos llega el token por authorization
	if(!req.headers.authorization){
		return res.status(403).send({message: 'La petición no tiene la cabecera de autenticación'});
	}


	//guardamos el token
	var token = req.headers.authorization.replace(/['"]+/g, '');

	try{
		var payload = jwt.decode(token, secret);

		if(payload.exp <= moment().unix()){
			return res.status(401).send({message: 'El token ha expirado'});
		}
	}catch(ex){
		//console.log(ex);
		return res.status(404).send({message: 'Token no válido'});
	}

	req.user = payload;

	next();
};