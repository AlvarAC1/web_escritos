'use strict'

//usamos mongoose como intermediario para trabajar con la bbdd
var mongoose = require('mongoose');

//conexion a mongodb usando la direccion a nuestra bbdd
mongoose.connect('mongodb://localhost:27017/web_escritos', (err, res)=>{
	
});