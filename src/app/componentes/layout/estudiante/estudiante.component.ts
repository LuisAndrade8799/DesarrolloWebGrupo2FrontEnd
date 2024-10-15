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
  router = inject(Router)
  platformId = inject(PLATFORM_ID)   
  ngOnInit(): void {
    if(isPlatformBrowser(this.platformId)){
        if(localStorage.getItem("logeado") != 'true'){
          this.router.navigateByUrl('/login');
        }
    }
  }

  logout(){
    localStorage.removeItem("logeado");
    this.router.navigateByUrl('/login');
  }

}
