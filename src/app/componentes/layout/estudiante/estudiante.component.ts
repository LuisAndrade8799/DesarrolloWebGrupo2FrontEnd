import { Component, inject, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-estudiante',
  standalone: true,
  imports: [],
  templateUrl: './estudiante.component.html',
  styleUrl: './estudiante.component.css'
})
export class EstudianteComponent implements OnInit{
  router = inject(Router)
  
  ngOnInit(): void {
    if(localStorage.length === 0){
        this.router.navigateByUrl("/login");
    }
  }

}
