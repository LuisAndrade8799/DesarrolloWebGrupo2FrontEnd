import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-registrar',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule
  ],
  templateUrl: './registrar.component.html',
  styleUrl: './registrar.component.css'
})
export class RegistrarComponent implements OnInit{
  cursos: any[] = [];
  cursosFiltrados: any[] = [];

  ngOnInit(): void {
    const datosDesdeBD = [
      { codigo: 'CS101', nombre: 'Introducción a la Programación', profesor: 'Juan Pérez', seccion: 'A', horario: 'Lunes 10:00 - 12:00' },
      { codigo: 'CS102', nombre: 'Estructura de Datos', profesor: 'María Gómez', seccion: 'B', horario: 'Martes 14:00 - 16:00' },
      { codigo: 'CS103', nombre: 'Base de Datos', profesor: 'Carlos Díaz', seccion: 'C', horario: 'Miércoles 08:00 - 10:00' }
    ];
    this.cursos = datosDesdeBD.map(curso => ({...curso, rectificacion:false}));
  }

  actualizarFiltrados(){
    this.cursosFiltrados = this.cursos.filter(curso => curso.rectificacion)
                                      .map(curso => ({
                                        codigo: curso.codigo,
                                        nombre: curso.nombre,
                                        seccion: curso.seccion,
                                        cambio: false,
                                        nuevaSeccion: '',
                                        nuevaSeccion2: '',
                                        retiro: false,
                                        motivo: ''
                                      }));
  }

  actualizarRectificacion(){
    this.actualizarFiltrados();
  }

  enviarRectificacion(){
    if(this.cursosFiltrados.length != 0){
      console.log(this.cursosFiltrados);
    }else{
      console.log("Necesita seleccionar cursos a rectificar.");
    }
  }

}
