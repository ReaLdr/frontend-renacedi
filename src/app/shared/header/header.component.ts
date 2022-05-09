import { Component, OnInit } from '@angular/core';
import { AppMainComponent } from 'src/app/app.main.component';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styles: [
  ]
})
export class HeaderComponent {

  constructor(public appMain: AppMainComponent) { }

}
