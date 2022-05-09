import { Component, OnInit, OnDestroy } from '@angular/core';
import { ConfigService } from '../../service/app.config.service';
import { AppConfig } from '../../api/appconfig';
import { Subscription } from 'rxjs';
import { environment } from 'src/environments/environment';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import Swal from 'sweetalert2';

import { UsuarioService } from 'src/app/service/usuario.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styles:[`
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
export class LoginComponent implements OnInit, OnDestroy {

  loading: boolean = false;

  loginForm: FormGroup = this.fb.group({
    usuario: ['', [Validators.required, Validators.minLength(5), Validators.maxLength(20)]],
    contrasena: ['', [Validators.required, Validators.minLength(6), Validators.maxLength(20)]]
  });

  valCheck: string[] = ['remember'];

  password: string;
  
  config: AppConfig;
  
  subscription: Subscription;

  version: string = environment.version;

  constructor(public configService: ConfigService, private fb: FormBuilder,
    private usuarioService: UsuarioService,
    private router:Router){ }

  ngOnInit(): void {
    this.config = this.configService.config;
    this.subscription = this.configService.configUpdate$.subscribe(config => {
      this.config = config;
    });
  }

  ngOnDestroy(): void {
    if(this.subscription){
      this.subscription.unsubscribe();
    }
  }

  login(){

    const usuario = this.loginForm.controls['usuario'].value;
    const contrasena = this.loginForm.controls['contrasena'].value;
    this.loading = true;
    

    if(!usuario || !contrasena){
      Swal.fire('Ups', 'Ingresa un usuario y contraseña', 'warning');
      this.loading = false;
      return;
    }

    this.usuarioService.login( this.loginForm.value )
      .subscribe( resp => {

        this.router.navigateByUrl('/main');
        
      }, (err) => {
        this.loading = false;
        console.log(err);
        Swal.fire('Error', err.error.msg, 'error');
      })
    // console.log(this.loginForm.value);
    
  }

}
