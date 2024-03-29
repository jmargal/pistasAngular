import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, catchError, Observable, of, switchMap } from 'rxjs';
import { CookieService } from 'ngx-cookie-service';
import { InterfaceLogin } from '../interfaces/InterfaceLogin';
import { UserService } from './user.service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';


@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private url: string = 'https://pistasapi-production.up.railway.app';
  // private url:string='http://localhost:9100'
  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
  };

  constructor(private http: HttpClient, private cookieSvc: CookieService,private userSvc:UserService,private router:Router) {
    //Para pintar la barra de navegacion segun si esta registrado o no
    if(this.cookieSvc.get('token') == ''){
      this.loggedIn.next(false);
    }else{
      this.loggedIn.next(true);
    }
  }

  private loggedIn = new BehaviorSubject<boolean> (false);

  /**
   * Devuelve el boolean de si está registrado como un observable
   */
  get isLoggedIn() {
    return this.loggedIn.asObservable();
  }


  /**
   * Recibe nombre y password y envia a la API, en caso de hacer login guarda en las
   * cookies el rol, el nombre y el token
   * @param username
   * @param password
   * @returns observable boolean
   */
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

  /**
   * Devuelve true si el usuario es admin y false en caso contrario
   * @returns Boolean de si el usuario es admin
   */
  isAdmin(){
    return this.cookieSvc.get('role')==='ADMIN';
  }

  /**
   * Metodo que comprueba si un user esta registrado, devuelve un observable boolean
   * @returns Observable boolean
   */
  isAuthenticated(): Observable<boolean> {
    //Hace una peticion(solo obtendremos respuesta si tiene un token)
    return this.http.get(this.url + '/times').pipe(
      switchMap((resp) => {
        return of(true);
      }),
      catchError((err) => {
        this.router.navigate(['']);
        Swal.fire({
          icon: 'error',
          title: 'Ooops...',
          text: 'You must be signed for access this resource',
        });
        this.cookieSvc.delete('token');
        return of(false);
      })
    );
  }

  /**
   * Borra de las cookies los datos del usuario
   */
  logout(){
    this.cookieSvc.deleteAll();
    this.loggedIn.next(false);
  }
}
