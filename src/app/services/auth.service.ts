import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, catchError, Observable, of, switchMap } from 'rxjs';
import { CookieService } from 'ngx-cookie-service';
import { InterfaceLogin } from '../interfaces/InterfaceLogin';
import { User } from '../interfaces/User.interface';
import { UserService } from './user.service';
import { Router } from '@angular/router';


@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private url: string = 'https://pistasapi-production.up.railway.app';
  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
  };

  constructor(private http: HttpClient, private cookieSvc: CookieService,private userSvc:UserService,private router:Router) {
    //Para pintar la barra de navegacion segun si esta registrado o no
    this.isAuthenticated().subscribe({
      next:()=>{
        this.loggedIn.next(true);
      },
      error:()=>{
        this.loggedIn.next(false)
      }
    })
  }

  private loggedIn = new BehaviorSubject<boolean> (false);

  get isLoggedIn() {
    return this.loggedIn.asObservable();
  }


  //Recibe nombre y password y envia a la API, en caso de hacer login guarda en las
  //cookies el rol, el nombre y el token
  hacerLogin(username: string, password: string) {
    return this.http.post<InterfaceLogin>(`${this.url}/signin`,{username,password },this.httpOptions)
      .pipe(
        //El switchMap recoge un observable, lo trata y devuelve otro
        switchMap((token) => {
          //Guarda en las cookies el token que recoge de la peticion de antes
          this.cookieSvc.set('token', token.access_token);
          this.userSvc.getUser(username).subscribe({
            next:(resp)=>{
              this.cookieSvc.set('role', resp.role)
            }
          })
          this.loggedIn.next(true);
          //Devuelve observable de true
          return of(true);
        }),
        catchError((error) => {
          //Si hay algun error borra de las cookies
          this.cookieSvc.delete('token');
          this.cookieSvc.delete('username');
          this.cookieSvc.delete('role')
          return of(false);
        })
      );
  }

  //Metodo que comprueba si un user esta registrado, devuelve un observable boolean
  isAuthenticated(): Observable<boolean> {
    //Hace una peticion(solo obtendremos respuesta si tiene un token)
    return this.http.get(this.url + '/times').pipe(
      switchMap((resp) => {
        return of(true);
      }),
      catchError((err) => {
        this.cookieSvc.delete('token');

        return of(false);
      })
    );
  }

  //Borra de las cookies lps datos del usuario
  logout(){
    this.loggedIn.next(false);
    this.cookieSvc.delete('token')
    this.cookieSvc.delete('username')
    this.cookieSvc.delete('role')

  }


}
