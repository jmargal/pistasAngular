import { Component, Input, OnInit } from '@angular/core';
import { Court } from 'src/app/interfaces/Court.interface';
import { CourtService } from '../../services/court.service';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit {

  @Input() courtList:Court[]=[]
  constructor(private courtService: CourtService) {}

  ngOnInit(): void {

  }


}
