import { isPlatformBrowser } from '@angular/common';
import { Component, inject, OnInit, PLATFORM_ID } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';


@Component({
  selector: 'app-estudiante',
  standalone: true,
  imports: [
    RouterOutlet
  ],
  templateUrl: './estudiante.component.html',
  styleUrl: './estudiante.component.css'
})
export class EstudianteComponent implements OnInit{
  usuario: any;
  router = inject(Router)
  platformId = inject(PLATFORM_ID)   
  ngOnInit(): void {
    if(isPlatformBrowser(this.platformId)){
        if(sessionStorage.getItem("logeado") != 'true'){
          this.router.navigateByUrl('/login');
        }
        let dato = sessionStorage.getItem("usuario");
        if(dato){
          this.usuario = JSON.parse(dato);
        }
    }
  }

  logout(){
    sessionStorage.removeItem("logeado");
    sessionStorage.removeItem("usuario");
    this.router.navigateByUrl('/login');
  }

}
