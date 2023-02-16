import { Component, OnInit } from '@angular/core';
import { Center } from '../../../interfaces/Center.interface';
import { CentresService } from '../../services/centres.service';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls:['./main.component.css']
})
export class MainComponent implements OnInit {

  centerList:Center[]=[]
  constructor(private centerSvc:CentresService) { }

  ngOnInit(): void {
    this.centerSvc.getCentres().subscribe({
      next:(resp)=>{
        this.centerList=resp;
      },
      error: (err) => {
        console.log(err);
      }
    })
  }

}
