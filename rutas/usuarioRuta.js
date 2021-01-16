'use strict'

//cargamos modulo de express
var express = require('express');
//cargamos el UsuarioController
var UsuarioController = require('../controlador/usuarioControlador');
//cargamos el router de expres
var api = express.Router();
//cargamos el mediador de autenticacion
var mediador_autoriza = require('../mediador/autenticado');


//TODO y si no quiero que todos los visitantes esten logueados?? distintas rutas para logueados o no logueados?

//cargamos rutas
api.get('/probando-controlador', mediador_autoriza.asegurarAutenticacion, UsuarioController.pruebas); 
//sin pasar por autenticacion //api.get('/probando-controlador', UsuarioController.pruebas);
api.post('/registrar', UsuarioController.guardarUsuario);
api.post('/login', UsuarioController.loginUsuario);

//exportamos api para poder usarlo fuera
module.exports = api;