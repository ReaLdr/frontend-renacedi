import { Component, OnInit } from '@angular/core';
import { SystemService } from 'src/app/service/system.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-bienvenidx',
  templateUrl: './bienvenidx.component.html',
  styleUrls: ['bienvenidx.components.scss'],
  styles: [
    `
    .principal {
      overflow: hidden;
    }
    `
  ]
})
export class BienvenidxComponent implements OnInit {

  version: string = environment.version;

  divs: string[] = [];

  estado_sistema = Number(localStorage.getItem('sys')) || 0;


  countDownDate: any;
  // countDownDate = new Date("april 21, 2022 09:00:00").getTime();

  demo: any;
  now: Date;

  x = setInterval(() =>{
    if(this.estado_sistema === 0){
      let now = new Date().getTime();
      let distance = this.countDownDate - now;
      let days = Math.floor(distance/(1000*60*60*24));
      let hours = Math.floor((distance % (1000*60*60*24)) / (1000*60*60));
      let minutes = Math.floor((distance % (1000*60*60)) / (1000*60));
      let seconds = Math.floor( (distance % (1000*60)) / 1000 );

      let txtHoras = '';
      ( hours === 1 ? txtHoras = 'Hora' : txtHoras = 'Horas');
      let txtDias = '';
      ( days === 1 ? txtDias = 'Día' : txtDias = 'Días');
      let txtMinutos = '';
      ( minutes === 1 ? txtMinutos = 'Minuto' : txtMinutos = 'Minutos');

      // console.log(distance);
      this.demo = `${days} ${txtDias} ${hours} ${txtHoras} ${minutes} ${txtMinutos} con ${seconds} Segundos`;
      if(isNaN(days) || isNaN(hours) || isNaN(minutes) ){
        this.demo = `Cargando...`;
      }
      // console.log(this.demo);
      
      
      if( distance <= 0 ){
        clearInterval(this.x);
        this.demo = `Expired`;
        this.estado_sistema = 1;
        localStorage.setItem('sys', '1');
        
        this.systemService.getEstadoSystem()
          .subscribe( res => {
            // console.log('Ejecutado!');
            
          });
        
      }
    }
    
  });

  
  constructor( private systemService: SystemService) { }
  
  ngOnInit(): void {
    this.estadoSistema();
    this.creaDivs();
  }
  
  creaDivs(){
    for (let index = 0; index < 30; index++) {
      
      this.divs.push('particle');
      
    }
  }

  estadoSistema(){
    this.systemService.getEstadoSystem()
      .subscribe( (res) => {
        // console.log(res);
        this.estado_sistema = res.estado;
        this.countDownDate = res.fecha_apertura;
        this.now = res.fecha_actual;
        localStorage.setItem('sys', res.estado.toString());
      })
  }
}
