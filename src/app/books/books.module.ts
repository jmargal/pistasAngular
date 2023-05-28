import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MyBooksComponent } from './my-books/my-books.component';



@NgModule({
  declarations: [
    MyBooksComponent
  ],
  imports: [
    CommonModule,

  ],
  exports:[
    MyBooksComponent

  ]
})
export class BooksModule { }
