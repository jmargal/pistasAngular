import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class RolGuard implements CanActivate {
  constructor(private router:Router,private authSvc:AuthService){ }

  /**
   * Devuelve si el usuario es admin, en caso de no serlo, devuelve a la pantalla principal
   * @returns Boolean
   */
  canActivate(): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
      if(!this.authSvc.isAdmin()){
        this.router.navigate(['']);
      }
      return this.authSvc.isAdmin()

  }

}
