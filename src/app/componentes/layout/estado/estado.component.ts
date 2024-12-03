import { Component, inject, OnInit, PLATFORM_ID } from '@angular/core';
import { DatosUsuariosService } from '../../../servicios/usuario/datos-usuarios.service';
import { isPlatformBrowser } from '@angular/common';

@Component({
  selector: 'app-estado',
  standalone: true,
  imports: [],
  templateUrl: './estado.component.html',
  styleUrl: './estado.component.css'
})
export class EstadoComponent implements OnInit{
  codigo:string = '';
  ingresos: any[] = [];
  retiros: any[] = [];
  platformId = inject(PLATFORM_ID);
  servicios = inject(DatosUsuariosService);

  ngOnInit(): void {
    if (isPlatformBrowser(this.platformId)) {
      let dato = sessionStorage.getItem("usuario");
      if (dato) {
        this.codigo = JSON.parse(dato).codigoAlumno;
      }
      let datos = { "codigo": this.codigo };
      this.servicios.estadoIngreso(datos).subscribe(
        (data)=>{
          let resultado = data;
          if(resultado.resultado){
            this.ingresos = resultado.objetos;
            console.log(this.ingresos);
          }else{
            console.log("Error al listar ingreso.")
          }
          this.servicios.estadoRetiro(datos).subscribe(
            (data2)=>{
              let resultado2 = data2;
              if(resultado2.resultado){
                this.retiros = resultado2.objetos;
                console.log(this.retiros);
              }else{
                console.log("Error al listar retiro.")
              }
            }
          );
        }
      );
    }
  }

}
