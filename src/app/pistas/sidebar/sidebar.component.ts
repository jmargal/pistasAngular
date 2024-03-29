import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Center } from '../../interfaces/Center.interface';
import { CentresService } from 'src/app/services/centres.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls:['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {

  //Propiedad para que salga marcado en el sidebar el centro al que se ha pulsado
  selectedCenterId: number = 0;

  //Va a mostrar los centros de la lista que recibe del padre
  @Input() centerList:Center[]=[];

  //Propiedad eventEmitter que le va a pasar el id del centro al componente padre
  // main para que se muestren en list las pistas de ese centro
  @Output() pistasDeEseCentro:EventEmitter<number>=new EventEmitter();

  constructor(private centerSvc:CentresService) { }


  ngOnInit(): void {
  }


  /**
   * Lanza el eventemitter con el id del centro que han pulsado
   * Si es 0, es que es All centers y carga todos
   * @param idCentre
   */
  seleccionarCentro(idCentre:number): void {
    if(idCentre===0){
      this.centerSvc.getCentres().subscribe({
        next:(resp)=>{
          this.centerList=resp;
        }
      })
    }
    this.selectedCenterId = idCentre;
    this.pistasDeEseCentro.emit(idCentre);
  }


}
