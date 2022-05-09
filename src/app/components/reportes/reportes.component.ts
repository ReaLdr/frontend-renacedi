import { Component, OnInit } from '@angular/core';
import { ReportesService } from 'src/app/service/reportes.service';
import { UsuarioService } from 'src/app/service/usuario.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-reportes',
  templateUrl: './reportes.component.html',
  styles: [
    `
    .cursor:hover {
      cursor: pointer;
      background-color: #953d3d00;
    }
    `
  ]
})
export class ReportesComponent implements OnInit {

  distritos: {}[] = [];
  tipo_reporte: number;
  perfil: number;
  id_distrito: number;

  constructor( private reportesService: ReportesService,
               private usuarioService: UsuarioService ) { }
  ngOnInit(): void {
    this.cargaDistritos();
    this.perfil = this.usuarioService.perfil;
    this.id_distrito = this.usuarioService.idDistrito;
  }

  rptCapturaActas(){
    

    window.open( `${environment.baseRpt}rpt_captura_actas.php?perfil=${this.perfil}&id_distrito=${this.id_distrito}`, '_parent', 'download');

  }
  
  rptSistematizacionActas(event){

    
    if(!event.value){
      return;
    }
    
    const { id_distrito } = event.value;
    window.open( `${environment.baseRpt}rpt_sistematizacion.php?perfil=${this.perfil}&id_distrito=${id_distrito}`, '_parent', 'download');
    
    

    // alert('Descargamos rptSistematizacionActas');
    /* this.reportesService.rptSistematizacionBoletas(id_distrito)
      .subscribe( (reporte: any) => {
        console.log('Reporte descargado!');
        console.log(reporte);
        // window.open(reporte.reporte, '_blank')
        window.open('http://'+reporte.reporte, '_parent', 'download');
        
      }, (err) => {
        console.log(err);
        
      }) */

  }

  rptDistritalSistematizacionActas(){
    window.open( `${environment.baseRpt}rpt_sistematizacion.php?perfil=${this.perfil}&id_distrito=${this.id_distrito}`, '_parent', 'download');
  }

  cargaDistritos(){
    this.distritos.unshift({label: 'Boletas electrónicas', id_distrito: 0});
    for (let index = 1; index <= 33; index++) {
      this.distritos.push({label: `Distrito ${index}`, id_distrito: index })
    }
    console.log(this.distritos);
    
  }

}
