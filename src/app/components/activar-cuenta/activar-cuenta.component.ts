import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { UsuarioService } from 'src/app/service/usuario.service';
import { environment } from 'src/environments/environment';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-activar-cuenta',
  templateUrl: './activar-cuenta.component.html',
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
export class ActivarCuentaComponent implements OnInit {



  activarCuentaForm: FormGroup = this.fb.group({
    correo: ['', [Validators.required, Validators.email]],
    contrasena: ['', [Validators.required, Validators.minLength(8)]],
    confirmar_contrasena: ['', [Validators.required, Validators.minLength(8)]],
  });

  correo_param: string = '';
  pass_valid: boolean = false;

  loading: boolean = false;
  version: string = environment.version;
  nombre_sistema: string = environment.nombre_sistema;

  constructor( private fb: FormBuilder,
               private activatedRoute: ActivatedRoute,
               private usuarioService: UsuarioService,
               private router: Router) {
    
    this.activatedRoute.params.subscribe( ({correo}) => {
      console.log(correo);
      
      this.activarCuentaForm.get('correo').setValue(correo);
    })

  }

  ngOnInit(): void {
  }

  crearContrasena(){

    this.loading = true;

    if(this.activarCuentaForm.controls['contrasena'].value !== this.activarCuentaForm.controls['confirmar_contrasena'].value){
      return Swal.fire('Ups', 'Las contraseñas no coinciden, favor de verificar', 'warning');
    }

    return this.usuarioService.guardarContrasena( this.activarCuentaForm.value )
      .subscribe( (resp: any) => {
        
        if(resp.ok){

          Swal.fire({
            icon: 'success',
            title: '¡Bien!',
            html: `${resp.msg}`,
            allowOutsideClick: false
          }).then((result) => {
            if (result.isConfirmed) {
              this.loading = false;
              this.router.navigateByUrl('/login');
            }
          });

        }
        
      }, (err) => {
        console.log(err);
        this.loading = false;
        Swal.fire('Error', err.error.msg, 'error');

      }) 
    

  }

  validarContrasenas(){
    const pass1 = this.activarCuentaForm.controls['contrasena'];
    const pass2 = this.activarCuentaForm.controls['confirmar_contrasena'];
    return this.pass_valid = pass2.touched && (pass1.value !== pass2.value);
  }

}
