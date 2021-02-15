import { Component, OnInit } from '@angular/core';
import { UsuarioServicio } from './servicios/usuario.servicio';
import { UsuarioModelo } from './modelos/usuarioModelo';



@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  providers: [UsuarioServicio]
})

export class AppComponent implements OnInit{
  public title = 'Bienvenido a los Escritos de Manuel Argudo Alvarez';
  public usuarioModelo_identidicado: UsuarioModelo;
  public usuarioModelo_registrado: UsuarioModelo;
  public identidad;
  public token;
  public identificateErrorMessage;
  public registrateAlertaMessage;
  public url: string;  

  constructor( 
  	
  	private _usuarioServicio: UsuarioServicio

  	){
  	this.usuarioModelo_identidicado = new UsuarioModelo('','','','','','ROL_USUARIO','');
  	this.usuarioModelo_registrado = new UsuarioModelo('','','','','','ROL_USUARIO','');
  }

  //metodo que se ejecuta nada mas cargar la aplicacion
  public ngOnInit(){

  	this.identidad = this._usuarioServicio.getIdentidad();
  	this.token = this._usuarioServicio.getToken();

  	console.log(this.identidad);
  	console.log(this.token);

  }

  public onSubmit(){
  	console.log(this.usuarioModelo_identidicado);

  	//consguimos los datos del usuario identificado
  	this._usuarioServicio.ingreso(this.usuarioModelo_identidicado).subscribe(

  		response => {

  			let identidad = response.usuario;
  			this.identidad = identidad;

  			if(!this.identidad._id){
  				
  				alert('El usuario no esta correctamente identificado')

  			}else{

  				//crear elemento en el localStroage para tener al usuario en sesion, asi lo podremos llamar en cualquier parte de la aplicacion
  				localStorage.setItem('identidad', JSON.stringify(identidad));

  				//conseguimos el token para enviarselo a cada peticion http
				this._usuarioServicio.ingreso(this.usuarioModelo_identidicado, 'true').subscribe(

				  		response => {

				  			let token = response.token;
				  			this.token = token;

				  			if(this.token.length <= 0){
				  				
				  				alert('El token no se ha generado');

				  			}else{

				  				//crear elemento en el localStroage para tener el token disponible
				  				localStorage.setItem('token', token);

				  				//reseteamos los campos
				  				this.identificateErrorMessage = null;
				  				this.usuarioModelo_identidicado = new UsuarioModelo('','','','','','ROL_USUARIO','');
				  			}
				  		},
				  		error => {

				  			var errorMessage = <any>error;

				  			if(errorMessage != null){
				  				
				  				//parseamos el error para poder mostrar el texto del message que devolvemos en la respuesta desde el usuarioControlados del back
				  				var body = JSON.parse(error._body)
				  				this.identificateErrorMessage = body.message;
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
  				this.identificateErrorMessage = body.message;
  				console.log(error);

  			}
  		}
  	);
  }

  public cerrarSesion(){

  	//borramos los datos del localStorage
    localStorage.removeItem('identity');
    localStorage.removeItem('token');
    localStorage.clear();

    //volvemos los valores a su estado inicial por defecto null
    this.identidad = null;
    this.token = null;
    this.registrateAlertaMessage = null;
	this.identificateErrorMessage = null;
	this.usuarioModelo_identidicado = new UsuarioModelo('','','','','','ROL_USUARIO','');
	this.usuarioModelo_registrado = new UsuarioModelo('','','','','','ROL_USUARIO','');
	//this._router.navigate(['/']);  

  }


  onSubmitRegistrate(){
    
    console.log(this.usuarioModelo_registrado);

    this._usuarioServicio.registro(this.usuarioModelo_registrado).subscribe(

      response => {

        let usuario = response.usuario;
        this.usuarioModelo_registrado = usuario;

        if(!usuario._id){

          this.registrateAlertaMessage = 'Error al registrarse';

        }else{

          this.registrateAlertaMessage = 'El registro se ha realizado correctamente, identificate con '+this.usuarioModelo_registrado.email;
          //reseteamos los campos
          this.usuarioModelo_registrado = new UsuarioModelo('','','','','','ROL_USUARIO','');
        }
      },
      error => {
        var errorMessage = <any>error;

        if(errorMessage != null){
          var body = JSON.parse(error._body);
          this.registrateAlertaMessage = body.message;

          console.log(error);
        }
      }
    );
  }




}//AppComponent



