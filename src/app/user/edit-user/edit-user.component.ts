import { Component, OnInit, ViewChild } from '@angular/core';
import { UserService } from 'src/app/services/user.service';
import { User } from '../../interfaces/User.interface';
import { CookieService } from 'ngx-cookie-service';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-edit-user',
  templateUrl: './edit-user.component.html'
})
export class EditUserComponent implements OnInit {

  constructor(private userSvc:UserService,private cookieSvc:CookieService) { }

  @ViewChild('myForm') myForm!:NgForm;

  initForm={
    uname:"",
    role:"",
    cName:"",
    email:""
  }

  editUser!:User;
  ngOnInit(): void {
    this.userSvc.getUser(this.cookieSvc.get("username")).subscribe({
      next:(resp)=>{
        this.editUser=resp;
        this.initForm={
          uname:this.editUser.username,
          role:this.editUser.role,
          cName:this.editUser.completeName,
          email:this.editUser.email
        }
      },
      error:(err)=>{
        console.log(err);
      }
    })
  }

  update(){
    let name=this.myForm.controls['uname'].value;
    let email=this.myForm.controls['email'].value;
    let role=this.myForm.controls['role'].value;
    let completeName=this.myForm.controls['cName'].value;
    let password=this.myForm.controls['password'].value;
    this.userSvc.updateUser(name,completeName,role,email,password).subscribe({
      next:(resp)=>{
        alert("Updated!");
      },
      error:(err)=>{
        console.log(err);
        alert("Not updated");
      }
    })
  }


}
