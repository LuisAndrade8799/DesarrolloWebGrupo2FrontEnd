import { Routes } from '@angular/router';
import { LoginComponent } from './componentes/login/login.component';
import { EstudianteComponent } from './componentes/layout/estudiante/estudiante.component';
import { VicedecanoComponent } from './componentes/layout/vicedecano/vicedecano.component';
import { NavEstudianteComponent } from './componentes/layout/nav-estudiante/nav-estudiante.component';
import { RegistrarComponent } from './componentes/layout/registrar/registrar.component';
import { EstadoComponent } from './componentes/layout/estado/estado.component';

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
        path:'',
        component:NavEstudianteComponent,
        children: [
            {
                path: 'estudiante',
                component: EstudianteComponent
            },
            {
                path: 'registrar',
                component: RegistrarComponent
            },
            {
                path: 'estado',
                component: EstadoComponent
            }
        ]
    },
    {
        path:'vicedecano',
        component:VicedecanoComponent,
    }
];
