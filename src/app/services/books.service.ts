import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { Reservation } from '../interfaces/Reservation.interface';

@Injectable({
  providedIn: 'root'
})
export class BooksService {

  constructor(private http: HttpClient) { }

  // private url: string = 'https://pistasapi-production.up.railway.app';
  private url:string='http://localhost:9100/reservation'

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
  };

  booksOfAnUser(nick:string){
    return this.http.get<Reservation[]>(`${this.url}/${nick}`);
  }

  deleteBook(book:Reservation){
    const options = {
      body: book
    };
    return this.http.delete(`${this.url}`,options)
  }
}
