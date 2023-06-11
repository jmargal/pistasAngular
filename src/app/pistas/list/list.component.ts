import { Component, Input, OnInit } from '@angular/core';
import { Court } from 'src/app/interfaces/Court.interface';
import { CourtService } from '../../services/court.service';
import {TableModule} from 'primeng/table';
import { AuthService } from 'src/app/services/auth.service';


@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit {

  //Recibe la lista de pistas
  @Input() courtList:Court[]=[]
  constructor(private authSvc: AuthService) {}

  ngOnInit(): void {

  }




}
