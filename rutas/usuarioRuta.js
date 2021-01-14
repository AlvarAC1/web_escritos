'use strict'

//cargamos modulo de express
var express = require('express');
//cargamos el UsuarioController
var UsuarioController = require('../controlador/usuarioControlador');

//cargamos el router de expres
var api = express.Router();

//cargamos rutas
api.get('/probando-controlador', UsuarioController.pruebas);
api.post('/registrar', UsuarioController.guardarUsuario);
api.post('/login', UsuarioController.loginUsuario);

//exportamos api para poder usarlo fuera
module.exports = api;