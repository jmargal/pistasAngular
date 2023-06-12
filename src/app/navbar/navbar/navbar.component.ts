import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { CookieService } from 'ngx-cookie-service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {


  constructor(private router:Router,private authSvc:AuthService) {
    this.router.routeReuseStrategy.shouldReuseRoute = () => false;
  }

  isLoggedIn$!: boolean;
  isMenuOpen = false;


  /**
   * Llama al Svc para comprobar si hay user autenticado para saber que mostrar en el navbar
   */
  ngOnInit(): void {
    this.authSvc.isLoggedIn.subscribe({
      next:(resp)=>{
        this.isLoggedIn$=resp;
      }
    })
  }

  /**
   * Devuelve si el user registrado es admin para saber qué mostrar en la barra de navegación
   * @returns Booelan
   */
  isAdmin(){
    return this.authSvc.isAdmin();
  }

  /**
   * Llama al logout del service que borra todas las cookies y manda a la pantalla de login
   */
  hacerLogout(){
    this.authSvc.logout();
  }

  /**
   * Cambia la propiedad para saber si el navbar tiene que mostrarse entero o ser un dropdown
   */
  toggleMenu(): void {
    this.isMenuOpen = !this.isMenuOpen;
  }
}
