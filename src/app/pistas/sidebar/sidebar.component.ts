import { Component, Input, OnInit } from '@angular/core';
import { Center } from '../../../interfaces/Center.interface';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls:['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {


  @Input() centerList:Center[]=[];
  constructor() { }


  ngOnInit(): void {
  }

}
