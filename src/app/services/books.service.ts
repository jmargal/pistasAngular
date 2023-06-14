import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Reservation } from '../interfaces/Reservation.interface';

@Injectable({
  providedIn: 'root'
})
export class BooksService {

  constructor(private http: HttpClient) { }

  private url: string = 'https://pistasapi-production.up.railway.app/reservation';
  // private url:string='http://localhost:9100/reservation'

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
  };

  /**
   * Devuelve las reservas del usuario que se le pasa por parametro
   * @param nick
   * @returns Observable con las reservas de ese usuario
   */
  booksOfAnUser(nick:string){
    return this.http.get<Reservation[]>(`${this.url}/${nick}`);
  }

  /**
   * Borra la reserva que se la pasa por parámetro
   * @param book
   * @returns Observable del borrado de la reserva
   */
  deleteBook(book:Reservation){
    //La API espera la reserva por body así que aquí se le asigna
    const options = {
      body: book
    };
    return this.http.delete(`${this.url}`,options)
  }
}
