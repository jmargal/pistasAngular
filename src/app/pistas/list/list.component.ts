import { Component, Input, OnInit } from '@angular/core';
import { Court } from 'src/app/interfaces/Court.interface';


@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit {

  //Recibe la lista de pistas
  @Input() courtList:Court[]=[]
  constructor() {}

  ngOnInit(): void {

  }




}
