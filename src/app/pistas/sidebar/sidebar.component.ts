import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Center } from '../../interfaces/Center.interface';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls:['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {


  //Va a mostrar los centros de la lista que recibe del padre
  @Input() centerList:Center[]=[];

  //Propiedad eventEmitter que le va a pasar el id del centro al componente padre
  // main para que se muestren en list las pistas de ese centro
  @Output() pistasDeEseCentro:EventEmitter<number>=new EventEmitter();
  constructor() { }


  ngOnInit(): void {
  }

  //Funcion que lanza el eventemitter con el id del centro que han pulsado
  dispararEvento(idCentre:number){
    this.pistasDeEseCentro.emit(idCentre);
  }


}
