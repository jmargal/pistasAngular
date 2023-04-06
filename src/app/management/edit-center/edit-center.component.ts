import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Center } from 'src/app/interfaces/Center.interface';
import { CentresService } from 'src/app/services/centres.service';

@Component({
  selector: 'app-edit-center',
  templateUrl: './edit-center.component.html'
})
export class EditCenterComponent implements OnInit{

  constructor(private route: ActivatedRoute,private centerSvc:CentresService){}

  center!:Center;
  id:number=this.route.snapshot.params['id'];


  ngOnInit(): void {
    this.centerSvc.getCenter(this.id).subscribe({
      next:(resp)=>{
        this.center = resp;
      },
      error:(err)=>{
        console.log(err);
      }
    })

  }
}
