import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { Court } from "src/app/interfaces/Court.interface";
import { Reservation } from "../interfaces/Reservation.interface";

@Injectable({
  providedIn: 'root'
})
export class CourtService {
  // private url: string = 'https://pistasapi-production.up.railway.app';
  private url:string='http://localhost:9100'

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
  };


  constructor(private http: HttpClient) { }

  //Obtiene todas las pistas
  getCourts(): Observable<Court[]> {
    return this.http.get<Court[]>(`${this.url}/court/list`);
  }

  //Obtiene las pistas del centro que se le pasa por parametro
  getCourtsByCenter(id:number):Observable<Court[]>{
    return this.http.get<Court[]>(`${this.url}/court/list/${id}`)
  }

  //Obtiene la pista con id que se le pasa por parametro
  getCourt(id:number):Observable<Court>{
    return this.http.get<Court>(`${this.url}/court/${id}`)
  }

  //Obtiene las reservas que están hechas sobre la pista que se para por parametro
  public getBusyDates(id:number):Observable<Reservation[]>{
    return this.http.get<Reservation[]>(`${this.url}/reservation/court/${id}`)
  }

  //Hace la reserva con los datos que se le pasan
  makeReservation(username:string,idCourt:number,idHorary:string,dateStamp:string,reserveDate:string):Observable<any>{
    return this.http.post<any>(`${this.url}/reservation`,{username,idCourt,idHorary,dateStamp,reserveDate})
  }



}
