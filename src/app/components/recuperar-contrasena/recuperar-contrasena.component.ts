import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { environment } from 'src/environments/environment';

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

  constructor( private fb: FormBuilder ) { }

  ngOnInit(): void {
  }

  getPass(){
    // TODO: Realizar petición para enviar correo y recuperar contraseña
    alert('Submit!');
  }

}
