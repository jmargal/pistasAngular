import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Center } from '../interfaces/Center.interface';

@Injectable({
  providedIn: 'root'
})
export class CentresService {
  private url: string = 'https://pistasapi-production.up.railway.app';
  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
  };


  constructor(private http: HttpClient) { }

  getCentres(): Observable<Center[]> {
    return this.http.get<Center[]>(`${this.url}/center/list`);
  }



}
