import { Component, OnInit } from '@angular/core';
import { AppMainComponent } from 'src/app/app.main.component';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styles: [
  ]
})
export class HeaderComponent {

  public nombre_sistema = environment.nombre_sistema;

  constructor(public appMain: AppMainComponent) { }

}
