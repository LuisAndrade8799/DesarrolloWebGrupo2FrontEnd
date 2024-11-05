import { isPlatformBrowser } from '@angular/common';
import { Component, inject, PLATFORM_ID } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';


@Component({
  selector: 'app-nav-estudiante',
  standalone: true,
  imports: [RouterOutlet],
  templateUrl: './nav-estudiante.component.html',
  styleUrl: './nav-estudiante.component.css'
})
export class NavEstudianteComponent {
  router = inject(Router)
  platformId = inject(PLATFORM_ID)   
  ngOnInit(): void {
    
    if(isPlatformBrowser(this.platformId)){
      if(sessionStorage.getItem("logeado") != 'true'){
          this.router.navigateByUrl('/login');
        }
    }
    
  }

  logout(){
    sessionStorage.removeItem("logeado");
    sessionStorage.removeItem("usuario");
    this.router.navigateByUrl('/login');
  }
}
