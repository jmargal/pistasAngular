import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserService } from '../../services/user.service';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { CookieService } from 'ngx-cookie-service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  constructor(private formbuilder: FormBuilder,private userSvc:UserService,private router:Router,private authSvc:AuthService,
     private cookieSvc: CookieService) { }

  //Formulario para el registro
  myForm: FormGroup = this.formbuilder.group({
    name: ['', [Validators.required, Validators.minLength(3)]],
    cName: ['', [Validators.required,Validators.minLength(8)]],
    email: ['', [Validators.required, Validators.email]],
    //La contraseña debe de tener al menos 8 caracteres (mayuscula,minuscula y un numero)
    password: ['', [Validators.required,Validators.pattern(/^(?=\w*\d)(?=\w*[A-Z])(?=\w*[a-z])\S{8,16}$/)]],
    repeatPassword: ['', [Validators.required]],
  });

  ngOnInit(): void {
  }

  isValidName() {
    return (
      this.myForm?.controls['name'].errors &&
      this.myForm?.controls['name'].touched
    );
  }

  isValidEmail() {
    return (
      this.myForm?.controls['email'].touched &&
      this.myForm?.controls['email'].errors
    );
  }

  isValidCname() {
    return (
      this.myForm?.controls['cName'].errors &&
      this.myForm?.controls['cName'].touched
    );
  }

  isSecurePassword() {
    return (
      this.myForm?.controls['password'].errors &&
      this.myForm?.controls['password'].touched
    );
  }

  isTheSamePassword(){
    return this.myForm.controls['repeatPassword'].touched && this.myForm.controls['repeatPassword'].value!==this.myForm.controls['password'].value
   }

  //Si todas las comprobaciones son correctas envia el usuario
  add(){
    let nick=this.myForm.controls['name'].value;
    let completeName=this.myForm.controls['cName'].value;
    let email=this.myForm.controls['email'].value;
    let password=this.myForm.controls['password'].value;
    //Si se crea le hace login con el nuevo usuario y reenvía a la pantalla de centers
    this.userSvc.addUser(nick,completeName,email,password).subscribe({
      next:(resp)=>{
        this.router.navigate(['/centers']);
        this.authSvc.hacerLogin(nick,password).subscribe({
          next: (resp)=>{
            this.cookieSvc.set('username', nick);

          },
          error:(err)=>{
            console.log(err);
          }
        })
      },
      error:(err)=>{
        console.log(err);
        Swal.fire({
          icon: 'error',
          title: 'Ooops...',
          text: 'User name already in use',
        })
      }
    })
  }

}
