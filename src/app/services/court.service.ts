import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { Court } from "src/app/interfaces/Court.interface";
import { Reservation } from "../interfaces/Reservation.interface";

@Injectable({
  providedIn: 'root'
})
export class CourtService {
  private url: string = 'https://pistasapi-production.up.railway.app';
  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
  };


  constructor(private http: HttpClient) { }

  getCourts(): Observable<Court[]> {
    return this.http.get<Court[]>(`${this.url}/court/list`);
  }

  getCourtsByCenter(id:number):Observable<Court[]>{
    return this.http.get<Court[]>(`${this.url}/court/list/${id}`)
  }

  getCourt(id:number):Observable<Court>{
    return this.http.get<Court>(`${this.url}/court/${id}`)
  }

  public getBusyDates(id:number):Observable<Reservation[]>{
    return this.http.get<Reservation[]>(`${this.url}/reservation/court/${id}`)
  }


  // makeReservation(username:string,idCourt:number,idHorary):Observable<any>{
  //   return this.http.post<any>(`${this.url}/reservation`,{})
  // }



}
