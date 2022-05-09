import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { OpcionesBoleta } from 'src/app/interfaces/opciones-boleta.interface';
import { BoletaService } from 'src/app/service/boleta.service';
import { environment } from 'src/environments/environment';
import Swal from 'sweetalert2';

import { BoletaDistrital } from 'src/app/interfaces/form-boleta-distrital.interface';
import { MesaReceptora } from 'src/app/interfaces/mesa-receptora.interface';
import { MreService } from 'src/app/service/mre.service';

@Component({
  selector: 'app-boleta-distrital',
  templateUrl: './boleta-distrital.component.html',
  styleUrls: ['./boleta-distrital.component.css', 'boleta-distrital-opciones.component.css', '../../shared/checkbox.animated.scss', '../../shared/numero-posicion.scss']
})
export class BoletaDistritalComponent implements OnInit {

  imagenSubir: File;
  loading: boolean = false;

  version: string = environment.version;

  boletaDistritalForm: FormGroup = this.fb.group({
    tipo_boleta: ['', [Validators.required]],
    folio: ['', [Validators.required]],
    mre: ['', [Validators.required]],
    soySel: ['', [Validators.required]],
    tengoSel: ['', [Validators.required]],
    seleccion: new FormArray([], [Validators.required, Validators.minLength(1), Validators.maxLength(3)]),
    otro: ['', [Validators.maxLength(500)]],
    observacion: ['', [Validators.maxLength(500)]],
    archivo: ['', [Validators.required]]
  });

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

  // mre = [{ mesa: 'Seleccione...', value: '0' }, { mesa: '10-102', value: '10-102' }];
  mre: MesaReceptora[] = [];

  soy = [
    { genero: 'Mujer', value: 1 },
    { genero: 'Hombre ', value: 2 },
    { genero: 'No me identifico con alguna de las opciones anteriores ', value: 3 },
    { genero: 'Prefiero no decirlo', value: 4 }
  ];

  edad = [];

  uploadedFiles: any[] = [];

  tipoFolio: string = '';
  ingresarFolio: boolean = false;

  constructor(private fb: FormBuilder,
    private boletaService: BoletaService,
    private cd: ChangeDetectorRef,
    private mreService: MreService) { }

  ngOnInit(): void {
    this.cargarMRE();
    this.cargarEdades();
    this.cargarOpcionesBoleta();
  }

  selectOpcion(event) {

    const formArray: FormArray = this.boletaDistritalForm.get('seleccion') as FormArray;

    console.log(formArray.value.includes('0'));
    console.log(event.target.value);

    // Al seleccionar
    if (event.target.checked) {

      if (formArray.value.length > 2) {
        Swal.fire('¡Hey!', 'Solo puedes elegir hasta 3 opciones', 'info');
        event.target.checked = false;
        return false;
      }

      if (event.target.value == 0 || formArray.value.includes('0')) {
        this.otro = true;
        // this.boletaDistritalForm.get('otro').setValidators(Validators.required);
        this.boletaDistritalForm.controls['otro'].setValidators(Validators.required);
      }

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

            this.boletaDistritalForm.get('otro').reset();
            console.log('Entra a limpiar');

            // this.boletaDistritalForm.get('otro').setValidators(Validators.required)
            this.boletaDistritalForm.controls['otro'].clearValidators()
            this.boletaDistritalForm.controls['otro'].updateValueAndValidity()
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

  cargarMRE(){
    this.mreService.getMRE()
      .subscribe( (res: any) =>{
        console.log(res.mreDB);
        
        this.mre = res.mreDB;
        
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


  cargarOpcionesBoleta() {
    this.boletaService.cargarOpcionesBoleta()
      .subscribe(opcionesBoleta => {
        this.opcionesBoleta = opcionesBoleta;

      })
  }

  tipoBoleta(event) {

    // console.log(event);
    (Number(event.target.value) === 1) ? this.tipoFolio = 'A-999999' : this.tipoFolio = 'F-999999';
    this.ingresarFolio = true;

  }

  dealWithFiles(event) {

    this.imagenSubir = event.currentFiles[0];

    this.boletaDistritalForm.patchValue({
      archivo: this.imagenSubir
    });

  }


  guardarBoletaDistrital() {

    // console.log(this.boletaDistritalForm.value);
    this.loading = true;

    const opciones_seleccionadas = this.boletaDistritalForm.controls['seleccion'].value;
    // console.log( opciones_seleccionadas.length );
    if (opciones_seleccionadas.length < 1 || opciones_seleccionadas.length > 3) {
      Swal.fire('¡Hey!', 'Debes elegir entre 1 y 3 opciones', 'warning');
      this.loading = false;
      return;
    }

    // TODO: Validar campos en front

    if (this.boletaDistritalForm.valid){

      // Desestructuramos
      const dataMRE = this.boletaDistritalForm.value.mre;
      console.log(dataMRE);
      
      const { id_mesa, id_distrito, demarcacion_territorial, clave_ut, nombre_ut, seccion, mre: mesa, id_demarcacion } = dataMRE;
      const { folio, tipo_boleta, seleccion, tengoSel: { value: edad }, soySel: { value: genero }, otro, archivo, observacion } = this.boletaDistritalForm.value;

      // creamos el data conforme lo recibimos en el backend
      const data: BoletaDistrital = {
        tipo_boleta,//
        folio,//
        genero,//
        edad,//
        seleccion,//
        otro,//
        archivo,//
        observacion,//
        // id_mesa,
        // id_distrito,//Lo traigo en la request
        nombre_demarcacion: demarcacion_territorial,
        clave_ut,
        nombre_ut,
        // seccion, 
        mesa,
        id_demarcacion
      };

      // console.log(data);
      // return;
      
      
      this.boletaService.guardarBoletaDistrital(data)
        .subscribe((resp: any) => {
          console.log(resp);          
          if (resp.ok) {
            let txt_existe = '';
            Swal.fire({
              title: 'Excelente',
              html: 'La opinión se guardó correctamente',
              icon: 'success',
              allowOutsideClick: false
            }).then((result) => {

              if (result.isConfirmed) {

                if(resp.existe > 1){

                  Swal.fire({
                    title: 'Cuidado',
                    html: 'Este folio de boleta ya ha sido capturado, favor de verificar',
                    icon: 'info',
                    allowOutsideClick: false
                  }).then((result) => {
                    if (result.isConfirmed) {
    
                      window.location.reload();
                    }
                  });

                } else{
                  window.location.reload();
                }
                
              }
            });
          }
          
        }, (err) => {
          this.loading = false;
          Swal.fire('Error', err.error.msg, 'error');
          console.log(err);

        });


    }


  }


}
