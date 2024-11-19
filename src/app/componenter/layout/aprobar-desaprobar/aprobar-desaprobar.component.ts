import { Component, inject, OnInit } from '@angular/core';
import { DatosUsuariosService } from '../../../servicios/usuario/datos-usuarios.service';
import bootstrap from '../../../../main.server';

@Component({
  selector: 'app-aprobar-desaprobar',
  standalone: true,
  imports: [],
  templateUrl: './aprobar-desaprobar.component.html',
  styleUrl: './aprobar-desaprobar.component.css'
})
export class AprobarDesaprobarComponent implements OnInit{
  servicio = inject(DatosUsuariosService)
  ingresos: any[] = [];
  accion: string = '';
  elementoSeleccionado: any = null;
  ngOnInit(): void {
    this.servicio.ingreso().subscribe(
      (data) => {
        let respuesta = data;
        this.ingresos = respuesta.objetos;
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
