import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html'
})
export class NavbarComponent implements OnInit {

  constructor(private authSvc:AuthService) { }

  ngOnInit(): void {
  }

  hacerLogout(){
    this.authSvc.logout();
  }

}
