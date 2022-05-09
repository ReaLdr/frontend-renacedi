import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Acta } from '../interfaces/form-acta.interface';

const base_url = environment.baseUrl;

@Injectable({
  providedIn: 'root'
})
export class ActaService {

  
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


  guardarActa( id_mesa: number, data: Acta ){

    const url = `${base_url}/acta/${id_mesa}`;
    

    return this.http.put( url, data, this.headers);
    
  }
  
  obteneractaPorId(id_mesa: number){
    
    const url = `${base_url}/acta/${id_mesa}`;
    return this.http.get( url, this.headers)
    .pipe(
      map( (resp: any) => resp.mesaDB )
    );

  }

}
