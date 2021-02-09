import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { AppComponent } from './app.component';


/*
En declarations cargamos componentes y directivas
En imports cargamos modulos del framework y los que hagamos nosotros
En providers cargamos servicions
En bootstrap es el punto principal donde cargamos la aplicacion, donde decimos que componente es el principal
*/

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
