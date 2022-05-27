import { Component, OnInit } from '@angular/core';
import { environment } from 'src/environments/environment';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import Swal from 'sweetalert2';
import { AppConfig } from 'src/app/api/appconfig';
import { Subscription } from 'rxjs';
import { AdminService } from 'src/app/service/admin.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-admin-login',
  templateUrl: './admin-login.component.html',
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
export class AdminLoginComponent implements OnInit {

  nombre_sistema: string = environment.nombre_sistema;

  loading: boolean = false;

  adminLoginForm: FormGroup = this.fb.group({
    usuario: ['', [Validators.required, Validators.minLength(5), Validators.maxLength(20)]],
    contrasena: ['', [Validators.required, Validators.minLength(6), Validators.maxLength(20)]]
  });
  
  config: AppConfig;
  
  subscription: Subscription;

  version: string = environment.version;


  constructor( private fb: FormBuilder, private adminService: AdminService, private router: Router ) { }

  ngOnInit(): void {
  }

  login(){

    const usuario = this.adminLoginForm.controls['usuario'].value;
    const contrasena = this.adminLoginForm.controls['contrasena'].value;
    this.loading = true;
    

    if(!usuario || !contrasena){
      Swal.fire('Ups', 'Ingresa un usuario y contraseña', 'warning');
      this.loading = false;
      return;
    }

    this.adminService.loginAdmin( this.adminLoginForm.value )
      .subscribe( resp => {
        console.log(resp);
        this.router.navigateByUrl('/administracion-sistema');
        
      }, (err) => {
        this.loading = false;
        console.log(err);
        Swal.fire('Error', err.error.msg, 'error');
      })

    /*this.usuarioService.login( this.loginForm.value )
      .subscribe( resp => {

        this.router.navigateByUrl('/vote');
        
      }, (err) => {
        this.loading = false;
        console.log(err);
        Swal.fire('Error', err.error.msg, 'error');
      }) */
    // console.log(this.loginForm.value);
    
  }

}
