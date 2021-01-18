'use strict'

//importamos para poder usar
var Usuario = require('../modelos/usuarioModelo');
var Escrito = require('../modelos/escritoModelo');

//para poder trabajar con el sistema de ficheros
var fs = require('fs'); //file sistem
var path = require('path'); // acceder a rutas concretas

function getEscrito(req, res){

	res.status(200).send({
		message: 'Probando una acción del escritoControlador'
	});
}


//Para poder exportar los metodos
module.exports = {
	getEscrito

};