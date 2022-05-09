import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs';
import { environment } from 'src/environments/environment';

const base_url = environment.baseUrl;

interface EstadoSistema {
  sistemaDB : {
    id_etapa: number;
    estado: 0 | 1 | 2;
  },
  fechas: {
    fecha_actual: Date;
    fecha_apertura: Date;
  }
}



@Injectable({
  providedIn: 'root'
})
export class SystemService {

  public stateSystem: 0 | 1 | 2;

  constructor( private http : HttpClient ) { }

  get estadoSistema(): 0 | 1 | 2 {
    // console.log(this.usuario);
    
    // return 1;
    return this.stateSystem;
  }


  getEstadoSystem(){
    // return this.http.get(`${base_url}/system/`);
    const url = `${base_url}/system/`;
    return this.http.get(url)
      .pipe(
        map(( resp: EstadoSistema ) => {
          // console.log(resp);
          const  { id_etapa, estado } = resp.sistemaDB;
          const  { fecha_actual, fecha_apertura } = resp.fechas;
          this.stateSystem = estado;
          return {estado, fecha_actual, fecha_apertura};
        })
      )
  }

}
