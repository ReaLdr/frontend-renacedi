import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs';
import { environment } from 'src/environments/environment';
import { BoletaDistrital } from '../interfaces/form-boleta-distrital.interface';
import { BoletaPublica } from '../interfaces/form-boleta-publica.interface';

const base_url = environment.baseUrl;

@Injectable({
  providedIn: 'root'
})
export class BoletaService {

  constructor( private http: HttpClient ) { }

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


  cargarOpcionesBoleta(){
    const url = `${base_url}/opciones-boletas`;
    return this.http.get( url )
      .pipe(
        map( (resp: any) => resp.opciones )
      )
  }

  guardarBoleta( data: BoletaPublica ){
    const url = `${base_url}/boleta`;
    return this.http.post( url, data, this.headers );
  }


}
