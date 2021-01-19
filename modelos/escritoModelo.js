'use strict'

//cargamos eel modulo de mongoose para poder acceder a la BBDD
var mongoose = require('mongoose');

//para poder definir objetos de tipo Schema, un modelo para la BBDD
var Schema = mongoose.Schema;

//modelo de usuario
var EscritoSchema = Schema({
		//no definimos id pues mongodb se lo añade automaticamente
		titulo: String,
		texto: String,
		tipo: String,
		imagen: String,
		audio: String,
		date: { type: Date, default: Date.now },
		//definimos relacion entre la entidad Escrito y Usuario
		autor: { type: Schema.ObjectId, ref: 'UsuarioModelo' }
		
});

//para exportar el modelo de usuario
module.exports = mongoose.model('Escrito', EscritoSchema);