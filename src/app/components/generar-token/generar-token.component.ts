import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UsuarioService } from 'src/app/service/usuario.service';
import { environment } from 'src/environments/environment';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-generar-token',
  templateUrl: './generar-token.component.html',
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
export class GenerarTokenComponent implements OnInit {

  generarTokenForm: FormGroup = this.fb.group({
    correo: ['', [Validators.required, Validators.email]]
  });
  loading: boolean = false;
  nombre_sistema: string = environment.nombre_sistema;
  version: string = environment.version;

  constructor(private fb: FormBuilder,
              private usuarioService: UsuarioService,
              private router: Router) { }

  ngOnInit(): void {
  }

  crearToken() {
    
    this.loading = true;
    const correo = this.generarTokenForm.controls['correo'].value;
    if (!correo) {
      return Swal.fire('Ups', 'El correo es obligatorio, favor de verificar', 'warning');
    }

    console.log(correo);
    

    return this.usuarioService.generarTokenMail( this.generarTokenForm.value )
      .subscribe( (resp: any) =>{

        // console.log('pasa');
        console.log(resp);
        
        this.loading = false;
        

          localStorage.setItem('correo', this.generarTokenForm.controls['correo'].value );

          Swal.fire({
            position: 'top-end',
            icon: 'success',
            title: `Se ha enviado un token a tu correo`,
            showConfirmButton: false,
            timer: 2000,
          });
        
          // this.loading = false;
          this.router.navigateByUrl('/activar-cuenta');

        
        
      }, (err) => {
        console.log(err);
        this.loading = false;
        Swal.fire('Error', err.error.msg, 'error');

      })
  }

}
