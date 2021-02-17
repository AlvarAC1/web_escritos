import { Component, OnInit } from '@angular/core';

import { GLOBAL } from '../servicios/global';
import { UsuarioServicio } from '../servicios/usuario.servicio';
import { UsuarioModelo } from '../modelos/usuarioModelo';

@Component({
	selector: 'usuario-editar',
	templateUrl: '../vistas/usuario-editar.html',
	providers: [UsuarioServicio]
})

export class UsuarioEditarComponent implements OnInit {

	public titulo: string;
	public user: UsuarioModelo;
	public identidad;
	public token;
	public alertMessage;
	public url:string;
	
	constructor( 
		
		private _usuarioServicio: UsuarioServicio
		
		){
		
		this.titulo = "Actualizar mis datos";
		this.identidad = this._usuarioServicio.getIdentidad();
  		this.token = this._usuarioServicio.getToken();

	}


	ngOnInit(){
	
		console.log("UsuarioEditarComponent.ts cargado");

	
	}


}//UsuarioEditarComponent