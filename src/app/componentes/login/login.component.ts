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
  islogearse: boolean = true;

  respuesta!: Respuesta;
  router = inject(Router)
  servicio = inject(DatosUsuariosService);
  login!: FormGroup;
  registro!: FormGroup;

  ngOnInit(): void {
    this.login = new FormGroup({
      usuario: new FormControl('',Validators.required),
      contrasenia: new FormControl('',Validators.required)
     });
     this.registro = new FormGroup({
      usuario: new FormControl('',Validators.required),
      contrasenia: new FormControl('',Validators.required),
      repcontrasenia: new FormControl('',Validators.required),
      codigo: new FormControl('',Validators.required),
      paterno: new FormControl('',Validators.required),
      materno: new FormControl('',Validators.required),
      nombres: new FormControl('',Validators.required),
      ingreso: new FormControl('',Validators.required),
      correo: new FormControl('',Validators.required),
      plan: new FormControl('',Validators.required)
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
          this.logearse();
        }
      )
    }
  }

  logearse(){
    if(this.respuesta.resultado){
      alert("Exito");
      localStorage.setItem("logeado","true");
      this.router.navigateByUrl("/estudiante");
    }else{
      alert("Error");
    }
  }

  registrar(){

  }

}
