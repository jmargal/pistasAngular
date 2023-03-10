import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { User } from '../interfaces/User.interface';
import { AuthService } from '../services/auth.service';
import { UserService } from '../services/user.service';
import { CookieService } from 'ngx-cookie-service';

@Injectable({
  providedIn: 'root'
})
export class RolGuard implements CanActivate {
  constructor(private authSvc:AuthService,private userSvc:UserService,private cookieSvc:CookieService){ }

  //Devuelve true si el usuario registrado es un admin
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    return this.cookieSvc.get('role')==='ADMIN';

  }

}
