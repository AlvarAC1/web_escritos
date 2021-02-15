import { Injectable } from '@angular/core'; //permite inyectar este servicio o clase en otras clases o componenetes
import { Http, Response, Headers } from '@angular/http';
import 'rxjs/add/operator/map'; //para mapear objetos, posibles fallos Angulas6+ --> https://www.udemy.com/course/desarrollo-web-con-javascript-angular-nodejs-y-mongodb/learn/lecture/10327558#questions/5993394
import { Observable } from 'rxjs/Observable'; //para recojer las respuestas al hacer peticion ajax al servidor, posibles fallos Angulas6+ --> https://www.udemy.com/course/desarrollo-web-con-javascript-angular-nodejs-y-mongodb/learn/lecture/10327558#questions/5993394
import { GLOBAL } from './global';

@Injectable()
export class UsuarioServicio{

	public identidad;
	public token;
	public url: string;

	constructor(private _http: Http){

		this.url = GLOBAL.url;		

	}


	ingreso(usuario_para_loguear, gethash = null){

		//si nos llega el gethash se lo asignamos como propiedad a usuario_para_loguear
		if(gethash != null){
			usuario_para_loguear.gethash = gethash;
		}

		let parametros = JSON.stringify(usuario_para_loguear);
		let headers = new Headers({'Content-Type':'application/json'});

		//peticion ajax al servidor
		return this._http.post(this.url + 'login', parametros, {headers: headers})
						 .map(res=> res.json());

	}

	registro(usuario_para_registrar){

		let parametros = JSON.stringify(usuario_para_registrar);

		let headers = new Headers({'Content-Type':'application/json'});

		//peticion ajax al servidor	
		return this._http.post(this.url + 'registrar', parametros, {headers: headers})
						 .map(res => res.json());
	}


	actualizarUsuario(usuario_para_actualizar){

		let parametros = JSON.stringify(usuario_para_actualizar);

		let headers = new Headers({
				'Content-Type':'application/json',
				'Autorizacion': this.getToken()
			});

		//peticion ajax al servidor
		return this._http.put(this.url+'actualizacion-usuario/' + usuario_para_actualizar._id, parametros, {headers: headers})
						 .map(res => res.json());
	}


	//metodo para recojer del localStorage la identidad
	getIdentidad(){

		let identidad = JSON.parse(localStorage.getItem('identidad'));

		if(identidad != "undefined"){

			this.identidad = identidad;

		}else{

			this.identidad = null;

		}

		return this.identidad;
	}

	//metodo para recojer del localStorage el token
	getToken(){

		let token = localStorage.getItem('token');

		if(token != "undefined"){
			
			this.token = token;
		
		}else{
		
			this.token = null;
		}

		return this.token;
	}

	





}