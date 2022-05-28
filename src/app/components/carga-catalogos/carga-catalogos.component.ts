import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-carga-catalogos',
  templateUrl: './carga-catalogos.component.html',
  styles: [
  ]
})
export class CargaCatalogosComponent implements OnInit {

  fileVotantes: File;
  fileCandidatos: File;
  loading: boolean = false;

  version: string = environment.version;
  uploadedFiles: any[] = [];

  catVotantesForm: FormGroup = this.fb.group({
    archivo: ['', [Validators.required]]
  });
  
  catCandidatosForm: FormGroup = this.fb.group({
    archivo: ['', [Validators.required]]
  });

  constructor( private fb: FormBuilder ) { }

  ngOnInit(): void {
  }

  guardarUsuarios(){
    alert('Submit usuarios!')
  }
  
  guardarCandidatos(){
    alert('Submit candidatos!')
  }

  dealWithFileVotantes(event) {

    this.fileVotantes = event.currentFiles[0];

    this.catVotantesForm.patchValue({
      archivo: this.fileVotantes
    });

  }
  
  
  dealWithFilesCandidatos(event) {

    this.fileVotantes = event.currentFiles[0];

    this.catVotantesForm.patchValue({
      archivo: this.fileVotantes
    });

  }

}
