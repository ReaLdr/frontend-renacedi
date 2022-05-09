import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { delay } from 'rxjs';
import { MesaReceptora } from 'src/app/interfaces/mesa-receptora.interface';
import { ActaService } from 'src/app/service/acta.service';
import { MreService } from 'src/app/service/mre.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-captura-actas',
  templateUrl: './captura-actas.component.html',
  styles: [
    `
    :host ::ng-deep .capturaTabla input {
      width: 100px;
    }

    /* :host ::ng-deep .form-control-inputnumber {
      background:red;
      width: 100%;
    } */
    `
  ]
})
export class CapturaActasComponent implements OnInit {

  // actaForm: FormGroup = this.fb.
  fecha_default: Date = new Date("May 1 2022");

  actaForm: FormGroup = this.fb.group({
    mre: ['MRE 01-01', [Validators.required]],
    fecha_instalacion: [this.fecha_default, [Validators.required]],
    hora_instalacion: ['', [Validators.required]],
    fecha_apertura: [this.fecha_default, [Validators.required]],
    hora_apertura: ['', [Validators.required]],
    incidentes: [, [Validators.required, Validators.maxLength(1000)]],
    bol_extraidas: [, [Validators.required, Validators.maxLength(5)]],
    con_opinion: [, [Validators.required, Validators.maxLength(5)]],
    sin_opinion: [, [Validators.required, Validators.maxLength(5)]],
    edad1_mujer: [, [Validators.required, Validators.maxLength(5)]],
    edad1_hombre: [, [Validators.required, Validators.maxLength(5)]],
    edad1_noidentifica: [, [Validators.required, Validators.maxLength(5)]],
    edad1_nodecirlo: [, [Validators.required, Validators.maxLength(5)]],
    edad2_mujer: [, [Validators.required, Validators.maxLength(5)]],
    edad2_hombre: [, [Validators.required, Validators.maxLength(5)]],
    edad2_noidentifica: [, [Validators.required, Validators.maxLength(5)]],
    edad2_nodecirlo: [, [Validators.required, Validators.maxLength(5)]],
    edad3_mujer: [, [Validators.required, Validators.maxLength(5)]],
    edad3_hombre: [, [Validators.required, Validators.maxLength(5)]],
    edad3_noidentifica: [, [Validators.required, Validators.maxLength(5)]],
    edad3_nodecirlo: [, [Validators.required, Validators.maxLength(5)]],
    hora_cierre: ['', [Validators.required]],
    hora_conclusion: ['', [Validators.required]]
  });

  max_length: number = 5;

  caution1: boolean = false;
  caution2: boolean = false;

  datePipeString: string;

  mre: MesaReceptora[] = [];

  loading: boolean = false;
  hora1: boolean = false;
  hora2: boolean = false;
  hora3: boolean = false;
  hora4: boolean = false;

  horasPermitidasInstalacion: string[] = ['07', '08', '09', '10', '11', '12'];
  horasPermitidasApertura: string[] = ['09', '10', '11', '12'];
  horasPermitidasCierre: string[] = ['17', '18'];
  horasPermitidasClausura: string[] = ['17', '18', '19', '20', '21'];

  itsEdit: boolean = false;
  barra_progreso: boolean = true;

  constructor(private fb: FormBuilder,
    private mreService: MreService,
    private actaService: ActaService,
    private router: Router,
    private activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {
    
    this.activatedRoute.params.subscribe( ({id_mesa}) => {

      
      if(id_mesa){
        
        this.cargarActa(id_mesa);
      } else{
        this.barra_progreso = false;
      }

        this.cargarMRE();
      

      // console.log(id_mesa);
      
    })
  }

  cargarMRE() {
    this.mreService.getMRE()
      .subscribe((res: any) => {
        console.log(res.mreDB);

        this.mre = res.mreDB;

      })
  }

  cargarActa(id_mesa: number){

    if(!id_mesa){
      return;
    }

    this.actaService.obteneractaPorId(id_mesa)
    .pipe(
      delay(100)
    )
    .subscribe( acta => {

      console.log(acta);
      const {
        bol_extraidas,//
        // capturada,
        // clave_ut,
        con_opinion,//
        // demarcacion_territorial,
        edad1_hombre,//
        edad1_mujer,//
        edad1_nodecirlo,//
        edad1_noidentifica,//
        edad2_hombre,//
        edad2_mujer,//
        edad2_nodecirlo,//
        edad2_noidentifica,//
        edad3_hombre,//
        edad3_mujer,//
        edad3_nodecirlo,//
        edad3_noidentifica,//
        // fecha_alta,
        fecha_apertura,//
        fecha_instalacion,//
        hora_apertura,//
        hora_cierre,//
        hora_conclusion,//
        hora_instalacion,//
        // id_demarcacion,
        // id_distrito,
        // id_mesa,
        // id_usuario,
        incidentes,//
        mre: mreDB,//
        // nombre_ut,
        sin_opinion,//
       } = acta;

       if(acta){
         this.barra_progreso = false;
       }

      // console.log(con_opinion);
      

      this.actaForm.setValue(
        {
          con_opinion,
          bol_extraidas,
          edad1_hombre,
          edad1_mujer,
          edad1_nodecirlo,
          edad1_noidentifica,
          edad2_hombre,
          edad2_mujer,
          edad2_nodecirlo,
          edad2_noidentifica,
          edad3_hombre,
          edad3_mujer,
          edad3_nodecirlo,
          edad3_noidentifica,
          fecha_apertura:  new Date(fecha_apertura),
          fecha_instalacion: new Date(fecha_instalacion),
          hora_apertura,
          hora_cierre,
          hora_conclusion,
          hora_instalacion,
          incidentes,
          mre: mreDB,
          sin_opinion
        }
      )
      let recurrenceDefault = this.mre.find(x => Number(x.id_mesa) === Number(id_mesa) );
      this.actaForm.get("mre").patchValue(recurrenceDefault);
      this.itsEdit = true;

      /* this.actaForm.get('mre').setValue(this.mre.find(mre => {
        console.log(mre);
        
        mre.id_mesa === 4
      })); */
      // this.myFormGroup.get("selectedCity").setValue(this.cities.find(city => city.name === "Istanbul"));
      
      
      /* const {nombre, hospital:{_id} } = medico;
      
      this.medicoSeleccionado = medico;
      this.medicoForm.setValue( { nombre, hospital: _id } ); */
      
    }, error=> {
      this.router.navigateByUrl(`/main/captura-actas`)
    });

  }

  campoEsValido ( campo: string ) {
    return this.actaForm.controls[campo].errors
          && this.actaForm.controls[campo].touched;
  }

  revisarCaptura1(){

    const bol_extraidas = this.actaForm.controls['bol_extraidas'];
    const con_opinion   = this.actaForm.controls['con_opinion'];
    const sin_opinion   = this.actaForm.controls['sin_opinion'];

    const total = con_opinion.value + sin_opinion.value;

    return this.caution1 = (total != bol_extraidas.value
            && bol_extraidas.touched
            && con_opinion.touched
            && sin_opinion.touched);

  }

  revisarCaptura2(){
    const edad1_mujer = this.actaForm.controls['edad1_mujer'];
    const edad1_hombre = this.actaForm.controls['edad1_hombre'];
    const edad1_noidentifica = this.actaForm.controls['edad1_noidentifica'];
    const edad1_nodecirlo = this.actaForm.controls['edad1_nodecirlo'];
    const edad2_mujer = this.actaForm.controls['edad2_mujer'];
    const edad2_hombre = this.actaForm.controls['edad2_hombre'];
    const edad2_noidentifica = this.actaForm.controls['edad2_noidentifica'];
    const edad2_nodecirlo = this.actaForm.controls['edad2_nodecirlo'];
    const edad3_mujer = this.actaForm.controls['edad3_mujer'];
    const edad3_hombre = this.actaForm.controls['edad3_hombre'];
    const edad3_noidentifica = this.actaForm.controls['edad3_noidentifica'];
    const edad3_nodecirlo = this.actaForm.controls['edad3_nodecirlo'];

    const con_opinion = this.actaForm.controls['con_opinion'];

    const total = edad1_mujer.value+
                  edad1_hombre.value+
                  edad1_noidentifica.value+
                  edad1_nodecirlo.value+
                  edad2_mujer.value+
                  edad2_hombre.value+
                  edad2_noidentifica.value+
                  edad2_nodecirlo.value+
                  edad3_mujer.value+
                  edad3_hombre.value+
                  edad3_noidentifica.value+
                  edad3_nodecirlo.value;
    return this.caution2 = (
            total != con_opinion.value &&
            edad1_mujer.touched &&
            edad1_hombre.touched &&
            edad1_noidentifica.touched &&
            edad1_nodecirlo.touched &&
            edad2_mujer.touched &&
            edad2_hombre.touched &&
            edad2_noidentifica.touched &&
            edad2_nodecirlo.touched &&
            edad3_mujer.touched &&
            edad3_hombre.touched &&
            edad3_noidentifica.touched &&
            edad3_nodecirlo.touched
      );
  }

  guardarActa() {


    this.actaForm.markAllAsTouched();

    this.loading = true;

    if(this.actaForm.valid){
    // console.log(this.actaForm.value);

    const { mre, ...data } = this.actaForm.value;
    
    data.mre = mre.mre;

    const { hora_instalacion, hora_apertura, hora_cierre, hora_conclusion } = data;

    const hora_ins_split = this.validaHora(hora_instalacion, 'instalacion');
    const hora_aper_split = this.validaHora(hora_apertura, 'apertura');
    const hora_cie_split = this.validaHora(hora_cierre, 'cierre');
    const hora_con_split = this.validaHora(hora_conclusion, 'conclusion');

    if( !hora_ins_split || !hora_aper_split || !hora_cie_split || !hora_con_split){
      Swal.fire('Ups', 'Revisa el apartado de Instalación y apertura o Cierre y clausura', 'warning');
      this.loading = false;
      return;
    }

    if(this.caution1 || this.caution2){
      data.inconsistencia = 1;
    } else{
      data.inconsistencia = 0;
    }
    
    if(this.itsEdit){
      data.fecha_editado = new Date().toLocaleString();
    }
    

    // const data: Acta = { rest }

    this.actaService.guardarActa(mre.id_mesa, data)
      .subscribe(res => {
        console.log(res);
        // TODO: Resetear formulario, validar maxlength en campos de smallint
        Swal.fire({
          title: 'Excelente',
          html: 'La información se guardó correctamente',
          icon: 'success',
          allowOutsideClick: false
        }).then((result) => {
          if (result.isConfirmed) {

            (this.itsEdit ? window.history.go(-1) : window.location.reload() );
          }
        });

      }, (err) => {
        this.loading = false;
        console.log(err);
        Swal.fire('Error', err.error.msg, 'error');
      });

    }

    
    
  }
  
  validaHora( hora: string, tipo: 'instalacion' | 'apertura' | 'cierre' | 'conclusion' ){

    console.log({hora, tipo});
    

    const splitHora = hora.split(':');
    console.log({splitHora});
    let response;
    
    if (tipo === 'instalacion'){
      response = this.horasPermitidasInstalacion.includes(splitHora[0]);
      if(splitHora[0] == this.horasPermitidasInstalacion[5] && splitHora[1] != '00'){
        response = false;
      }
      this.hora1 = !response;
      console.log(this.hora1);
      
    }
    
    if (tipo === 'apertura'){
      response = this.horasPermitidasApertura.includes(splitHora[0]);
      if(splitHora[0] == this.horasPermitidasApertura[3] && splitHora[1] != '00'){
        response = false;
      }
      this.hora2 = !response;
    }
    
    if (tipo === 'cierre'){
      response = this.horasPermitidasCierre.includes(splitHora[0]);
      if(splitHora[0] == this.horasPermitidasCierre[1] && splitHora[1] != '00'){
        response = false;
      }
      this.hora3 = !response;
    }
    
    if (tipo === 'conclusion'){
      response = this.horasPermitidasClausura.includes(splitHora[0]);
      if(splitHora[0] == this.horasPermitidasClausura[4] && splitHora[1] != '00'){
        response = false;
      }
      this.hora4 = !response;
    }

    // console.log(this.horasPermitidasInstalacion.includes(splitHora[0]));
    return response;

    



  }


  captura(mre){
    console.log(mre);

    if(mre.value.capturada === 1){
      console.log(mre.value.id_mesa);
      
      this.router.navigateByUrl(`/main/editar-captura-acta/${mre.value.id_mesa}`);
    }
    

  }

}
