import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, CanLoad, Route, Router, RouterStateSnapshot, UrlSegment, UrlTree } from '@angular/router';
import { UsuarioService } from '../service/usuario.service';

@Injectable({
  providedIn: 'root'
})
export class CentralGuard implements CanActivate, CanLoad {

   constructor( private usuarioService: UsuarioService, private router: Router ){}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): boolean {
      
      
      if (this.usuarioService.perfil === 2){
        return true;
      } else{
        this.router.navigateByUrl('/');
        return false;
      }
      
  }
  canLoad(
    route: Route,
    segments: UrlSegment[]): boolean {
      if (this.usuarioService.perfil === 2){
        return true;
      } else{
        this.router.navigateByUrl('/');
        return false;
      }
  }
}
