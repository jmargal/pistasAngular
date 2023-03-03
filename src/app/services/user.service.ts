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


  getUser(nick:string):Observable<User> {
    return this.http.get<User>(`${this.url}/user/${nick}`)
  }

  updateUser(user:User){

  }

  addUser(nick:string,completeName:string,email:string,password:string):Observable<User>{
    return this.http.post<User>(`${this.url}/signup`,{nick,completeName,email,password})
  }



}
