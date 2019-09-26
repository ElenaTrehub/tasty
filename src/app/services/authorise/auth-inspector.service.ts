import { Injectable } from '@angular/core';
import {HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from '@angular/common/http';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthInspectorService implements HttpInterceptor{

  constructor() { }
  intercept(req: HttpRequest<any>,
            next: HttpHandler): Observable<HttpEvent<any>> {
    // console.log(localStorage);
    const token = localStorage.getItem('token');
    // console.log(token);
    if (token) {
      const cloned = req.clone({
        headers: req.headers.set('Authorization',
          'Bearer ' + token)
      });
// console.log(cloned);
      return next.handle(cloned);
    }
    else {
      return next.handle(req);
    }
  }
}
