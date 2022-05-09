import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { BoletaPublica } from 'src/app/interfaces/form-boleta-publica.interface';


import { OpcionesBoleta } from 'src/app/interfaces/opciones-boleta.interface';
import { BoletaService } from 'src/app/service/boleta.service';
import { environment } from 'src/environments/environment';
import Swal from 'sweetalert2';

interface opcionesSel {
  nombre_demarcacion: string;
  id_demarcacion: number;
}

@Component({
  selector: 'app-boleta-publica',
  templateUrl: './boleta-publica.component.html',
  styles: [`
    
    :host ::ng-deep .layout-main-boleta  {
      padding-top: 10rem;
      /* width: 90%; */
      background-color: var(--surface-card);
    }
    
    :host ::ng-deep .layout-main-boleta .contenedor  {
      width: 90%;
      border-radius: 56px;
      padding: 0.3rem;
      /* background: linear-gradient(180deg, var(--primary-color) 10%, rgba(33, 150, 243, 0) 30%); */
    }
  `],
  styleUrls: ['boleta-publica.component.css', '../../shared/checkbox.animated.scss', '../../shared/numero-posicion.scss']
})
// background: radial-gradient(circle, rgba(63,94,251,1) 0%, rgba(252,70,107,1) 100%);
export class BoletaPublicaComponent implements OnInit {

  version: string = environment.version;
  loading: boolean = false;

  boletaForm: FormGroup = this.fb.group({
    alcaldiaSel: ['', [Validators.required]],
    soySel: ['', [Validators.required]],
    tengoSel: ['', [Validators.required]],
    seleccion: new FormArray([], [Validators.required, Validators.minLength(1), Validators.maxLength(3)]),
    otro: ['', [Validators.maxLength(500)]]
  });

  demarcacion_territorial: opcionesSel[] = [];

  soy = [
    { genero: 'Mujer', value: 1 },
    { genero: 'Hombre ', value: 2 },
    { genero: 'No me identifico con alguna de las opciones anteriores ', value: 3 },
    { genero: 'Prefiero no decirlo', value: 4 }
  ];

  edad = [];

  opcionesBoleta: OpcionesBoleta[] = [];

  otro: boolean = false;

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

  constructor(private boletaService: BoletaService,
    private fb: FormBuilder,
    private router: Router) { }

  ngOnInit(): void {

    this.cargarEdades();

    this.cargarAlcaldias();

    this.cargarOpcionesBoleta();

    // TODO: Validar que al entrar esté habilitado el sistema
  }

  selectOpcion(event) {

    // console.log(event.target);


    const formArray: FormArray = this.boletaForm.get('seleccion') as FormArray;

    // console.log(formArray.value.includes('0'));
    // console.log(event.target.value);

    // Al seleccionar
    if (event.target.checked) {

      if (formArray.value.length > 2) {
        Swal.fire('¡Hey!', 'Solo puedes elegir hasta 3 opciones', 'info');
        event.target.checked = false;
        return false;
      }

      if (event.target.value == 0 || formArray.value.includes('0')) {

        this.otro = true;

        // this.boletaForm.get('otro').setValidators(Validators.required);
        this.boletaForm.controls['otro'].setValidators(Validators.required);
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
          if (ctrl.value == 0 && event.target.value == 0) {
            this.boletaForm.get('otro').reset();
            // console.log('Entra a limpiar');

            // this.boletaForm.get('otro').setValidators(Validators.required)
            this.boletaForm.controls['otro'].clearValidators()
            this.boletaForm.controls['otro'].updateValueAndValidity()
            this.otro = false;
          }
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

  cargarOpcionesBoleta() {
    this.boletaService.cargarOpcionesBoleta()
      .subscribe(opcionesBoleta => {
        this.opcionesBoleta = opcionesBoleta;

      })
  }

  cargarAlcaldias() {
    this.boletaService.cargarAlcaldias()
      .subscribe(alcaldias => {

        this.demarcacion_territorial = alcaldias;
        // console.log(alcaldias);

      })
  }

  cargarEdades() {
    let opciones = [];
    for (let index = 6; index <= 17; index++) {

      opciones.push({ edad: `${index} años`, value: index });


    }
    // opciones.unshift({ edad: 'Selecciona...', value: 0 });
    this.edad = opciones;
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


      this.boletaService.guardarBoletaPublica(data)
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

        });

    }

  }


}
