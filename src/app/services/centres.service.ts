import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Center } from '../interfaces/Center.interface';

@Injectable({
  providedIn: 'root'
})
export class CentresService {
  private url: string = 'https://pistasapi-production.up.railway.app';
  // private url:string='http://localhost:9100'

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
  };


  constructor(private http: HttpClient) { }

  /**
   * Obtiene todos los centros
   * @returns Observable con todos los centros
   */
  getCentres(): Observable<Center[]> {
    return this.http.get<Center[]>(`${this.url}/center/list`);
  }

 /**
 * Obtiene el id del centro que se le pasa por parámetro
 * @param id
 * @returns Observable con el centro
 */
  getCenter(id:number):Observable<Center> {
    return this.http.get<Center>(`${this.url}/center/${id}`)
  }

  /**
   * Obtiene la lista de centros que coincidan con el nombre que se pasa por parámetro
   * @param name
   * @returns Observable con los centro
   */
  getCenterByName(name: String): Observable<any>{
    return this.http.get<any>(`${this.url}/centerByName/${name}`)
  }

  /**
   * Borra el centro que se le pasa por parámetro
   * @param id
   * @returns Observable con el centro borrado
   */
  deleteCenter(id:number): Observable<any>{
    return this.http.delete<Center>(`${this.url}/deleteCenter/${id}`)
  }

 /**
  * Añade un nuevo centro
  * @param name
  * @param address
  * @returns Observable con el centro que se acaba de crear
  */
  addCenter(name:string,address:string):Observable<Center>{
    return this.http.post<Center>(`${this.url}/addCenter`,{name,address})
  }

  /**
   * Actualiza el centro con los datos que se le pasan
   * @param id
   * @param name
   * @param address
   * @returns Observable del centro actualizado
   */
  updateCenter(id:number,name:string,address:string):Observable<Center>{
    return this.http.put<Center>(`${this.url}/editCenter/${id}`,{name,address})
  }

}
