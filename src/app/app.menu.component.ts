import { Component, OnInit } from '@angular/core';
import { AppMainComponent } from './app.main.component';
import { Usuario } from './models/usuario.model';
import { MenuService } from './service/app.menu.service';
import { UsuarioService } from './service/usuario.service';

@Component({
    selector: 'app-menu',
    template: `
        <div class="layout-menu-container">
            <ul class="layout-menu" role="menu" (keydown)="onKeydown($event)">
                <li app-menu class="layout-menuitem-category" *ngFor="let item of model; let i = index;" [item]="item" [index]="i" [root]="true" role="none">
                    <div class="layout-menuitem-root-text" [attr.aria-label]="item.label">{{item.label}}</div>
                    <ul role="menu">
                        <li app-menuitem *ngFor="let child of this.menuService.menu" [item]="child" [index]="i" role="none"></li>
                    </ul>
                </li>
            </ul>
        </div>
    `
})
export class AppMenuComponent implements OnInit {

    public usuario: Usuario;

    model: any[];

    constructor(public appMain: AppMainComponent,
        private usuarioService: UsuarioService,
        public menuService: MenuService
        ) {
            this.usuario = usuarioService.usuario;
            // console.log(this.usuario);
            
        }

    ngOnInit() {
        this.model = [
            {
                label: `Inicio - ${this.usuario.nombre_usuario}`,
                // items:[  ]
            }
        ];
    }

    onKeydown(event: KeyboardEvent) {
        const nodeElement = (<HTMLDivElement> event.target);
        if (event.code === 'Enter' || event.code === 'Space') {
            nodeElement.click();
            event.preventDefault();
        }
    }
}
