import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Customer } from 'src/app/api/customer';
import { HistorialConfiguraciones } from 'src/app/interfaces/historial-configuraciones';
import { SystemService } from 'src/app/service/system.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-configuracion',
  templateUrl: './configuracion.component.html',
  styles: [
    `
    :host ::ng-deep .row-inactive {
      background-color: rgba(255,106,106,.15) !important;
    }
    :host ::ng-deep .row-active {
      background-color: rgba(102,173,73,.15) !important;
    }
    `
  ]
})
export class ConfiguracionComponent implements OnInit {

  configuracionForm: FormGroup = this.fb.group({
    fecha_inicio: ['', [Validators.required]],
    fecha_termino: ['', [Validators.required]]
  });

  loading: boolean = false;

  customers: [{}] = [
    {
      id: 1,
      fecha_inicio: '05/24/2022 17:23:15',
      fecha_final: '05/24/2022 19:23:15'
    }
  ];

  historialConfiguraciones: HistorialConfiguraciones[] = [];

  constructor(private fb: FormBuilder,
    private systemService: SystemService,
    private router: Router) { }

  ngOnInit(): void {
    this.cargarHistorial();
  }

  guardarConfiguracion() {
    this.loading = true;

    if (this.configuracionForm.valid) {
      this.systemService.registrarConfiguracionSistema(this.configuracionForm.value)
        .subscribe(resp => {

          Swal.fire(
            '¡Bien!',
            'La configuración se guardó correctamente',
            'success').then((result) => {
              if (result.isConfirmed) {

                // this.router.navigateByUrl('/');
                location.reload();

              }
            });

        }, (err) => {
          console.log(err);
          this.loading = false;
          Swal.fire('Error', err.error.msg, 'error');
        })
    }
  }

  cargarHistorial() {
    this.systemService.cargarConfiguraciones()
      .subscribe((res: HistorialConfiguraciones[]) => {

        // this.historialConfiguraciones.push(res);
        // console.log(this.historialConfiguraciones);
        console.log(res);

        this.historialConfiguraciones = res;


      })
  }

}
