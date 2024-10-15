import { Component, inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { DatosUsuariosService } from '../../servicios/usuario/datos-usuarios.service';
import { CommonModule } from '@angular/common';
import { Respuesta } from '../../modelo/respuesta.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    CommonModule
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent implements OnInit{
  logearse: boolean = true;

  respuesta!: Respuesta;
  router = inject(Router)
  servicio = inject(DatosUsuariosService);
  login!: FormGroup;
  ngOnInit(): void {
    this.login = new FormGroup({
      usuario: new FormControl('',Validators.required),
      contrasenia: new FormControl('',Validators.required)
     });
  }
  
  logear(){
    
    if(this.login.valid){
      let datos = {
        "usuario": this.login.get('usuario')?.value,
        "contrasenia": this.login.get('contrasenia')?.value
      };
      this.servicio.postData(datos).subscribe(
        (data) => {
          this.respuesta = data;
          this.log();
        }
      )
    }
  }

  log(){
    if(this.respuesta.resultado){
      alert("Exito");
      this.router.navigateByUrl("/estudiante")
    }else{
      alert("Error");
    }
  }

}
