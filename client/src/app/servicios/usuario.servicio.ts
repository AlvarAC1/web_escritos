import { Injectable } from '@angular/core'; //permite inyectar este servicio o clase en otras clases o componenetes
import { Http, Response, Headers } from '@angular/http';
import 'rxjs/add/operator/map'; //para mapear objetos, posibles fallos Angulas6+ --> https://www.udemy.com/course/desarrollo-web-con-javascript-angular-nodejs-y-mongodb/learn/lecture/10327558#questions/5993394
import { Observable } from 'rxjs/Observable'; //para recojer las respuestas al hacer peticion ajax al servidor, posibles fallos Angulas6+ --> https://www.udemy.com/course/desarrollo-web-con-javascript-angular-nodejs-y-mongodb/learn/lecture/10327558#questions/5993394
import { GLOBAL } from './global';

@Injectable()
export class UsuarioServicio{

	public identity;
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

		let json = JSON.stringify(usuario_para_loguear);
		let params = json;
		let headers = new Headers({'Content-Type':'application/json'});

		return this._http.post(this.url+'login', params, {headers: headers})
						 .map(res=> res.json());

	}





}