import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { Court } from "src/app/interfaces/Court.interface";

@Injectable({
  providedIn: 'root'
})
export class CourtService {
  private url: string = 'http://localhost:9100';
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



}
