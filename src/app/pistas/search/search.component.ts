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

  findCenter(){
    this.centerName.emit(this.query);
    this.query='';
  }

}
