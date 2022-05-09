import { Component, OnInit } from '@angular/core';
import { MessageService } from 'primeng/api';
import { FoliosService } from 'src/app/service/folios.service';

interface FolioRepetido {
  folio: string;
  tipo_boleta: 1 | 2;
  recuento: number;
  // id_boleta: number;
}

interface FolioAEliminar {
  id_distrito: number;
  id_boleta: number;
}

@Component({
  selector: 'app-listado-boletas-distritales',
  templateUrl: './listado-boletas-distritales.component.html',
  providers: [MessageService],
  styles: [
    `
    :host ::ng-deep .p-rowgroup-footer td {
        font-weight: 700;
    }

    :host ::ng-deep .p-rowgroup-header {
        span {
            font-weight: 700;
        }

        .p-row-toggler {
            vertical-align: middle;
            margin-right: .25rem;
        }
    }
    `
  ]
})
export class ListadoBoletasDistritalesComponent implements OnInit {

  first = 0;

  rows = 10;

  displayBasic: boolean;
  position: string;
  displayPosition: boolean;
  listadoFoliosYDistritos: FolioAEliminar[] = [];

  folioActive: string = '';
  total_folios_repetidos: number = 0;
  ultimo_folio_repetido: boolean = false;


  boletasRepetidas: FolioRepetido[] = [];

  arrTipoBoleta: string[] = ['', 'Original', 'Fotocopia'];


  constructor(private folioService: FoliosService,
    private messageService: MessageService) { }

  ngOnInit(): void {

    this.obtenerRecuentoFoliosRepetidos();

  }

  showBasicDialog() {
    this.displayBasic = true;
  }

  listarDistritosRelacionados(folio) {
    this.ultimo_folio_repetido = false;
    this.position = 'top';
    this.displayPosition = true;

    // console.log(folio);
    this.obtenerFoliosYDistritos(folio.folio);
    this.folioActive = folio.folio;


  }

  obtenerRecuentoFoliosRepetidos() {

    this.folioService.getRecuentoFoliosRepetidos()
      .subscribe((res: any) => {

        // console.log(res);


        this.boletasRepetidas = res.resultadoFolio;
        this.total_folios_repetidos = this.boletasRepetidas.length;

      })

  }

  obtenerFoliosYDistritos(folio: string) {

    // console.log(folio);


    this.folioService.getFoliosRepetidosToDelete(folio)
      .subscribe((res: FolioAEliminar[]) => {

        // console.log(res);
        this.listadoFoliosYDistritos = res;

      })

  }

  eliminarFolio(folio: FolioAEliminar) {

    // console.log(folio);
    

    const { id_boleta } = folio;

    this.folioService.deleteFolio(id_boleta)
      .subscribe((res: any) => {

        if (res.ok) {

          this.ultimo_folio_repetido = false;

          // Buscar en listadoFoliosYDistritos y en boletasRepetidas para eliminar
          // console.log(this.boletasRepetidas);
          
          const id_boleta_index = this.listadoFoliosYDistritos.findIndex(object => {
            return object.id_boleta === id_boleta;
          });

          this.listadoFoliosYDistritos.splice(id_boleta_index, 1);

          let removerDeListado = '';
          this.boletasRepetidas.find( foliosTabla => {
            if(foliosTabla.folio === this.folioActive){
              foliosTabla.recuento = (foliosTabla.recuento)-1;

              if(foliosTabla.recuento === 1){
                removerDeListado = foliosTabla.folio;
                this.ultimo_folio_repetido = true;
              }
            }
          });

          if(removerDeListado != ''){

            // console.log(this.ultimo_folio_repetido);
            

            // Remover del primer listado
            const folioPrimerListado = this.boletasRepetidas.findIndex(object => {
              return object.folio === removerDeListado;
            });
  
            this.boletasRepetidas.splice(folioPrimerListado, 1);

            // Cerrar modal
            // this.displayPosition = false;

            this.total_folios_repetidos = this.total_folios_repetidos-1;
          }
          
          

          this.addSingle( folio );

        }

      })


  }

  addSingle(data: FolioAEliminar) {
        this.messageService.add({ severity: 'success', /* sticky: true, */ life: 5000, summary: 'Se eliminó la boleta', detail: `Del distrito ${data.id_distrito} con ID Boleta ${data.id_boleta} y folio ${this.folioActive}` });
  }

  next() {
    this.first = this.first + this.rows;
  }

  prev() {
    this.first = this.first - this.rows;
  }

  reset() {
    this.first = 0;
  }

  isLastPage(): boolean {
    return this.boletasRepetidas ? this.first === (this.boletasRepetidas.length - this.rows) : true;
  }

  isFirstPage(): boolean {
    return this.boletasRepetidas ? this.first === 0 : true;
  }

}
