import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

const base_url = environment.baseUrl;

@Injectable({
  providedIn: 'root'
})
export class ReportesService {

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

  rptTotalVotacion(){
    const url = `${base_url}/reportes/rpt-total-votos`;
    return this.http.get( url, this.headers );
  }




}
