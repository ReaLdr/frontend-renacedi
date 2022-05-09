import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, CanLoad, Route, Router, RouterStateSnapshot, UrlSegment, UrlTree } from '@angular/router';
import { SystemService } from '../service/system.service';

@Injectable({
  providedIn: 'root'
})
export class SystemGuard implements CanActivate, CanLoad {

  constructor(private systemService: SystemService, private router: Router){}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): boolean {

      // console.log(this.systemService.estadoSistema);
      
      if (this.systemService.estadoSistema === 1){
        return true;
      } else{
        this.router.navigateByUrl('/');
        return false;
      }
        

      
    // return true;
  }
  canLoad(
    route: Route,
    segments: UrlSegment[]): boolean {
    return true;
  }
}
