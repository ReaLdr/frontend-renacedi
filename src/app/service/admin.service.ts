import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { catchError, map, Observable, of, tap } from 'rxjs';
import { environment } from 'src/environments/environment';
import { LoginForm } from '../interfaces/login-form.interface';
import { Administrador } from '../models/admin.model';

const base_url = environment.baseUrl;

@Injectable({
  providedIn: 'root'
})
export class AdminService {

  public administrador: Administrador;

  constructor(private http: HttpClient,
    private router: Router) { }

  get perfil(): 1 | 2 {
    // console.log(this.usuario);

    // return 1;
    return this.administrador.perfil;
  }

  get token(): string {
    return localStorage.getItem('token') || '';
  }

  get headers() {
    return {
      headers: {
        'x-token': this.token
      }
    }
  }

  loginAdmin(formData: LoginForm) {

    return this.http.post(`${base_url}/login-administracion`, formData)
      .pipe(
        tap((resp: any) => {
          console.log(resp);

          this.guardarLocalStorage(resp.token, resp.menu);
        })
      )

  }

  guardarLocalStorage(token: string, menu: any) {
    localStorage.setItem('token', token);
    localStorage.setItem('menu', JSON.stringify(menu));
  }

  // Se ejecuta en el guard, antes de abrir la ruta
  validarTokenAdmin(): Observable<boolean> { // Regresa un observable que emite un boolean
    return this.http.get(`${base_url}/login-administracion/renew-admin`, this.headers)
      .pipe(
        map((resp: any) => {

          // console.log(resp);

          const { id_admin, usuario, estado, perfil } = resp.usuarioDB;
          // const token = resp.token;

          this.administrador = new Administrador(id_admin, usuario, estado, perfil, '');

          this.guardarLocalStorage(resp.token, resp.menu);

          return true;
        }),
        catchError(error => of(false))
      );
  }


}
