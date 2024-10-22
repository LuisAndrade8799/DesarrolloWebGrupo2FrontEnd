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
  isMatriculado: boolean = false;
  isContrasenia: boolean = false;

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
      codigo: new FormControl('',Validators.required)
     }); 
  }
  
  logear(){
    
    if(this.login.valid){
      let datos = {
        "usuario": this.login.get('usuario')?.value,
        "contrasenia": this.login.get('contrasenia')?.value
      };
      this.servicio.login(datos).subscribe(
        (data) => {
          let respuesta: Respuesta = data;
          if(respuesta.resultado){
            alert("Exito");
            sessionStorage.setItem("logeado","true");
            let codigo = {
              "codigo": respuesta.objeto.codigo
            }
            this.servicio.matriculado(codigo).subscribe(
              (data1) => {
                let respuesta1: Respuesta = data1;
                console.log(respuesta1.objeto);
                sessionStorage.setItem("usuario",JSON.stringify(respuesta1.objeto))
                this.router.navigateByUrl("/estudiante");
              }
            )
            
          }else{
            alert("Error");
          }
        }
      )
    }
  }

  registrar(){
    if(this.registro.valid && this.isMatriculado && this.isContrasenia){
      let datos = {
        "usuario": this.registro.get("usuario")?.value,
        "codigo": this.registro.get("codigo")?.value,
        "contrasenia": this.registro.get("contrasenia")?.value
      }
      this.servicio.registro(datos).subscribe(
        (data) => {
          let respuesta: Respuesta = data;
          if(respuesta.resultado){
            alert("Se registro con exito el usuario.");
            this.islogearse = true
          }else{
            alert("Error al registrarse.")
          }
        }
      )
    }
  }

  comprobar(){
    let contrasenia = this.registro.get("contrasenia")?.value;
    let repContrasenia = this.registro.get("repcontrasenia")?.value;
    if(contrasenia == repContrasenia){
      this.isContrasenia = true;
    }else{
      this.isContrasenia = false;
      alert("Las contraseñas no coinciden!!")
    }
  }

  matriculado(){
    let datos = {
      "codigo": this.registro.get('codigo')?.value
    }
    this.servicio.matriculado(datos).subscribe(
      (data) => {
        let respuesta: Respuesta = data;
        if(respuesta.resultado){
          this.isMatriculado = true;
        }else{
          this.isMatriculado = false;
        }
        console.log(this.isMatriculado)
      }
    )
  }


}
