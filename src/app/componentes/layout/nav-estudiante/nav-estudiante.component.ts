import { Component, inject } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';


@Component({
  selector: 'app-nav-estudiante',
  standalone: true,
  imports: [RouterOutlet],
  templateUrl: './nav-estudiante.component.html',
  styleUrl: './nav-estudiante.component.css'
})
export class NavEstudianteComponent {
  router = inject(Router);

  logout(){
    sessionStorage.removeItem("logeado");
    sessionStorage.removeItem("usuario");
    this.router.navigateByUrl('/login');
  }
}
