import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { UsuarioService } from './usuario.service';

@Injectable()
export class MenuService {

    constructor( private usuarioService: UsuarioService ){}

    public menu: any[] = [];

    private menuSource = new Subject<string>();
    private resetSource = new Subject();

    menuSource$ = this.menuSource.asObservable();
    resetSource$ = this.resetSource.asObservable();

    onMenuStateChange(key: string) {
        this.menuSource.next(key);
    }

    reset() {
       this.resetSource.next(true);
    }

    cargarMenu(){
        // console.log(localStorage.getItem('menu'));
        this.menu = JSON.parse(localStorage.getItem('menu')) || [];
        this.menu.push({ label: 'Cerrar sesión', icon: 'pi pi-fw pi-sign-out', command: () => { this.logout() } });
    }

    logout(){
        this.usuarioService.logOut();
    }
}
