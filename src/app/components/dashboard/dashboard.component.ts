import { Component, OnInit, ViewChild } from '@angular/core';
import { Subscription } from 'rxjs';
import { ConfigService } from '../../service/app.config.service';
import { AppConfig } from '../../api/appconfig';
import { EstadisticaService } from 'src/app/service/estadistica.service';
import { UsuarioService } from 'src/app/service/usuario.service';
import { Customer } from 'src/app/api/customer';
import { ConfirmationService, ConfirmEventType, MessageService } from 'primeng/api';

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
    ],
    providers: [ConfirmationService,MessageService]
})
export class DashboardComponent implements OnInit {

    perfil: number;
    // id_distrito: number;

    subscription: Subscription;

    config: AppConfig;

    customers: Customer[] = [
        {
            name: 'Daniel',
            company: 'IECM'
        }
    ];

    cargando: boolean = true;

    // Cards de actas
    avance_votacion: number = 0;
    capturadas: number = 0;
    por_capturar: number = 0;
    total_votos: number = 0;

    // Cards de boletas
    expresiones_internet: number = 0;
    sistematizacion_orinal: number = 0;
    sistematizacion_copia: number = 0;
    total_boletas: number = 0;
    total_sistematizacion: number = 0;

    position: string;

    // Tabla de avance en captura
    data_tabla_avance_captura_distrital: AvanceCapturaDistrital[] = [];

    

    constructor(public configService: ConfigService,
                private estadisticaService: EstadisticaService,
                private usuarioService: UsuarioService,
                private confirmationService: ConfirmationService,
                private messageService: MessageService) { }

    ngOnInit() {

        // this.perfil = this.usuarioService.perfil;
        // this.id_distrito = this.usuarioService.idDistrito;

        this.config = this.configService.config;
        this.subscription = this.configService.configUpdate$.subscribe(config => {
            this.config = config;
        });

        this.dataCardsVotos();
        this.dataCardsAvance();
        /* if(this.id_distrito === 0){
            this.dataTablaAvanceCapturaDistrital();
        } */

    }

    public dataCardsVotos(){
        this.estadisticaService.obtenerDatosCardsVotos()
            .subscribe( (resp) => {

                console.log(resp);
                
                
                this.total_votos    = resp;
                
            })
    }
    
    public dataCardsAvance(){
        this.estadisticaService.obtenerDatosCardsBoletas()
            .subscribe( ( porcentaje_avance ) => {
                // console.log({distrital_original, distrital_copia, electronicas, total});
                
                this.avance_votacion = porcentaje_avance;
                
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

    confirmReinicio(position: string) {
        this.position = position;

        this.confirmationService.confirm({
            message: '¿Estás seguro de reiniciar la votación?',
            header: 'Reiniciar votación',
            icon: 'pi pi-info-circle',
            acceptLabel: 'Si, reiniciar',
            accept: () => {
                this.messageService.add({severity:'info', summary:'Confirmado', detail:'La votación se ha reiniciado'});
            },
            reject: (type) => {
                switch(type) {
                    case ConfirmEventType.REJECT:
                        this.messageService.add({severity:'error', summary:'Rechazado', detail:'Rechazaste el reinicio de la votación'});
                    break;
                    case ConfirmEventType.CANCEL:
                        this.messageService.add({severity:'warn', summary:'Cancelado', detail:'Has cancelado el reinicio de la votación'});
                    break;
                }
            },
            key: "positionDialog"
        });
    }

    reporte(){
        alert("Descarga de reporte")
    }
}
