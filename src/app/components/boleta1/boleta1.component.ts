import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MenuItem, MessageService } from 'primeng/api';
import { OpcionesBoleta } from 'src/app/interfaces/opciones-boleta.interface';
import { BoletaService } from 'src/app/service/boleta.service';
import { SystemService } from 'src/app/service/system.service';
import { UsuarioService } from 'src/app/service/usuario.service';
import { environment } from 'src/environments/environment';
import Swal from 'sweetalert2';

interface PosicionSeleccion{
  opcion: number;
  posicion: null | number;
}

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

    .hover-card:hover {
      /* transform: scale(1.15); */
      opacity: .95;
      box-shadow: 0 0 10px rgba(0,0,0,0.5);
      z-index: 10;
    }

    .textos {
      /* padding-bottom: 0.5em !important; */
      height: 4.5em;
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

  periodo_operacion: Date = null;
  fecha_inicio: Date = null;
  fecha_termino: any;
  fecha_actual: any;
  estado_sistema: number = 0;

  opcionesBoleta: OpcionesBoleta[] = [];

  posicionSeleccion: PosicionSeleccion[] = [{ opcion: 0, posicion: null }];
  /* posicionSeleccion = [
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
  ]; */

  severity_coundown: string = 'success';

  // countDownDate: any;
  // countDownDate = new Date("may 30, 2022 15:30:00").getTime();
  demo: any;
  // this.fecha_actual: Date;

  // Interval

  countDownDate: any;
  // countDownDate = new Date("may 31, 2022 17:30:00").getTime();//->fecha_termino
  x = setInterval(() => {
    // if (this.estado_sistema === 0) {
    // let now = new Date(this.fecha_actual).getTime();
    // console.log(now);

    let now = new Date().getTime();
    let distance = this.countDownDate - now;
   /*  console.log({now,
      distance}); */
    
    // ORIGINAL
    /* let now = new Date().getTime();
    let distance = this.countDownDate - now; */

    let days = Math.floor(distance / (1000 * 60 * 60 * 24));
    let hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    let minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    let seconds = Math.floor((distance % (1000 * 60)) / 1000);

    let txtHoras = '';
    (hours === 1 ? txtHoras = ' Hora' : txtHoras = ' Horas');
    let txtDias = '';
    (days === 1 ? txtDias = ' Día' : txtDias = ' Días');
    let txtMinutos = '';
    (minutes === 1 ? txtMinutos = ' Minuto' : txtMinutos = ' Minutos');

    if(minutes <= 2){
      this.severity_coundown = 'danger';
    }

    // console.log(distance);
    // this.demo = `${days} ${txtDias} ${hours} ${txtHoras} ${minutes} ${txtMinutos} con ${seconds} Segundos`;
    this.demo = `${(days === 0 ? '' : days + txtDias)} ${(hours === 0 ? '' : hours + txtHoras)} ${minutes} ${txtMinutos} con ${seconds} Segundos`;
    if (isNaN(days) || isNaN(hours) || isNaN(minutes)) {
      this.demo = `Cargando...`;
    }
    // console.log(this.demo);

    if (distance <= 0) {

      clearInterval(this.x);
      this.demo = `Expired`;
      this.usuarioService.logOut();

    }
    // }

  });

  constructor(private fb: FormBuilder,
    private messageService: MessageService,
    private router: Router,
    private boletaService: BoletaService,
    private usuarioService: UsuarioService,
    private systemService: SystemService) { }

  ngOnInit(): void {
    this.obtenerEstado();
    this.obtenerFechasOperacion();
    this.listarOpcionesBoleta();
  }

  obtenerFechasOperacion() {
    this.systemService.cargarConfiguracionActiva()
      .subscribe((res: any) => {

        if (res.ok) {
          
          const { id_configuracion, fecha_inicio, fecha_termino, estado } = res.configuracionActivaDB;
          this.estado_sistema = estado;
          this.fecha_inicio = fecha_inicio;
          this.fecha_termino = new Date(fecha_termino).getTime();
          this.fecha_actual = new Date(res.fecha_hora_server).getTime();
          // console.log({ fecha: res.fecha_hora_server });
          this.countDownDate = new Date(res.fecha_hora_termina).getTime();

        }

      })
  }

  selectOpcion(event) {

    const formArray: FormArray = this.boletaForm.get('seleccion') as FormArray;

    // Al seleccionar
    if (event.target.checked) {

      if ((formArray.value.length) + 1 > 5) {
        Swal.fire('¡Hey!', 'Solo puedes elegir hasta 5 opciones', 'info');
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

    if (this.boletaForm.valid) {

      const data = this.boletaForm.value;

      this.boletaService.guardarBoleta(data)
        .subscribe(resp => {

          // console.log(resp);
          Swal.fire({
            icon: 'success',
            title: '¡GRACIAS POR PARTICIPAR!',
            html: 'Tu opinión se guardó correctamente',
            allowOutsideClick: false
          }).then((result) => {
            if (result.isConfirmed) {
              // this.router.navigateByUrl('boleta1');
              this.cerrarSesion();
            }
          });

        }, (err) => {
          console.log(err);
          this.loading = false;
          Swal.fire('Error', err.error.msg, 'error');

        });

    }

  }

  obtenerEstado() {
    const estado = this.usuarioService.estado;

    if (estado === 2) this.cerrarSesion();

  }

  listarOpcionesBoleta() {

    this.boletaService.cargarOpcionesBoleta()
      .subscribe(opcionesBoleta => {

        // const showOpc = opcionesBoleta.sort( function(){ return Math.random() - 0.5 } );
        // console.log({showOpc});

        // this.opcionesBoleta = showOpc;
        this.opcionesBoleta = opcionesBoleta;

        this.opcionesBoleta.forEach( elemento => {
          this.posicionSeleccion.push( { opcion: elemento.id_opcion, posicion: null } )
          // console.log(this.posicionSeleccion);
        })

        
        /* for (let iteracion = 0; iteracion < opcionesBoleta.length; iteracion++) {
          // const element = array[iteracion];
          this.posicionSeleccion.push( { opcion: opcionesBoleta[iteracion] } );
          
          
        } */
        // opcionesBoleta.length
        

      })

  }

  showSticky(opciones: number) {

    this.messageService.clear();

    const opciones_por_elegir = 5 - opciones;
    let txt_opc = '';
    let txt_quedan = '';
    (opciones_por_elegir === 1 ? txt_opc = 'opción' : txt_opc = 'opciones');
    (opciones_por_elegir === 1 ? txt_quedan = 'Queda' : txt_quedan = 'Quedan');


    this.messageService.add({ severity: 'info', summary: txt_quedan, detail: `${opciones_por_elegir + ' ' + txt_opc} por elegir`, sticky: true });

    if (opciones_por_elegir === 0) {
      this.messageService.clear();
      this.messageService.add({ severity: 'success', summary: 'Listo', detail: 'Ha seleccionado sus 5 opciones' });
    }

  }

  cerrarSesion() {
    this.usuarioService.logOut();
  }

}
