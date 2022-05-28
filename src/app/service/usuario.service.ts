import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { catchError, map, Observable, of, tap } from 'rxjs';
import { environment } from 'src/environments/environment';
import { LoginForm } from '../interfaces/login-form.interface';
import { Usuario } from '../models/usuario.model';

const base_url = environment.baseUrl;

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  public usuario: Usuario;

  constructor(  private http: HttpClient,
    private router: Router) { }

  get perfil(): 0 | 1 | 2 {
    // console.log(this.usuario);
    
    // return 1;
    return this.usuario.perfil;
  }

  get token(): string{
    return localStorage.getItem('token') || '';
  }

  get headers(){
    return {
      headers: {
        'x-token': this.token
      }
    }
  }

  login(formData: LoginForm){
    
    return this.http.post( `${base_url}/login`, formData )
      .pipe(
        tap( (resp: any) =>{
          // console.log(resp);
          
          this.guardarLocalStorage( resp.token );
          // this.guardarLocalStorage( resp.token, resp.menu );
        })
      )
    
  }

  guardarLocalStorage( token: string ){
  // guardarLocalStorage( token: string, menu: any ){
    localStorage.setItem('token', token);
    // localStorage.setItem('menu', JSON.stringify(menu));
  }

  logOut(){
    localStorage.removeItem('token');
    localStorage.removeItem('menu');
    this.router.navigateByUrl('/login');
  }

  // Se ejecuta en el guard, antes de abrir la ruta
  validarToken(): Observable<boolean>{ // Regresa un observable que emite un boolean
    return this.http.get( `${base_url}/login/renew`, this.headers )
      .pipe( 
        map( (resp: any) => {

          // console.log(resp);

          const { id_usuario, id_distrito, nombre_usuario, perfil, estado, usuario } = resp.usuarioDB;
          // const token = resp.token;

          this.usuario = new Usuario( id_usuario, id_distrito, nombre_usuario, usuario, estado, perfil, '' );

          this.guardarLocalStorage( resp.token );

          return true;
        }),
        catchError( error => of(false))
       );
  }

}
