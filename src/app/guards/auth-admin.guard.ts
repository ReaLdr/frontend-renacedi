import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, CanLoad, Route, Router, RouterStateSnapshot, UrlSegment, UrlTree } from '@angular/router';
import { Observable, tap } from 'rxjs';
import { AdminService } from '../service/admin.service';

@Injectable({
  providedIn: 'root'
})
export class AuthAdminGuard implements CanActivate, CanLoad {

  constructor( private adminService: AdminService,
    private router: Router ) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot) {
    return this.adminService.validarTokenAdmin()
      .pipe( tap( adminAutenticado => {
        // Efecto secundario
        if(!adminAutenticado){
          this.router.navigateByUrl('/login-admin');
        }
      }));
  }
  canLoad(
    route: Route,
    segments: UrlSegment[]): boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> {
    
      return this.adminService.validarTokenAdmin()
      .pipe( tap( adminAutenticado => {
        // Efecto secundario
        if(!adminAutenticado){
          this.router.navigateByUrl('/login-admin');
        }
      }));
      
  }
}
