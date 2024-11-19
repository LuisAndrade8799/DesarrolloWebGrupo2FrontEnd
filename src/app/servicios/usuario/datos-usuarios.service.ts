import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DatosUsuariosService {

  private apiUrl = 'http://127.0.0.1:5000/api'
  private http = inject(HttpClient)

  constructor() { }

  login(datos: any): Observable<any> {
    return this.http.post(this.apiUrl+'/login',datos)
  }

  registro(datos: any): Observable<any> {
    return this.http.post(this.apiUrl+'/registro',datos)
  }

  matriculado(datos: any): Observable<any> {
    return this.http.post(this.apiUrl+'/matriculado',datos)
  }

  cursos(datos: any): Observable<any>{
    return this.http.post(this.apiUrl+'/cursos',datos)
  }

  rectificar(datos: any): Observable<any>{
    return this.http.post(this.apiUrl+'/rectificar',datos)
  }

  ingreso():Observable<any>{
    return this.http.get(this.apiUrl+'/ingreso')
  }

  retiro():Observable<any>{
    return this.http.get(this.apiUrl+'/retiro')
  }
}
