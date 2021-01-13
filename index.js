'use strict'

//usamos mongoose como intermediario para trabajar con la bbdd
var mongoose = require('mongoose');

//cargamos el fichero de carga central que tiene toda la configuracion de expres y de las rutas
var app = require('./app');

//configuramos un puerto para nuestro servidor, para que coja la variable de entorno si lo tenemos configurado  o el definido
var port = process.env.PORT || 3977;

//para evitar un tipo de fallos https://victorroblesweb.es/2019/10/03/solucionar-problemas-y-avisos-de-mongoose-en-nodejs/
mongoose.set('useFindAndModify', false);
mongoose.Promise = global.Promise;

//conexion a mongodb usando la direccion a nuestra bbdd
mongoose.connect('mongodb://localhost:27017/web_escritos', { useNewUrlParser: true , useUnifiedTopology: true }, (err, res) => {
	if(err){
		throw err;
	}else{
		console.log("---> La conexión a la base de datos está funcionando correctamente...");

		app.listen(port, function(){
			console.log("---> Servidor del api rest de web_escritos escuchando en http://localhost:"+port);
		});
	}
});

