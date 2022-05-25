import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { tap } from 'rxjs';
import { environment } from 'src/environments/environment';
import { LoginForm } from '../interfaces/login-form.interface';

const base_url = environment.baseUrl;

@Injectable({
  providedIn: 'root'
})
export class AdminService {

  constructor( private http: HttpClient,
    private router: Router ) { }

  loginAdmin(formData: LoginForm){
    
    return this.http.post( `${base_url}/sistema`, formData )
      .pipe(
        tap( (resp: any) =>{
          // console.log(resp);
          
          this.guardarLocalStorage( resp.token, resp.menu );
        })
      )
    
  }

  guardarLocalStorage( token: string, menu: any ){
    localStorage.setItem('token', token);
    localStorage.setItem('menu', JSON.stringify(menu));
  }


}
