import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/interfaces/User.interface';
import { AuthService } from 'src/app/services/auth.service';
import { CookieService } from 'ngx-cookie-service';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html'
})
export class NavbarComponent implements OnInit {


  constructor(private router:Router,private authSvc:AuthService,private cookieSvc:CookieService) {
    this.router.routeReuseStrategy.shouldReuseRoute = () => false;
  }

  isLoggedIn$!: boolean;


  ngOnInit(): void {
    //Llama al Svc para comprobar si hay user autenticado para saber que mostrar en el navbar
    this.authSvc.isLoggedIn.subscribe({
      next:(resp)=>{
        this.isLoggedIn$=resp;
      }
    })
  }

  //Llama al logout del service
  hacerLogout(){
    this.authSvc.logout();
  }
}
