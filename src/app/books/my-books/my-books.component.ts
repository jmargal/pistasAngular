import { Component, OnInit } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { Reservation } from 'src/app/interfaces/Reservation.interface';
import { BooksService } from 'src/app/services/books.service';
import { CourtService } from 'src/app/services/court.service';
import { Court } from '../../interfaces/Court.interface';
import { Observable, catchError, map, of } from 'rxjs';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-my-books',
  templateUrl: './my-books.component.html',
})
export class MyBooksComponent implements OnInit {
  constructor(
    private bookSvc: BooksService,
    private cookieSvc: CookieService,
    private courtSvc: CourtService
  ) {}

  user!: string;
  bookList!: Reservation[];
  courtList: Court[] = [];

  ngOnInit(): void {
    this.user = this.cookieSvc.get('username');
    this.loadData();
    this.loadCourts();
  }

  loadData() {
    this.bookSvc.booksOfAnUser(this.user).subscribe({
      next: (resp) => {
        this.bookList = resp;
      },
    });
  }

  loadCourts() {
    this.courtSvc.getCourts().subscribe({
      next:(resp) => {
        this.courtList = resp;
      }
    });
  }

  getCourtSport(courtId: number): string {
    //Encuentra la pista en el array que coincide con el id
    const court = this.courtList.find((court) => court.idCourt === courtId);
    //Si hay court devuelve el deporte y su no devuelve ''
    return court ? court.sport : '';
  }

  deleteBook(book:Reservation){
    Swal.fire({
      title: 'Are you sure?',
      text: `You are going to cancel this reservation in court ${book.idCourt} on ${book.fechaReservada}`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!',
    }).then((result) => {
      if (result.isConfirmed) {
        this.bookSvc.deleteBook(book).subscribe({
          next: (value) => {
            this.loadData();
            this.loadCourts();
          },
          error: (err) => {
            console.log(err);
            Swal.fire({
              icon: 'error',
              title: 'Ooops...',
              text: 'Something went wrong',
            });
          },
        });
      }
    });
  }
}
