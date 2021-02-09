import { Component } from '@angular/core';
import { UsuarioModelo } from './modelos/usuarioModelo';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
})

export class AppComponent {
  public title = 'Escritos';
  public usuarioModelo: UsuarioModelo;
  public identidad;
  public token;

  constructor(){
  	this.usuarioModelo = new UsuarioModelo('','','','','','ROL_USUARIO','');
  }

}



