import { Component, OnInit } from '@angular/core';
import { CorreoService } from 'src/app/service/correo.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-envia-correos',
  templateUrl: './envia-correos.component.html',
  styles: [
  ]
})
export class EnviaCorreosComponent implements OnInit {

  loading: boolean = false;

  constructor(private correoService: CorreoService) { }

  ngOnInit(): void {
  }

  enviarCorreos() {
    this.loading = true;

    this.correoService.ejecutarEnvioCorreos()
      .subscribe((resp: any) => {

        if (resp.ok) {
          Swal.fire({
            icon: 'success',
            title: 'Listo',
            html: resp.msg,
            allowOutsideClick: false
          }).then((result) => {
            if (result.isConfirmed) {
              this.loading = false;
            }
          });
        }

      })

  }

}
