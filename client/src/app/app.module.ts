import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { routing, appRoutingProviders } from './app.routing';

//importamos todos los componentes
import { AppComponent } from './app.component';  //componente principal
import { UsuarioEditarComponent } from './components/usuario-editar.component';



/*
En -- declarations -- cargamos componentes, asi podremos acceder desde otras plantillas de componentes a sus directivas
En -- imports -- cargamos modulos del framework y los que hagamos nosotros
En -- providers -- cargamos servicions
En -- bootstrap -- es el punto principal donde cargamos la aplicacion, donde decimos que componente es el principal
*/

@NgModule({
  declarations: [
    AppComponent,
    UsuarioEditarComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    routing
  ],
  providers: [appRoutingProviders],
  bootstrap: [AppComponent]
})
export class AppModule { }
