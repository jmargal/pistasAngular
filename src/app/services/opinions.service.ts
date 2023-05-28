import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Opinion, addOpinion } from '../interfaces/Opinion.interface';

@Injectable({
  providedIn: 'root'
})
export class OpinionsService {


  constructor(private http: HttpClient) { }

  private url:string='http://localhost:9100/opinions'

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
  };

  getOpinions(id:number):Observable<any>{
    return this.http.get<any>(`${this.url}/${id}/court`)
  }

  getAnOpinion(id:number){
    return this.http.get<any>(`${this.url}/${id}`)
  }

  addOpinion(opinion:addOpinion){
    return this.http.post<addOpinion>(`${this.url}`,opinion,this.httpOptions)
  }

  deleteOpinion(id:number){
    return this.http.delete(`${this.url}/${id}`)
  }

  updateOpinion(id:number,opinion:addOpinion){
    return this.http.put(`${this.url}/${id}`,opinion)
  }
}
