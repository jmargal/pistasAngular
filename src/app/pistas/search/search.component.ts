import { Component, EventEmitter, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html'
})
export class SearchComponent implements OnInit{

  query:string='';
  @Output() centerName:EventEmitter<String> = new EventEmitter();


  ngOnInit(): void {

  }

  /**
   * Emite el string con el centro a buscar para que el componente main lo recoja
   */
  findCenter(){
    this.centerName.emit(this.query);
    this.query='';
  }

}
