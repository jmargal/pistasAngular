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

  //Obitene todos los centros
  getCentres(): Observable<Center[]> {
    return this.http.get<Center[]>(`${this.url}/center/list`);
  }

  //Obtiene el centro con el nombre que se le pasa por parametro
  getCenterByName(name: string): Observable<Center>{
    return this.http.get<Center>(`${this.url}/centerByName*/${name}`)
  }

  //Borra el centro que se le pasa por parametro
  deleteCenter(id:number): Observable<any>{
    return this.http.delete<Center>(`${this.url}/deleteCenter/${id}`)
  }


}
