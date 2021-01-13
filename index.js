'use strict'

//usamos mongoose como intermediario para trabajar con la bbdd
var mongoose = require('mongoose');

//cargamos el fichero de carga central que tiene toda la configuracion de expres y de las rutas
var app = require('./app');

//configuramos un puerto para nuestro servidor, para que coja la variable de entorno si lo tenemos configurado  o el definido
var port = process.env.PORT || 3977;

//conexion a mongodb usando la direccion a nuestra bbdd
mongoose.connect('mongodb://localhost:27017/web_escritos', (err, res) => {
	if(err){
		throw err;
	}else{
		console.log("---> La conexión a la base de datos está funcionando correctamente...");

		app.listen(port, function(){
			console.log("---> Servidor del api rest de web_escritos escuchando en http://localhost:"+port);
		});
	}
});

