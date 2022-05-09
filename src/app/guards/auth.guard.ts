import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, CanLoad, Route, Router, RouterStateSnapshot, UrlSegment, UrlTree } from '@angular/router';
import { Observable, tap } from 'rxjs';
import { UsuarioService } from '../service/usuario.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate, CanLoad {

  constructor( private usuarioService: UsuarioService,
      private router: Router ){}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot) {

      // return true;

    return this.usuarioService.validarToken()
      .pipe(tap(estaAutenticado => {
        // Efecto secundario
        if (!estaAutenticado) {
          this.router.navigateByUrl('/login');
        }
      }))

  }
  canLoad(route: Route, segments: UrlSegment[]): boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> {
    return this.usuarioService.validarToken()
      .pipe(tap(estaAutenticado => {
        // Efecto secundario
        if (!estaAutenticado) {
          this.router.navigateByUrl('/login');
        }
      }))

      // return true;
  }
}
