import { Component, OnInit } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { Reservation } from 'src/app/interfaces/Reservation.interface';
import { BooksService } from 'src/app/services/books.service';

@Component({
  selector: 'app-my-books',
  templateUrl: './my-books.component.html'
})
export class MyBooksComponent implements OnInit{

  constructor(private bookSvc:BooksService, private cookieSvc:CookieService){}

  user!:string;
  bookList!:Reservation[];

  ngOnInit(): void {
    this.user=this.cookieSvc.get('username');
    this.loadData();
  }

  loadData(){
    this.bookSvc.booksOfAnUser(this.user).subscribe({
      next:(resp)=>{
        this.bookList=resp;
      }
    })
  }

}
