'use strict'

//cargamos eel modulo de mongoose para poder acceder a la BBDD
var mongoose = require('mongoose');

//para poder definir objetos de tipo Schema, un modelo para la BBDD
var Schema = mongoose.Schema;

//modelo de usuario
var UsuarioSchema = Schema({
		//no definimos id pues mongodb se lo añade automaticamente
		nombre: String,
		apellidos: String,
		email: String,
		password: String,
		rol: String,
		imagen: String,
		
		//escritosFav: [mongoose.Schema.Types.ObjectId], 
		//Como guardar en un array en usuario los distintos escritos favoritos, creandose los ids de forma automatica en mongo
		/*
		https://stackoverflow.com/questions/22244421/how-to-create-mongoose-schema-with-array-of-object-ids
		friends: [{ type : ObjectId, ref: 'EscritoModelo' }],
		friends: [mongoose.Schema.Types.ObjectId],
		*/
});

//para exportar el modelo de usuario
module.exports = mongoose.model('Usuario', UsuarioSchema);