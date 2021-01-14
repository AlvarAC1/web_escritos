'use strict'

//importamos
var jwt = require('jwt-simple');
var moment = require('moment'); //para tener la fecha de creacion y expiracion de el token de jwt (para expirar sesion usuario)
var secret = 'NLB3JWl@U+5zgdyE5';


//esta funcion codificara al objeto usuario y los guardara dentro de un token (hash) para tenerlo codificado
exports.createToken = function(usuario){

	var payload = {
		sub: usuario._id,
		name: usuario.nombre,
		surname: usuario.String,
		email: usuario.email,
		role: usuario.rol,
		image: usuario.imagen,
		iat: moment().unix(),
		exp: moment().add(30, 'days').unix
	};

	//iat se guardara la fecha de creacion del token - unix pone la fecha en formato UNIX TimeStamp que es un número entero que representa el número de segundos transcurridos desde el 1 de enero de 1970
	//exp se guarda la fecha de expiración del token

	return jwt.encode(payload, secret);

};
 
/*
		nombre: String,
		apellidos: String,
		email: String,
		password: String,
		rol: String,
		imagen: String,
		//escritosFav: [mongoose.Schema.Types.ObjectId],
*/