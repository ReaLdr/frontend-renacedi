import { Component } from '@angular/core';
import { AppMainComponent } from 'src/app/app.main.component';
import { environment } from 'src/environments/environment';


@Component({
    selector: 'app-footer',
    templateUrl: './app.footer.component.html'
})
export class AppFooterComponent{
    version: string = environment.version;
    constructor(public appMain: AppMainComponent) {}
}
