'use strict'

//cargamos eel modulo de mongoose para poder acceder a la BBDD
var mongoose = require('mongoose');

//para poder definir objetos de tipo Schema, un modelo para la BBDD
var Schema = mongoose.Schema;

//modelo de usuario
var EscritoSchema = Schema({
		titulo: String,
		texto: String,
		tipo: String,
		imagen: String,
		audio: String,
		fechaCreacion: { type: Date, default: Date.now },
		usuario: { type: Schema.ObjectId, ref: 'UsuarioModelo' }
});

//mostrar: boolean

//para exportar el modelo de usuario
module.exports = mongoose.model('Escrito', EscritoSchema);