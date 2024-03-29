import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { Court } from "src/app/interfaces/Court.interface";
import { Reservation } from "../interfaces/Reservation.interface";
import { addCourt } from '../interfaces/Court.interface';

@Injectable({
  providedIn: 'root'
})
export class CourtService {
  private url: string = 'https://pistasapi-production.up.railway.app';
  // private url:string='http://localhost:9100'

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
  };


  constructor(private http: HttpClient) { }

  /**
   * Obtiene todas las pistas
   * @returns Observable con todas las pistas
   */
  getCourts(): Observable<Court[]> {
    return this.http.get<Court[]>(`${this.url}/court/list`);
  }

  /**
   * Obtiene las pistas del centro que se le pasa por parámetro
   * @param id
   * @returns Observable con una lista de pistas que coinciden
   */
  getCourtsByCenter(id:number):Observable<Court[]>{
    return this.http.get<Court[]>(`${this.url}/court/list/${id}`)
  }

  /**
   * Obtiene la pista que se le pasa por parámetro
   * @param id
   * @returns Observable con la pista
   */
  getCourt(id:number):Observable<Court>{
    return this.http.get<Court>(`${this.url}/court/${id}`)
  }

  /**
   *  Obtiene las reservas que están hechas sobre la pista que se para por parametro
   * @param id
   * @return Observable con la lista de reservas
   */
  public getBusyDates(id:number):Observable<Reservation[]>{
    return this.http.get<Reservation[]>(`${this.url}/reservation/court/${id}`)
  }

  /**
   * Hace una reserva
   * @param username
   * @param idCourt
   * @param idHorary
   * @param dateStamp
   * @param reserveDate
   * @returns Observable de la reserva hecha
   */
  makeReservation(username:string,idCourt:number,idHorary:string,dateStamp:string,reserveDate:string):Observable<any>{
    return this.http.post<any>(`${this.url}/reservation`,{username,idCourt,idHorary,dateStamp,reserveDate})
  }

  /**
   * Añade una pista
   * @param court
   * @param img
   * @param center
   * @returns Observable con la pista creada
   */
  addCourt(court:addCourt,img:File,center:number){
    let data: FormData = new FormData();
    //La api espera que le pasen un form data con las dos propiedades que se le van a añadir a continuación
    //Una vez hechas las conversiones, se pasa la petición
    data.append('file', img,img.name);
    data.append('court',new Blob([JSON.stringify(court)], {type: 'application/json'}))
    return this.http.post<any>(`${this.url}/addCourt/${center}`,data)
  }

  /**
   * Borra la pista que se le pasa por parámetro
   * @param id
   * @returns Observable de la pista borrada
   */
  deleteCourt(id:number){
    return this.http.delete<any>(`${this.url}/deleteCourt/${id}`);
  }

  /**
   * Actualiza una pista, llegue una imagen o no
   * @param id
   * @param img
   * @param sport
   * @param price
   * @param idCentre
   * @returns Observable con la pista actualizada
   */
  updateCourt(id: number, img: any, sport: string, price: number, idCentre: number) {
    let data: FormData = new FormData();
    let court = { sport, price, idCentre };
    // Los campos del formulario los convierto en la propiedad court que espera la API
    data.append('court', new Blob([JSON.stringify(court)], { type: 'application/json' }));
    // Si hay imagen, la agrego al FormData
    if (img) {
      data.append('file', img, img.name);
    } else {
      // Si no hay imagen, agrego un archivo vacío
      data.append('file', new Blob(), 'empty');
    }
    return this.http.put<any>(`${this.url}/updateCourt/${id}`, data);
  }

}
