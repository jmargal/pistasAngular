import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { addOpinion } from '../interfaces/Opinion.interface';

@Injectable({
  providedIn: 'root'
})
export class OpinionsService {


  constructor(private http: HttpClient) { }

  private url: string = 'https://pistasapi-production.up.railway.app';
  // private url:string='http://localhost:9100/opinions'

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
  };

  /**
   * Obtiene todas las opiniones sobre una pista
   * @param id
   * @returns Lista de opiniones sobre una pista
   */
  getOpinions(id:number):Observable<any>{
    return this.http.get<any>(`${this.url}/${id}/court`)
  }

  /**
   * Obtiene una única opinión
   * @param id
   * @returns Observable con esa opinión
   */
  getAnOpinion(id:number){
    return this.http.get<any>(`${this.url}/${id}`)
  }

  /**
   * Añade una opinión
   * @param opinion
   * @returns Observable con la opinión creada
   */
  addOpinion(opinion:addOpinion){
    return this.http.post<addOpinion>(`${this.url}`,opinion,this.httpOptions)
  }

  /**
   * Borra una opinión que recibe por parámetro
   * @param id
   * @returns Observable con la opinión borrada
   */
  deleteOpinion(id:number){
    return this.http.delete(`${this.url}/${id}`)
  }

  /**
   * Actualiza una opinión
   * @param id
   * @param opinion
   * @returns Observable con la opinión actualizada
   */
  updateOpinion(id:number,opinion:addOpinion){
    return this.http.put(`${this.url}/${id}`,opinion)
  }
}
