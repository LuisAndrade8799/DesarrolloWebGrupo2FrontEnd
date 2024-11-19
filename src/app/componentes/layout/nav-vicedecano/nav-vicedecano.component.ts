import { Component, inject } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-nav-vicedecano',
  standalone: true,
  imports: [
    RouterOutlet
  ],
  templateUrl: './nav-vicedecano.component.html',
  styleUrl: './nav-vicedecano.component.css'
})
export class NavVicedecanoComponent {
  router = inject(Router)
  logout(){
    sessionStorage.removeItem("logeado");
    sessionStorage.removeItem("usuario");
    this.router.navigateByUrl('/login');
  }
}
