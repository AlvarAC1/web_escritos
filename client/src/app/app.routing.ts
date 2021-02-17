import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

// import user
// import { HomeComponent } from './components/home.component';
import { UsuarioEditarComponent } from './components/usuario-editar.component';

// import artist
// import { ArtistListComponent } from './components/artist-list.component';
// import { ArtistAddComponent } from './components/artist-add.component';
// import { ArtistEditComponent } from './components/artist-edit.component';
// import { ArtistDetailComponent } from './components/artist-detail.component';

// import album
// import { AlbumAddComponent } from './components/album-add.component';
// import { AlbumEditComponent } from './components/album-edit.component';
// import { AlbumDetailComponent } from './components/album-detail.component';

// import song
// import { SongAddComponent } from './components/song-add.component';
// import { SongEditComponent } from './components/song-edit.component';

//array de rutas
const appRoutes: Routes = [
	{path: '', component: UsuarioEditarComponent},
	{path: 'mis-datos', component: UsuarioEditarComponent},
	{path: '**', component: UsuarioEditarComponent}
];

//para exportar las rutas como servicio
export const appRoutingProviders: any[] = []; //configuracion necesaria para el router
export const routing: ModuleWithProviders = RouterModule.forRoot(appRoutes);