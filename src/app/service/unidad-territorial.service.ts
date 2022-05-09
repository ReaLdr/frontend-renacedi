import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UnidadTerritorialService {

  private base_url = environment.baseUrl;

  private id_distrito: number = 1;

  constructor( private http: HttpClient ) { }


  obtenerUTs(){
    return this.http.get( `${this.base_url}/ut/${this.id_distrito}` );
  }

}
