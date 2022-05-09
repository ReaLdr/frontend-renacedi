import { Component, OnInit, ViewChild } from '@angular/core';
import { Subscription } from 'rxjs';
import { ConfigService } from '../../service/app.config.service';
import { AppConfig } from '../../api/appconfig';
import { EstadisticaService } from 'src/app/service/estadistica.service';
import { UsuarioService } from 'src/app/service/usuario.service';

interface AvanceCapturaDistrital {
    distrito: string;
    capturadas: number;
    por_capturar: number;
    total: number;
    porcentaje_avance: number;
}

@Component({
    templateUrl: './dashboard.component.html',
    styles: [
        `
        .fila-captura-distrito:hover{
            background-color: #f9731617;
        }
        `
    ]
})
export class DashboardComponent implements OnInit {

    perfil: number;
    id_distrito: number;

    subscription: Subscription;

    config: AppConfig;

    cargando: boolean = true;

    // Cards de actas
    avance_captura: number = 0;
    capturadas: number = 0;
    por_capturar: number = 0;
    total_actas: number = 0;

    // Cards de boletas
    expresiones_internet: number = 0;
    sistematizacion_orinal: number = 0;
    sistematizacion_copia: number = 0;
    total_boletas: number = 0;
    total_sistematizacion: number = 0;

    // Tabla de avance en captura
    data_tabla_avance_captura_distrital: AvanceCapturaDistrital[] = [];

    

    constructor(public configService: ConfigService,
                private estadisticaService: EstadisticaService,
                private usuarioService: UsuarioService) { }

    ngOnInit() {

        this.perfil = this.usuarioService.perfil;
        this.id_distrito = this.usuarioService.idDistrito;

        this.config = this.configService.config;
        this.subscription = this.configService.configUpdate$.subscribe(config => {
            this.config = config;
        });

        this.dataCardsActas();
        this.dataCardsBoletas();
        if(this.id_distrito === 0){
            this.dataTablaAvanceCapturaDistrital();
        }

    }

    public dataCardsActas(){
        this.estadisticaService.obtenerDatosCardsActas()
            .subscribe( ({avance, capturadas, por_capturar, total}) => {
                
                this.avance_captura = avance;
                this.capturadas     = capturadas;
                this.por_capturar   = por_capturar;
                this.total_actas    = total;
                
            })
    }
    
    public dataCardsBoletas(){
        this.estadisticaService.obtenerDatosCardsBoletas()
            .subscribe( ({distrital_original, distrital_copia, electronicas, total}) => {
                // console.log({distrital_original, distrital_copia, electronicas, total});
                (!distrital_original) ? this.sistematizacion_orinal = 0 : this.sistematizacion_orinal = distrital_original;
                (!distrital_copia) ? this.sistematizacion_copia = 0 : this.sistematizacion_copia = distrital_copia;
                (!electronicas) ? this.expresiones_internet = 0 : this.expresiones_internet = electronicas;
                
                this.total_boletas = total;
                this.total_sistematizacion = distrital_original+distrital_copia;
                
            })
    }

    public dataTablaAvanceCapturaDistrital(){
        this.estadisticaService.obtenerDatosTablaAvanceCaptura()
            .subscribe( (resp: any) => {
                // console.log(this.data_tabla_avance_captura_distrital);
                // console.log(resp.data_tabla_avance_captura);
                let avance = 0;
                resp.data_tabla_avance_captura.forEach(element => {
                    avance = Number(((element.capturadas*100)/element.total).toFixed(2));
                    element.porcentaje_avance = avance;
                    // console.log(element);
                    this.data_tabla_avance_captura_distrital.push(element);
                });
                
                // console.log(this.data_tabla_avance_captura_distrital);
                
                
            })
    }
}
