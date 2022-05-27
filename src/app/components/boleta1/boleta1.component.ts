import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { OpcionesBoleta } from 'src/app/interfaces/opciones-boleta.interface';
import { environment } from 'src/environments/environment';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-boleta1',
  templateUrl: './boleta1.component.html',
  styles: [
    `
    :host ::ng-deep .layout-main-boleta  {
      padding-top: 10rem;
      /* width: 90%; */
      /* background-color: var(--surface-card); */
    }
    
    :host ::ng-deep .layout-main-boleta .contenedor  {
      width: 90%;
      border-radius: 56px;
      padding: 0.3rem;
      /* background: linear-gradient(180deg, var(--primary-color) 10%, rgba(33, 150, 243, 0) 30%); */
    }

    
    :host ::ng-deep .custom-toast .p-toast-top-right {
      top: 125px;
    }
  `
  ],
  styleUrls: ['boleta1.component.css', '../../shared/checkbox.animated.scss', '../../shared/numero-posicion.scss'],
  providers: [MessageService]
})
export class Boleta1Component implements OnInit {

  titulo_fieldset = environment.textoFieldest;
  texto1 = environment.texto1;
  texto2 = environment.texto2;
  version: string = environment.version;
  nombre_sistema = environment.nombre_sistema;


  loading: boolean = false;


  arrOpcionesSeleccionadas: number[] = [];

  boletaForm: FormGroup = this.fb.group({
    seleccion: new FormArray([], [Validators.required, Validators.minLength(5), Validators.maxLength(5)])
  });

  opcionesBoleta: OpcionesBoleta[] = [
    {
      id_opcion: 1,
      nombre_candidatx: 'Leonardo Daniel Rea Martínez Pérez López',
      ople_completo: 'Instituto Electoral Ciudad de México',
      ople_siglas: 'IECM',
      estado: 1,
      nombre_img: 'avatar1.png'
    },
    {
      id_opcion: 2,
      nombre_candidatx: 'Daniela Del Carmen Rea Martínez',
      ople_completo: 'Instituto Nacional Electoral',
      ople_siglas: 'INE',
      estado: 1,
      nombre_img: 'avatar2.png'
    },
    {
      id_opcion: 3,
      nombre_candidatx: 'Viridiana Carranza Pérez',
      ople_completo: 'Instituto Electoral Ciudad de México',
      ople_siglas: 'IECM',
      estado: 1,
      nombre_img: 'avatar2.png'
    },
    {
      id_opcion: 4,
      nombre_candidatx: 'Daniela Del Carmen Rea Martínez',
      ople_completo: 'Instituto Nacional Electoral',
      ople_siglas: 'INE',
      estado: 1,
      nombre_img: 'avatar2.png'
    },
    {
      id_opcion: 5,
      nombre_candidatx: 'Héctor Miguel Rea Salazar',
      ople_completo: 'Instituto Nacional Electoral',
      ople_siglas: 'INE',
      estado: 1,
      nombre_img: 'avatar1.png'
    },
    {
      id_opcion: 6,
      nombre_candidatx: 'Jonathan Pérez Prado',
      ople_completo: 'Instituto Nacional Electoral',
      ople_siglas: 'INE',
      estado: 1,
      nombre_img: 'avatar1.png'
    },
  ];

  posicionSeleccion = [
    { opcion: 0, posicion: null },
    { opcion: 1, posicion: null },
    { opcion: 2, posicion: null },
    { opcion: 3, posicion: null },
    { opcion: 4, posicion: null },
    { opcion: 5, posicion: null },
    { opcion: 6, posicion: null },
    { opcion: 7, posicion: null },
    { opcion: 8, posicion: null },
    { opcion: 9, posicion: null }
  ];

  constructor(private fb: FormBuilder, private messageService: MessageService, private router: Router) { }

  ngOnInit(): void {
  }

  selectOpcion(event) {

    const formArray: FormArray = this.boletaForm.get('seleccion') as FormArray;

    // Al seleccionar
    if (event.target.checked) {

      if ((formArray.value.length) + 1 > 5) {
        Swal.fire('¡Hey!', 'Solo puedes elegir hasta 3 opciones', 'info');
        event.target.checked = false;
        return false;
      }

      // console.log(formArray.value.includes('0'));
      this.agregarOMoverPosicion('agregar', event.target.value);
      return formArray.push(new FormControl(event.target.value));

    } else {
      // Quitar selección
      // Buscar elemento seleccionado para remover
      let i: number = 0;
      formArray.controls.forEach((ctrl: FormControl) => {
        if (ctrl.value === event.target.value) {
          // Remover elemento seleccionado del arrayForm
          formArray.removeAt(i);

          this.agregarOMoverPosicion('quitar', event.target.value);
          return;
        }
        i++;
      });
    }
  }

  agregarOMoverPosicion(accion: 'agregar' | 'quitar', id_opcion: number) {

    let indice = null;
    if (accion === 'agregar') {

      this.arrOpcionesSeleccionadas.push(Number(id_opcion));

    } else {

      indice = this.arrOpcionesSeleccionadas.findIndex(i => i === Number(id_opcion));
      this.arrOpcionesSeleccionadas.splice(indice, 1);
    }

    // console.log({ id_opcion, indice });

    this.posicionSeleccion.forEach((objeto, j) => {
      if (objeto.posicion) {
        // alert('entra en: ' + j)
        objeto.posicion = null;
      }

    })

    this.showSticky(this.arrOpcionesSeleccionadas.length);

    for (let index = 0; index < this.arrOpcionesSeleccionadas.length; index++) {

      // console.log(this.posicionSeleccion[index+1]);
      this.posicionSeleccion[this.arrOpcionesSeleccionadas[index]].posicion = index + 1;

    }

  }

  emitirVoto() {
    // console.log(this.boletaForm.value);
    this.loading = true;

    const opciones_seleccionadas = this.boletaForm.controls['seleccion'].value;
    // console.log( opciones_seleccionadas.length );
    if (opciones_seleccionadas.length != 5) {
      Swal.fire('¡Hey!', 'Debes elegir 5 opciones', 'warning');
      this.loading = false;
      return;
    }

    /* if(errors > 0){
      Swal.fire({
        title: '¡Ups!',
        icon: 'warning',
        html: `Selecciona los campos requeridos`
      });
      return;
    } */

    if (this.boletaForm.valid) {

      // Desestructuramos
      // const { seleccion } = this.boletaForm.value;
      // const { alcaldiaSel: { id_demarcacion }, seleccion, tengoSel: { value: edad }, soySel: { value: genero }, otro } = this.boletaForm.value;

      // creamos el data conforme lo recibimos en el backend
      /* const data: BoletaPublica = {
        id_demarcacion,
        seleccion,
        genero,
        edad,
        otro
      }; */

      // console.log(data);

      Swal.fire({
        icon: 'success',
        title: '¡GRACIAS POR PARTICIPAR!',
        html: 'Tu opinión se guardó correctamente',
        allowOutsideClick: false
      }).then((result) => {
        if (result.isConfirmed) {
          // this.router.navigateByUrl('boleta1');
          location.reload();
        }
      });


      /*this.boletaService.guardarBoletaPublica(data)
        .subscribe(resp => {
          // console.log(resp);
          Swal.fire(
            '¡GRACIAS POR PARTICIPAR!',
            'Tu opinión se guardó correctamente',
            'success').then((result) => {
              if (result.isConfirmed) {

                this.router.navigateByUrl('/');

              }
            });
          // TODO: Bloquear boton, resetear opciones seleccionadas
          // this.boletaForm.reset();
        }, (err) => {
          console.log(err);
          this.loading = false;
          Swal.fire('Error', err.error.msg, 'error');

        }); */

    }

  }

  showSticky(opciones: number) {

    this.messageService.clear();

    const opciones_por_elegir = 5 - opciones;
    let txt_opc = '';
    let txt_quedan = '';
    (opciones_por_elegir === 1 ? txt_opc = 'opción' : txt_opc = 'opciones');
    (opciones_por_elegir === 1 ? txt_quedan = 'Queda' : txt_quedan = 'Quedan');


    this.messageService.add({ severity: 'info', summary: txt_quedan, detail: `${opciones_por_elegir + ' ' + txt_opc } por elegir`, sticky: true });

    if (opciones_por_elegir === 0) {
      this.messageService.clear();
      this.messageService.add({ severity: 'success', summary: 'Listo', detail: 'Ha seleccionado sus 5 opciones' });
    }

  }

}