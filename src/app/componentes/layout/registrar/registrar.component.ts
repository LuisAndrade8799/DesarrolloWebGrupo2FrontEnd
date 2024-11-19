import { CommonModule, isPlatformBrowser } from '@angular/common';
import { Component, inject, OnInit, PLATFORM_ID } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { DatosUsuariosService } from '../../../servicios/usuario/datos-usuarios.service';
import { Respuesta } from '../../../modelo/respuesta.model';

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
  platformId = inject(PLATFORM_ID);
  cursosFiltrados: any[] = [];
  servicio = inject(DatosUsuariosService)
  codigo: any;
  idMatricula: any;
  expediente = '';

  ngOnInit(): void {
    if(isPlatformBrowser(this.platformId)){ 
      let dato = sessionStorage.getItem("usuario");
      if(dato){
        this.codigo = JSON.parse(dato).codigoAlumno;
      }
      let datos = {
        "codigo":this.codigo
      }
      this.servicio.cursos(datos).subscribe(
        (data) => {
          let respuesta = data;
          this.idMatricula = respuesta.idMatricula;
          this.cursos = respuesta.objetos.map( (curso: any) => ({...curso,rectificacion:false}))
        }
      )
    }
  
  }

  actualizarFiltrados(){
    this.cursosFiltrados = this.cursos.filter(curso => curso.rectificacion)
                                      .map(curso => (
                                        {
                                        codigo: curso.codigoCurso,
                                        nombre: curso.nombreCurso,
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
    if(this.expediente != ''){
      let datos = {
        "expediente":this.expediente,
        "codigoAlumno":this.codigo,
        "idMatricula": this.idMatricula,
        "rectificar": this.cursosFiltrados
      }
      console.log(datos);
      this.servicio.rectificar(datos).subscribe(
        (data) => {
          let respuesta = data;
          if (respuesta.resultado){
            alert("Se registro la rectificación de forma exitosa.")
          }else{
            alert("Error al registrar la rectificación.")
          }
        }
      )
    }else{
      alert("Llene el campo de expediente.")
    }
    
  }

}
