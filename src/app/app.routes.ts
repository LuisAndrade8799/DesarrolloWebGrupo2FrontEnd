import { Routes } from '@angular/router';
import { LoginComponent } from './componentes/login/login.component';
import { EstudianteComponent } from './componentes/layout/estudiante/estudiante.component';
import { VicedecanoComponent } from './componentes/layout/vicedecano/vicedecano.component';

export const routes: Routes = [
    {
        path: '',
        redirectTo: 'login',
        pathMatch: 'full'
    },
    {
        path: 'login',
        component: LoginComponent
    },
    {
        path:'estudiante',
        component:EstudianteComponent,
        children: []
    },
    {
        path:'vicedecano',
        component:VicedecanoComponent,
    }
];
