import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user.service';
import { User } from '../../interfaces/User.interface';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-edit-user',
  templateUrl: './edit-user.component.html'
})
export class EditUserComponent implements OnInit {

  constructor(private userSvc:UserService,private cookieSvc:CookieService) { }

  editUser!:User;
  ngOnInit(): void {
    this.userSvc.getUser(this.cookieSvc.get("username")).subscribe({
      next:(resp)=>{
        this.editUser=resp;
      },
      error:(err)=>{
        console.log(err);
      }
    })
  }

}
