import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UsuarioService } from 'src/app/service/usuario.service';
import { environment } from 'src/environments/environment';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-recuperar-contrasena',
  templateUrl: './recuperar-contrasena.component.html',
  styles: [
    `
    :host ::ng-deep form p-password input {
    width: 100% !important;
    padding:1rem;
    }

    :host ::ng-deep form .pi-eye{
      transform:scale(1.6);
      margin-right: 1rem;
      color: var(--primary-color) !important;
    }

    :host ::ng-deep form .pi-eye-slash{
      transform:scale(1.6);
      margin-right: 1rem;
      color: var(--primary-color) !important;
    }
    .login {
      overflow: hidden;
    }
  `
  ]
})
export class RecuperarContrasenaComponent implements OnInit {

  formForgotPass: FormGroup = this.fb.group({
    correo: ['', [Validators.required, Validators.maxLength(30), Validators.email]]
  });
  loading: boolean = false;
  nombre_sistema: string = environment.nombre_sistema;
  version = environment.version;

  constructor( private fb: FormBuilder,
               private usuarioService: UsuarioService,
               private router: Router ) { }

  ngOnInit(): void {
  }

  getPass(){

    const correo = this.formForgotPass.controls['correo'].value;
    this.loading = true;
    

    if(!correo){
      Swal.fire('Ups', 'Debes ingresar un correo', 'warning');
      this.loading = false;
      return;
    }
    
    this.usuarioService.recuperarContrasena( this.formForgotPass.value )
      .subscribe( (res: any) => {

        console.log(res);
        

        if(res.ok){

          Swal.fire({
            icon: 'success',
            title: '¡Bien!',
            html: `${res.msg}`,
            allowOutsideClick: false
          }).then((result) => {
            if (result.isConfirmed) {
              this.loading = false;
              this.router.navigateByUrl('/login');
            }
          });
          
        } else{
          Swal.fire('Correo no enviado', 'El correo electrónico es incorrecto o la cuenta no ha sido activada', 'warning');
        }

        this.loading = false;
        
      });

  }

}
