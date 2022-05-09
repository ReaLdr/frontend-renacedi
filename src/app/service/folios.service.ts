import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs';
import { environment } from 'src/environments/environment';

const base_url = environment.baseUrl;

@Injectable({
  providedIn: 'root'
})
export class FoliosService {

  constructor(private http: HttpClient) { }

  get token(): string {
    return localStorage.getItem('token') || '';
  }

  get headers() {
    return {
      headers: {
        'x-token': this.token
      }
    }
  }

  getRecuentoFoliosRepetidos() {

    const url = `${base_url}/folio/recuento`;
    return this.http.get(url, this.headers)
      .pipe(
        map((resp: any) => {
          const { resultadoFolio, total } = resp;

          return { resultadoFolio, total };
          // return resp.data_cards_actas;
        })
      )

  }

  getFoliosRepetidosToDelete(folio: string) {

    const url = `${base_url}/folio/listar-folios-repetidos/${folio}`;
    return this.http.get(url, this.headers)
      .pipe(
        map((resp: any) => {
          const { foliosDB } = resp;

          return foliosDB;
          // return resp.data_cards_actas;
        })
      )
  }

  deleteFolio( id_boleta: number ) {

    const url = `${base_url}/folio/eliminar-folio/${id_boleta}`;
    return this.http.put( url, {}, this.headers);

  }

}
