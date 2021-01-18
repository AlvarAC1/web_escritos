'use strict'

//Para arrancar el servidor
var express = require('express');
var bodyParser = require('body-parser');

var app = express();

// cargar rutas para que express lo use de manera global
var usuario_rutas = require('./rutas/usuarioRuta.js');
var escrito_rutas = require('./rutas/escritoRuta.js');


app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json()); //convierte a json los datos que nos llegan por las peticiones http

// configurar cabeceras http

// rutas base - antes de ejecutar el fichero de ruta, cada ruta tendra esto delante
app.use('/api', usuario_rutas);
app.use('/api', escrito_rutas);


//para poder usar express dentro de otros ficheros que incluyan app
module.exports = app;