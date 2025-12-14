import { Routes } from '@angular/router';
import { Home } from './componentes/home/home';
import { Milista } from './componentes/milista/milista';
import { Buscador } from './componentes/buscador/buscador';
import { Explorar } from './componentes/explorar/explorar';
import { DetallesAnimes } from './componentes/detalles-animes/detalles-animes';

export const routes: Routes = [

    { path: '', component: Home },
    { path: 'Milista', component: Milista },
    { path: 'buscador', component: Buscador },
    { path: 'explorar', component: Explorar },
    { path: 'anime/:id', component: DetallesAnimes },

];