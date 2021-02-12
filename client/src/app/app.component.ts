import { Component, OnInit } from '@angular/core';
import { UsuarioServicio } from './servicios/usuario.servicio';
import { UsuarioModelo } from './modelos/usuarioModelo';



@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  providers: [UsuarioServicio]
})

export class AppComponent implements OnInit{
  public title = 'Escritos';
  public usuarioModelo: UsuarioModelo;
  public identidad;
  public token;
  public errorMessage;

  constructor( 
  	
  	private _usuarioServicio: UsuarioServicio

  	){
  	this.usuarioModelo = new UsuarioModelo('','','','','','ROL_USUARIO','');
  }

  //metodo que se ejecuta nada mas cargar la aplicacion
  public ngOnInit(){

  	this.identidad = this._usuarioServicio.getIdentidad();
  	this.token = this._usuarioServicio.getToken();

  	console.log(this.identidad);
  	console.log(this.token);

  }

  public onSubmit(){
  	console.log(this.usuarioModelo);

  	//consguimos los datos del usuario identificado
  	this._usuarioServicio.ingreso(this.usuarioModelo).subscribe(

  		response => {

  			let identidad = response.usuario;
  			this.identidad = identidad;

  			if(!this.identidad._id){
  				
  				alert('El usuario no esta correctamente identificado')

  			}else{

  				//crear elemento en el localStroage para tener al usuario en sesion, asi lo podremos llamar en cualquier parte de la aplicacion
  				localStorage.setItem('identidad', JSON.stringify(identidad));

  				//conseguimos el token para enviarselo a cada peticion http
				this._usuarioServicio.ingreso(this.usuarioModelo, 'true').subscribe(

				  		response => {

				  			let token = response.token;
				  			this.token = token;

				  			if(this.token.length <= 0){
				  				
				  				alert('El token no se ha generado');

				  			}else{

				  				//crear elemento en el localStroage para tener el token disponible
				  				localStorage.setItem('token', token);

				  				console.log(token);
				  				console.log(identidad);
				  			}

				  		},
				  		error => {

				  			var errorMessage = <any>error;

				  			if(errorMessage != null){
				  				
				  				//parseamos el error para poder mostrar el texto del message que devolvemos en la respuesta desde el usuarioControlados del back
				  				var body = JSON.parse(error._body)
				  				this.errorMessage = body.message;
				  				console.log(error);

				  			}

				  		}

				  	);  					
  			}

  		},
  		error => {

  			var errorMessage = <any>error;

  			if(errorMessage != null){
  				
  				//parseamos el error para poder mostrar el texto del message que devolvemos en la respuesta desde el usuarioControlados del back
  				var body = JSON.parse(error._body)
  				this.errorMessage = body.message;
  				console.log(error);

  			}

  		}

  	);
  }

}



