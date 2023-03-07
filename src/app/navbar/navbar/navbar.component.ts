import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/interfaces/User.interface';
import { AuthService } from 'src/app/services/auth.service';
import { CookieService } from 'ngx-cookie-service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html'
})
export class NavbarComponent implements OnInit {


  constructor(private router:Router,private authSvc:AuthService,private cookieSvc:CookieService) {
    this.router.routeReuseStrategy.shouldReuseRoute = () => false;
  }

  thereIsUser:boolean=false;

  ngOnInit(): void {
    if(this.cookieSvc.get('username')){
      this.thereIsUser=true;
    }

  }

  hacerLogout(){
    this.authSvc.logout();
  }

}
