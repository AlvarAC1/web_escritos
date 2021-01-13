'use strict'

//Para arrancar el servidor
var express = require('express');
var bodyParser = require('body-parser');

var app = express();

// cargar rutas para que express lo use de manera global

app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json()); //convierte a json los datos que nos llegan por las peticiones http

// configurar cabeceras http

// rutas base

app.get('/pruebas', function(req, res){
	res.status(200).send({message: 'BIENVENIDO'})
});


//para poder usar express dentro de otros ficheros que incluyan app
module.exports = app;