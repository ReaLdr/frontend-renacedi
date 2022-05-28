import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { delay, map } from 'rxjs';
import { environment } from 'src/environments/environment';

const base_url = environment.baseUrl;

interface RespuestaGraficaBarra {
  resultado: { resultado }
}

interface RespuestaDataCardsActas {
  data_cards_actas: {
    avance: number;
    capturadas: number;
    por_capturar: number;
    total: number;
  }
}


interface RespuestaDataCardsBoletas {
  data_cards_boletas: {
    distrital_original: number;
    distrital_copia: number;
    electronicas: number;
    total: number;
  }
}

interface RespuestaDataTablaAvanceCaptura {
  data_cards_tabla: {
    distrito: string;
    capturadas: number;
    por_capturar: number;
    total: number;
  }
}

@Injectable({
  providedIn: 'root'
})
export class EstadisticaService {

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

  obtenerOpcionesMasSeleccionadas(){

    const url = `${base_url}/estadisticas/graficas`;
    return this.http.get( url, this.headers )
      .pipe(
        // delay(500),
        map( (resp: RespuestaGraficaBarra) => {
          // const [ res ] = resp;
          // return res;
          resp = resp.resultado;
          
          // const labels = ['a'];
          // const values = [1];
          const labels = Object.keys(resp);
          const values = Object.values(resp);
          return { labels, values };
        })
      )
  }

  obtenerDatosGraficaRadar(){
    const url = `${base_url}/estadisticas/radar`;
    return this.http.get(url, this.headers)
      .pipe(
        // delay(2000),
        map( (radar: any) => {
          // console.log(radar.resultado);
          // return radar = radar.resultado;
          const opciones = [];
          const series_grupo1 = [];
          const series_grupo2 = [];
          const series_grupo3 = [];
          const grupos = ['6 a 9 años', '10 a 13 años', '14 a 17 años'];
          const valores = Object.values(radar.resultado);
          valores.forEach((propiedad: any) => {
            // console.log(propiedad);
            opciones.push(propiedad.descripcion)
            series_grupo1.push(propiedad.grupo1);
            series_grupo2.push(propiedad.grupo2);
            series_grupo3.push(propiedad.grupo3);
          });
          // const {  } = radar
          // console.log(radar);
          
          // console.log(opciones);
          

          return { opciones, grupos, series_grupo1, series_grupo2, series_grupo3 };
        })
      )
  }
  
  obtenerDatosCardsVotos(){
    const url = `${base_url}/estadisticas/datos-cards-votos`;
    return this.http.get(url, this.headers)
      .pipe(
        map(( resp: any ) => {
          console.log(resp);
          
          return resp.countVotos;
        })
      )
  }
  
  
  obtenerDatosCardsBoletas(){
    const url = `${base_url}/estadisticas/datos-cards-avance`;
    return this.http.get(url, this.headers)
      .pipe(
        map(( resp: any ) => {
          console.log(resp);
          
          return resp.porcentaje_avance;
        })
      )
  }

  obtenerDatosTablaAvanceCaptura(){
    const url = `${base_url}/estadisticas/datos-tabla-avance-captura`;
    return this.http.get(url, this.headers);
  }




}
