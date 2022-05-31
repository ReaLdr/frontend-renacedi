import { Component, OnInit } from '@angular/core';
import { CorreoService } from 'src/app/service/correo.service';

@Component({
  selector: 'app-envia-correos',
  templateUrl: './envia-correos.component.html',
  styles: [
  ]
})
export class EnviaCorreosComponent implements OnInit {

  loading: boolean = false;

  constructor( private correoService: CorreoService ) { }

  ngOnInit(): void {
  }

  enviarCorreos(){
    this.loading = true;
    
    this.correoService.ejecutarEnvioCorreos()
      .subscribe( res => {
        console.log(res);
        
      })
    
  }

}
