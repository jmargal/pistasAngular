import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MyBooksComponent } from './my-books/my-books.component';
import { RouterModule } from '@angular/router';



@NgModule({
  declarations: [
    MyBooksComponent
  ],
  imports: [
    CommonModule,
    RouterModule

  ],
  exports:[
    MyBooksComponent

  ]
})
export class BooksModule { }
