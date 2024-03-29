import { HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { catchError, Observable, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthInterceptorService implements HttpInterceptor{

  constructor(private cookieSvc: CookieService, private router: Router) { }


  /**
   * Añade a todas las peticiones el token del usuario registrado
   * @param req
   * @param next
   */
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    //Toma de las cookies el token
    const token = this.cookieSvc.get('token');
    let request = req;
    //Si hay token le pone delante Bearer
    if (token) {
      //Se clona la cabecera para enviarla porque son inmutables
      request = req.clone({
        setHeaders: {
          Authorization: `Bearer ${token}`,
        },
      });
    }
    return next.handle(request)
    .pipe(
      //Captura el error y lo imprime
      catchError((err: HttpErrorResponse) => {
        if (err.status === 401) {
          console.log(err);
        }
        return throwError(err);
      })
    );
    }
  }
