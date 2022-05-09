import { Pipe, PipeTransform } from '@angular/core';
import { environment } from 'src/environments/environment';
const base_url = environment.baseUrl;

@Pipe({
  name: 'imagen'
})
export class ImagenPipe implements PipeTransform {

  transform(img: string, tipo: 'opcionBoleta' | 'evidenciaBoleta'): unknown {

    if(!img){
      return `${base_url}/upload/no-image.png`;
    } else if(img){
      return `${base_url}/upload/mostrar-imagen/opciones-boleta/${img}`;
    } else{
      return `${base_url}/upload/no-image.png`;
    }
  }

}
