import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, of, switchMap } from 'rxjs';
import { CookieService } from 'ngx-cookie-service';
import { InterfaceLogin } from '../interfaces/InterfaceLogin';
import Swal from 'sweetalert2';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private url: string = 'http://localhost:9100';
  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
  };

  constructor(private http: HttpClient, private cookieSvc: CookieService) {}

  hacerLogin(username: string, password: string) {
    return this.http.post<InterfaceLogin>(`${this.url}/signin`,{username,password },this.httpOptions)
      .pipe(
        //El switchMap recoge un observable, lo trata y devuelve otro
        switchMap((token) => {
          //Guarda en las cookies el token que recoge de la peticion de antes
          this.cookieSvc.set('token', token.access_token);
          //Devuelve observable de true
          return of(true);
        }),
        catchError((error) => {
          //Si hay algun error borra de las cookies
          this.cookieSvc.delete('token');
          this.cookieSvc.delete('username');
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
}
