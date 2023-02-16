import { Component, OnInit } from '@angular/core';
import { Court } from 'src/interfaces/Court.interface';
import { CourtService } from '../../services/court.service';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit {

  courtList:Court[]=[]
  constructor(private courtService: CourtService) {}

  ngOnInit(): void {
    this.courtService.getCourts().subscribe({
      next:(resp)=>{
        this.courtList=resp;
      },
      error:(err)=>{
        console.log(err);
      }
    })
  }
}
