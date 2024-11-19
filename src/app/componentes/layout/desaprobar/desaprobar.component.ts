import { Component, inject, OnInit } from '@angular/core';
import { DatosUsuariosService } from '../../../servicios/usuario/datos-usuarios.service';

@Component({
  selector: 'app-desaprobar',
  standalone: true,
  imports: [],
  templateUrl: './desaprobar.component.html',
  styleUrl: './desaprobar.component.css'
})
export class DesaprobarComponent implements OnInit{
  accion: string ='';
  elementoSeleccionado:any = null;
  retiros: any[] = [];
  servicio = inject(DatosUsuariosService);
  ngOnInit(): void {
    this.servicio.retiro().subscribe(
      (data) => {
        let respuesta = data;
        this.retiros = respuesta.objetos;
      }
    )
  }
  
  abrirModal(accion: string, item: any){
    this.accion = accion;
    this.elementoSeleccionado = item;
  }

  confirmarAccion() {
    if (this.accion === 'aprobar') {
      console.log(`Estudiante aprobado: ${this.elementoSeleccionado.numeroExpediente}`);
    } else if (this.accion === 'desaprobar') {
      console.log(`Estudiante desaprobado: ${this.elementoSeleccionado.numeroExpediente}`);
    }
  }
}
