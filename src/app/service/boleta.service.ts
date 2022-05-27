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
  
  cargarAlcaldias(){
    const url = `${base_url}/alcaldias`;
    return this.http.get( url )
      .pipe(
        map( (resp: any) => resp.alcaldias)
      )
  }

  guardarBoleta( data: BoletaPublica ){
    const url = `${base_url}/boleta`;
    return this.http.post( url, data, this.headers );
  }
  
  guardarBoletaDistrital( data: BoletaDistrital ){

    const { archivo, edad, folio, genero, otro, seleccion, tipo_boleta, observacion, /* id_mesa, id_distrito,*/ nombre_demarcacion, clave_ut, nombre_ut, /* seccion, */ mesa, id_demarcacion } = data;
    
    const formData = new FormData();
    formData.append('archivo', archivo);
    formData.append('edad', `${edad}`);
    formData.append('folio', folio);
    formData.append('genero', `${genero}`);
    formData.append('otro', otro);
    formData.append('seleccion', JSON.stringify(seleccion));
    formData.append('tipo_boleta', tipo_boleta);
    formData.append('observacion', observacion);
    // New
    // formData.append('id_mesa', `${id_mesa}`);
    // formData.append('id_distrito', `${id_distrito}`); // Se trae en la request
    formData.append('nombre_demarcacion', nombre_demarcacion);
    formData.append('clave_ut', clave_ut);
    formData.append('nombre_ut', nombre_ut);
    // formData.append('seccion', `${seccion}`);
    formData.append('mesa', mesa);
    formData.append('id_demarcacion', `${id_demarcacion}`);
    // Nuevos datos del catálogo de Ale


    // console.log(formData);
    

    
    const url = `${base_url}/boleta/distrital`;
    return this.http.post( url, formData, this.headers );
  }


}
