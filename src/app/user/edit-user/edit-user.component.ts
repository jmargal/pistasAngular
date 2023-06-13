import { Component, OnInit, ViewChild } from '@angular/core';
import { UserService } from 'src/app/services/user.service';
import { User } from '../../interfaces/User.interface';
import { CookieService } from 'ngx-cookie-service';
import { NgForm } from '@angular/forms';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-edit-user',
  templateUrl: './edit-user.component.html',
  styleUrls: ['./edit-user.component.css']
})
export class EditUserComponent implements OnInit {

  constructor(private userSvc:UserService,private cookieSvc:CookieService) { }

  @ViewChild('myForm') myForm!:NgForm;

  //Objeto para mostrar los datos iniciales
  initForm={
    uname:"",
    role:"",
    cName:"",
    email:""
  }
  editUser!:User;

  /**
   * Carga el usuario que está registrado y sus datos en el objeto del formulario
   */
  ngOnInit(): void {
    //Se recupera el usuario que esta logueado
    this.userSvc.getUser(this.cookieSvc.get("username")).subscribe({
      next:(resp)=>{
        this.editUser=resp;
        //El objeto con los datos iniciales se iguala a los datos del usuario recibido
        this.initForm={
          uname:this.editUser.username,
          role:this.editUser.role,
          cName:this.editUser.completeName,
          email:this.editUser.email
        }
      },
      error:(err)=>{
        console.log(err);
        Swal.fire({
          icon: 'error',
          title: 'Ooops...',
          text: 'It seems there was an error',
        })
      }
    })
  }

  /**
  * Obtiene los valores del formulario y edita el usuario
  */
  update(){
    let name=this.myForm.controls['uname'].value;
    let email=this.myForm.controls['email'].value;
    let role=this.myForm.controls['role'].value;
    let completeName=this.myForm.controls['cName'].value;
    let password=this.myForm.controls['password'].value;
    this.userSvc.updateUser(name,completeName,role,email,password).subscribe({
      //Si se actualiza muestra un alert success
      next:(resp)=>{
        Swal.fire({
          icon: 'success',
          title: 'Success',
          text: 'User updated',
        })
      },
      //Si hay error muestra un alert fallido
      error:(err)=>{
        console.log(err);
        Swal.fire({
          icon: 'error',
          title: 'Ooops...',
          text: 'It seems there was an error',
        })
      }
    })
  }
}
