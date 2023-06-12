import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  @ViewChild('loginForm') loginForm!: NgForm;

  logged: boolean = false;

  constructor(
    private authSvc: AuthService,
    private router: Router,
    private cookieSvc: CookieService
  ) {}

  ngOnInit(): void {}

  /**
   *Coge los campos del formulario y llama al método del service, si es correcto
   *muestra un alert de success y reenvía a centers en 1,5 segundos
   *Si no muestra un alert de error
   */
  login() {
    let name = this.loginForm?.controls['uname'].value;
    let password = this.loginForm?.controls['password'].value;
    this.authSvc.hacerLogin(name, password).subscribe((resp) => {
      if (resp != false) {
        this.logged = true;
        this.cookieSvc.set('username', name);
        let timerInterval: NodeJS.Timer;
        Swal.fire({
          icon: 'success',
          title: 'Success',
          timer: 1500,
          text: 'You have registered successfully',
          didOpen: () => {
            Swal.showLoading();
            timerInterval = setInterval(() => {}, 100);
          },
          willClose: () => {
            clearInterval(timerInterval);
          },
        }).then((result) => {
          this.router.navigate(['/centers']);
        });
      } else {
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: 'User or password incorrect',
        });
      }
    });
  }
}
