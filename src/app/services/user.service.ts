import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from '../interfaces/User.interface';


@Injectable({
  providedIn: 'root'
})
export class UserService {
  private url: string = 'https://pistasapi-production.up.railway.app';
  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
  };


  constructor(private http: HttpClient) { }


  //Obtiene el usuario con nombre que se le pasa por parametro
  getUser(nick:string):Observable<User> {
    return this.http.get<User>(`${this.url}/user/${nick}`)
  }
  //Actualiza el usuario
  updateUser(name:string,completeName:string,role:string, email:string, password:string){
    //Si el password no es vacio actualiza el resto de campos
    if(password!==''){
      return this.http.put<any>(`${this.url}/updateUser/${name}`,{email,completeName,password,role})
    }
    //Si no manda la peticion con todos los datos
    else{
      return this.http.put<any>(`${this.url}/updateUser/${name}`,{email,completeName,role})
    }
  }

  //Añade un usuario con los datos recibidos
  addUser(nick:string,completeName:string,email:string,password:string):Observable<User>{
    return this.http.post<User>(`${this.url}/signup`,{nick,completeName,email,password})
  }



}
