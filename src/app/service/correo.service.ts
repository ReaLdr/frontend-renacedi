import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

const base_url = environment.baseUrl;

@Injectable({
  providedIn: 'root'
})
export class CorreoService {

  constructor( private http: HttpClient ) { }

  get token(): string {
    return localStorage.getItem('token') || '';
  }

  get headers() {
    console.log(this.token);
    
    return {
      headers: {
        'x-token': this.token
      }
    }
  }

  ejecutarEnvioCorreos(){
    const url = `${base_url}/correo/masivo`;
    return this.http.post(url, {}, this.headers)
  }
}
