import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { SystemService } from 'src/app/service/system.service';
import { environment } from 'src/environments/environment';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-carga-catalogos',
  templateUrl: './carga-catalogos.component.html',
  styles: [
  ]
})
export class CargaCatalogosComponent implements OnInit {

  fileVotantes: File;
  fileCandidatos: File;

  imagenSubir: File;
  loading: boolean = false;

  version: string = environment.version;
  // uploadedFiles: any[] = [];
  uploadedFileVotantes: any[] = [];
  uploadedFileCandidatos: any[] = [];

  catVotantesForm: FormGroup = this.fb.group({
    archivoVotantes: ['', [Validators.required]]
  });
  
  catCandidatosForm: FormGroup = this.fb.group({
    archivoCandidatos: ['', [Validators.required]]
  });

  constructor( private fb: FormBuilder,
               private systemService: SystemService ) { }

  ngOnInit(): void {
  }

  guardarCandidatos(){
    this.loading = true;
    
    if(this.catCandidatosForm.valid){
      console.log('pasa');
      
      const { archivoCandidatos } = this.catCandidatosForm.value;

      const data = { archivoCandidatos };

      this.systemService.subirCatalogoCandidatos( data )
        .subscribe((resp: any) => {

          // console.log(resp);
          Swal.fire({
            icon: 'success',
            title: resp.msg,
            html: `Se agregaron ${resp.candidatos_cargados} candidatos`,
            allowOutsideClick: false
          }).then((result) => {
            if (result.isConfirmed) {
              // this.router.navigateByUrl('boleta1');
              this.catCandidatosForm.reset();
              this.loading = false;
            }
          });

        }, (err) => {
          console.log(err);
          this.loading = false;
          Swal.fire('Error', err.error.msg, 'error');

        })
    }

  }
  
  guardarVotantes(){
    this.loading = true;
    console.log('pasa1');
    console.log(this.catVotantesForm.valid);
    
    if(this.catVotantesForm.valid){
      console.log('pasa');
      
      const { archivoVotantes } = this.catVotantesForm.value;

      const data = { archivoVotantes };

      this.systemService.subirCatalogoVotantes( data )
        .subscribe((resp: any) => {

          // console.log(resp);
          Swal.fire({
            icon: 'success',
            title: resp.msg,
            html: `Se agregaron ${resp.votantes_cargados} votantes`,
            allowOutsideClick: false
          }).then((result) => {
            if (result.isConfirmed) {
              // this.router.navigateByUrl('boleta1');
              this.catVotantesForm.reset();
              this.loading = false;
            }
          });

        }, (err) => {
          console.log(err);
          this.loading = false;
          Swal.fire('Error', err.error.msg, 'error');

        })
    }

  }

  dealWithFileVotantes(event) {

    this.imagenSubir = event.currentFiles[0];

    this.catVotantesForm.patchValue({
      archivoVotantes: this.imagenSubir
    });

    /* this.fileVotantes = event.currentFiles[0];

    this.catVotantesForm.patchValue({
      archivoVotantes: this.fileVotantes
    }); */

  }
  
  
  dealWithFileCandidatos(event) {

    this.fileCandidatos = event.currentFiles[0];

    console.log(this.fileCandidatos);
    

    this.catCandidatosForm.patchValue({
      archivoCandidatos: this.fileCandidatos
    });

  }

  removio(formulario: FormGroup){
    formulario.reset();
  }

}
