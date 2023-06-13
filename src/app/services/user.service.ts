import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from '../interfaces/User.interface';


@Injectable({
  providedIn: 'root'
})
export class UserService {
  private url: string = 'https://pistasapi-production.up.railway.app';
  // private url:string='http://localhost:9100'

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
  };
  constructor(private http: HttpClient) { }

  /**
   * Obtiene el usuario con nombre que se le pasa por parametro
   * @param nick
   * @returns Observable con el usuario
   */
  getUser(nick:string):Observable<User> {
    return this.http.get<User>(`${this.url}/user/${nick}`)
  }
  /**
   * Actualiza el usuario
   * @param name
   * @param completeName
   * @param role
   * @param email
   * @param password
   * @returns Observable con el usuario actualizado
   */
  updateUser(name:string,completeName:string,role:string, email:string, password:string){
    //Si el password no es vacio actualiza todos los campos
    if(password!==''){
      return this.http.put<any>(`${this.url}/updateUser/${name}`,{email,completeName,password,role})
    }
    //Si no manda la peticion con el resto de datos
    else{
      return this.http.put<any>(`${this.url}/updateUser/${name}`,{email,completeName,role})
    }
  }

  /**
   * Añade un usuario con los datos recibidos
   * @param nick
   * @param completeName
   * @param email
   * @param password
   * @returns Observable del usuario creado
   */
  addUser(nick:string,completeName:string,email:string,password:string):Observable<User>{
    return this.http.post<User>(`${this.url}/signup`,{nick,completeName,email,password})
  }
}
