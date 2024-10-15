import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DatosUsuariosService {

  private apiUrl = 'http://127.0.0.1:5000/api/data'
  private http = inject(HttpClient)

  constructor() { }

  postData(datos: any): Observable<any> {
    return this.http.post(this.apiUrl,datos)
  }


}
