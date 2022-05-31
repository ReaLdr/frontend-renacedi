import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs';
import { environment } from 'src/environments/environment';
import { ConfiguracionForm } from '../interfaces/configuracion-form';
import { HistorialConfiguraciones } from '../interfaces/historial-configuraciones';

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

interface RespListadoConfiguraciones {
  ok: boolean;
  configuracionSistemaDB: HistorialConfiguraciones;
}



@Injectable({
  providedIn: 'root'
})
export class SystemService {

  public stateSystem: 0 | 1 | 2;

  constructor( private http : HttpClient ) { }

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

  reiniciarVotacion(){
    console.log('Hace peticion');
    
    // POST
    const url = `${base_url}/system/reiniciar-votacion`;
    return this.http.post(url, {},this.headers)
      .pipe(
        map((resp: any) => {
          console.log(resp);
          

          return resp;
          // return resp.data_cards_actas;
        })
      )
    // TODO: Después de reiniciar votación, deberan configurar las horas deoperación del sistema
  }

  registrarConfiguracionSistema(data: ConfiguracionForm){
    const url = `${base_url}/system/regitrar-configuracion`;
    return this.http.post( url, data, this.headers );
  }

  obtenerConfiguraciones(){
    const url = `${base_url}/system/listado-configuraciones`;
    return this.http.get(url, this.headers)
      .pipe(
        map(( resp: any ) => {
          // console.log(resp.configuracionSistemaDB);
          /* const  { id_etapa, estado } = resp.sistemaDB;
          const  { fecha_actual, fecha_apertura } = resp.fechas;
          this.stateSystem = estado; */
          // return {estado, fecha_actual, fecha_apertura};
          const { configuracionSistemaDB } = resp;
          return configuracionSistemaDB;
        })
      )
  }

  cargarConfiguracionActiva(){
    const url = `${base_url}/system/configuracion-activa`;
    return this.http.get(url, this.headers)
      /* .pipe(
        map(( resp: any ) => {
          // console.log(resp.configuracionSistemaDB);
          // const  { id_etapa, estado } = resp.configuracionActivaDB;
          // const  { fecha_actual, fecha_apertura } = resp.fechas;
          // this.stateSystem = estado;
          const { configuracionActivaDB } = resp;
          return configuracionActivaDB[0];
        })
      ) */
  }

  subirCatalogoCandidatos(data){

    const { archivoCandidatos } = data;
    

    const formData = new FormData();

    formData.append('file', archivoCandidatos);

    const url = `${base_url}/system/subir-catalogo-candidatos`;
    return this.http.post( url, formData, this.headers )

  }

  subirCatalogoVotantes(data){

    const { archivoVotantes } = data;
    

    const formData = new FormData();

    formData.append('file', archivoVotantes);

    const url = `${base_url}/system/subir-catalogo-votantes`;
    return this.http.post( url, formData, this.headers )
      /* .pipe(
        map( (resp: any) => {
          const { candidatos_cargados, msg } = resp;
          return { candidatos_cargados, msg };
        })
      ) */

  }

}
