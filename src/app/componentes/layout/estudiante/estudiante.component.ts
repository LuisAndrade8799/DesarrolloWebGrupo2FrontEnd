import { isPlatformBrowser } from '@angular/common';
import { Component, inject, OnInit, PLATFORM_ID } from '@angular/core';

@Component({
  selector: 'app-estudiante',
  standalone: true,
  imports: [],
  templateUrl: './estudiante.component.html',
  styleUrl: './estudiante.component.css'
})
export class EstudianteComponent implements OnInit{
  usuario: any;
  platformId = inject(PLATFORM_ID)   
  ngOnInit(): void {
    if(isPlatformBrowser(this.platformId)){ 
        let dato = sessionStorage.getItem("usuario");
        if(dato){
          this.usuario = JSON.parse(dato);
        }
        
    }
  }
}
