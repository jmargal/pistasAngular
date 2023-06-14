import { Component, OnInit } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { Reservation } from 'src/app/interfaces/Reservation.interface';
import { BooksService } from 'src/app/services/books.service';
import { CourtService } from 'src/app/services/court.service';
import { Court } from '../../interfaces/Court.interface';
import Swal from 'sweetalert2';
import { CentresService } from 'src/app/services/centres.service';
import { Center } from 'src/app/interfaces/Center.interface';

@Component({
  selector: 'app-my-books',
  templateUrl: './my-books.component.html',
})
export class MyBooksComponent implements OnInit {
  constructor(
    private bookSvc: BooksService,
    private cookieSvc: CookieService,
    private courtSvc: CourtService,
    private centerSvc: CentresService
  ) {}

  user!: string;
  bookList: Reservation[]=[];
  courtList: Court[] = [];
  centerList: Center[] = [];
  court!: Court;

  /**
   *Al iniciarse el componente obtiene el nombre del usuario registrado
   *Llama a los métodos que cargan los datos
   */
  ngOnInit(): void {
    this.user = this.cookieSvc.get('username');
    this.loadData();
    this.loadCourts();
  }

  /**
   * Carga las reservas de un usuario y todos los centros
   */
  loadData() {
    this.bookSvc.booksOfAnUser(this.user).subscribe({
      next: (resp) => {
        this.bookList = resp;
      },
    });
    this.centerSvc.getCentres().subscribe({
      next: (resp) => {
        this.centerList = resp;
      },
    });
  }
  /**
   * Carga todas las pistas
   */
  loadCourts() {
    this.courtSvc.getCourts().subscribe({
      next: (resp) => {
        this.courtList = resp;
      },
    });
  }

  /**
   * Recibe el id de una pista y devuelve el nombre de su centro
   * @param idCourt
   * @returns nombre del centro
   */
  getCenterName(idCourt: number): string {
    //Encuentra la pista que recibe por argumento en la lista de pistas
    const court = this.courtList.find((court) => court.idCourt === idCourt);
    if (court) {
      //Busca el centro que coincida su id con el id de la pista
      const center = this.centerList.find(
        (center) => center.idCentre === court.idCentre
      );
      if (center) {
        return center.name;
      }
    }
    return '';
  }

  /**
   *Devuelve el deporte de la pista que se le pasa por parámetro
   * @param courtId
   * @returns Deporte de la pisya
   */
  getCourtSport(courtId: number): string {
    //Encuentra la pista en el array que coincide con el id
    const court = this.courtList.find((court) => court.idCourt === courtId);
    //Si hay court devuelve el deporte y su no devuelve ''
    return court ? court.sport : '';
  }

  /**
   *Pregunta si se quiere borrar la reserva, si se confirma, la borra y vuelve a llamar a los
   *métodos que cargan datos para que se recargue el componente
   * @param book
   */
  deleteBook(book: Reservation) {
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
