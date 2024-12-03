import { Component, inject, OnInit } from '@angular/core';
import { DatosUsuariosService } from '../../../servicios/usuario/datos-usuarios.service';
import * as XLSX from 'xlsx';
import { saveAs } from 'file-saver';

@Component({
  selector: 'app-imprimir',
  standalone: true,
  imports: [],
  templateUrl: './imprimir.component.html',
  styleUrl: './imprimir.component.css'
})
export class ImprimirComponent implements OnInit{
servicios = inject(DatosUsuariosService);
ingresos: any[]=[];
retiros: any[]=[];

ngOnInit(): void {
  this.servicios.estadoIngreso2().subscribe(
    (data)=>{
      let resultado = data;
      if(resultado.resultado){
        this.ingresos = resultado.objetos;
        console.log(this.ingresos);
      }else{
        console.log("Error al listar ingreso.")
      }
      this.servicios.estadoRetiro2().subscribe(
        (data2)=>{
          let resultado2 = data2;
          if(resultado2.resultado){
            this.retiros = resultado2.objetos;
            console.log(this.retiros);
          }else{
            console.log("Error al listar retiro.")
          }
        }
      )
    }
  );
}
exportarExcel(valor:any) {
  // Obtener la tabla HTML como un elemento DOM
  const tabla = document.getElementById(valor);

  // Convertir la tabla en una hoja de Excel
  const ws: XLSX.WorkSheet = XLSX.utils.table_to_sheet(tabla);

  // Crear el libro de Excel (workbook)
  const wb: XLSX.WorkBook = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(wb, ws, 'Tabla');

  // Generar el archivo Excel
  const excelBuffer: any = XLSX.write(wb, { bookType: 'xlsx', type: 'array' });

  // Guardar el archivo usando FileSaver
  const data: Blob = new Blob([excelBuffer], { type: 'application/octet-stream' });
  saveAs(data, valor+'.xlsx');
}
}
