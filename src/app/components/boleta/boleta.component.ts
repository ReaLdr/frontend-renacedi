import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { BoletaPublica } from 'src/app/interfaces/form-boleta-publica.interface';
import { OpcionesBoleta } from 'src/app/interfaces/opciones-boleta.interface';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-boleta',
  templateUrl: './boleta.component.html',
  styles: [
  ],
  styleUrls: ['boleta.component.css', '../../shared/checkbox.animated.scss', '../../shared/numero-posicion.scss']
})
export class BoletaComponent implements OnInit {

  loading: boolean = false;

  boletaForm: FormGroup = this.fb.group({
    // alcaldiaSel: ['', [Validators.required]],
    // soySel: ['', [Validators.required]],
    // tengoSel: ['', [Validators.required]],
    seleccion: new FormArray([], [Validators.required, Validators.minLength(5), Validators.maxLength(5)]),
    // otro: ['', [Validators.maxLength(500)]]
  });

  opcionesBoleta: OpcionesBoleta[] = [
    {
      id_opcion: 1,
      nombre_candidatx: 'Leonardo Daniel Rea Martínez',
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
      nombre_candidatx: 'Daniela Del Carmen Rea Martínez',
      ople_completo: 'Instituto Nacional Electoral',
      ople_siglas: 'INE',
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
      nombre_candidatx: 'Daniela Del Carmen Rea Martínez',
      ople_completo: 'Instituto Nacional Electoral',
      ople_siglas: 'INE',
      estado: 1,
      nombre_img: 'avatar2.png'
    },
    {
      id_opcion: 6,
      nombre_candidatx: 'Daniela Del Carmen Rea Martínez',
      ople_completo: 'Instituto Nacional Electoral',
      ople_siglas: 'INE',
      estado: 1,
      nombre_img: 'avatar2.png'
    },
  ];

  arrOpcionesSeleccionadas: number[] = [];


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

  constructor(private fb:FormBuilder) { }

  ngOnInit(): void {
  }

  selectOpcion(event) {

    // console.log(event.target);


    const formArray: FormArray = this.boletaForm.get('seleccion') as FormArray;

    // console.log(formArray.value.includes('0'));
    // console.log(event.target.value);

    // Al seleccionar
    if (event.target.checked) {

      if (formArray.value.length > 4) {
        Swal.fire('¡Hey!', 'Solo puedes elegir hasta 5 opciones', 'info');
        event.target.checked = false;
        return false;
      }

      /* if (event.target.value == 0 || formArray.value.includes('0')) {

        this.otro = true;

        // this.boletaForm.get('otro').setValidators(Validators.required);
        this.boletaForm.controls['otro'].setValidators(Validators.required);
      } */
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
         /*  if (ctrl.value == 0 && event.target.value == 0) {
            this.boletaForm.get('otro').reset();
            // console.log('Entra a limpiar');

            // this.boletaForm.get('otro').setValidators(Validators.required)
            this.boletaForm.controls['otro'].clearValidators()
            this.boletaForm.controls['otro'].updateValueAndValidity()
            // this.otro = false;
          } */
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
      if(objeto.posicion){
        // alert('entra en: ' + j)
        objeto.posicion = null;
      }
      
    })

    for (let index = 0; index < this.arrOpcionesSeleccionadas.length; index++) {
      
      // console.log(this.posicionSeleccion[index+1]);
      this.posicionSeleccion[this.arrOpcionesSeleccionadas[index]].posicion = index+1;
      
    }
    
  }

  guardarBoleta() {
    // console.log(this.boletaForm.value);
    this.loading = true;

    const opciones_seleccionadas = this.boletaForm.controls['seleccion'].value;
    // console.log( opciones_seleccionadas.length );
    if (opciones_seleccionadas.length < 1 || opciones_seleccionadas.length > 3) {
      Swal.fire('¡Hey!', 'Debes elegir entre 1 y 3 opciones', 'warning');
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
      const { alcaldiaSel: { id_demarcacion }, seleccion, tengoSel: { value: edad }, soySel: { value: genero }, otro } = this.boletaForm.value;

      // creamos el data conforme lo recibimos en el backend
      const data: BoletaPublica = {
        id_demarcacion,
        seleccion,
        genero,
        edad,
        otro
      };

      // console.log(data);

      // return;


      /* this.boletaService.guardarBoletaPublica(data)
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

}
