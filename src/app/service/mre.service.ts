import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { UsuarioService } from './usuario.service';

const base_url = environment.baseUrl;

@Injectable({
  providedIn: 'root'
})
export class MreService {

  constructor(private http: HttpClient,
              private usuarioService: UsuarioService) { }

  getMRE(){
    const id_distrito = 1;
    // const id_distrito = this.usuarioService.idDistrito;
    return this.http.get( `${base_url}/mre/${id_distrito}` );
  }
}
