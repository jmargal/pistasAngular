import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Center } from '../interfaces/Center.interface';

@Injectable({
  providedIn: 'root'
})
export class CentresService {
  // private url: string = 'https://pistasapi-production.up.railway.app';
  private url:string='http://localhost:9100'

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
  };


  constructor(private http: HttpClient) { }

  //Obitene todos los centros
  getCentres(): Observable<Center[]> {
    return this.http.get<Center[]>(`${this.url}/center/list`);
  }

  //Obtiene el centro por el id
  getCenter(id:number):Observable<Center> {
    return this.http.get<Center>(`${this.url}/center/${id}`)
  }

  //Obtiene el centro con el nombre que se le pasa por parametro
  getCenterByName(name: string): Observable<Center>{
    return this.http.get<Center>(`${this.url}/centerByName/${name}`)
  }

  //Borra el centro que se le pasa por parametro
  deleteCenter(id:number): Observable<any>{
    return this.http.delete<Center>(`${this.url}/deleteCenter/${id}`)
  }

  //Añade un nuevo centro con los datos que se le pasan
  addCenter(name:string,address:string):Observable<Center>{
    return this.http.post<Center>(`${this.url}/addCenter`,{name,address})
  }

  //Actualiza el centro del que recibe el id con los datos que se le pasan
  updateCenter(id:number,name:string,address:string):Observable<Center>{
    return this.http.put<Center>(`${this.url}/editCenter/${id}`,{name,address})
  }


}
