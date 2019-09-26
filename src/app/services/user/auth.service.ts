import { Injectable } from '@angular/core';
import {User} from '../../models/User';
import {ServerResponse} from '../../models/ServerResponse';
import {HttpClient, HttpEvent, HttpHandler, HttpParams, HttpRequest} from '@angular/common/http';
import {ApiRoutes} from '../../models/ApiRoutes';

import {CookieService} from 'ngx-cookie-service';
import { Observable, Subject } from 'rxjs';
import { map, take } from 'rxjs/operators';

@Injectable()
export class AuthService {

  constructor(private http: HttpClient,
              private cookieService: CookieService) { }




  async authorise(user: User): Promise<ServerResponse> {
    const formData = new FormData();
    formData.append('userPassword', user.userPassword);
    formData.append('userLogin', user.userLogin);

    return this.http.post(`${ApiRoutes.SERVER_URL}${ApiRoutes.USER_AUTHORIZE}`,
      formData).toPromise() as Promise<ServerResponse>;
  }

  async register(user: User): Promise<ServerResponse>{
    const formData = new FormData();
    formData.append('userName', user.userName);
    formData.append('userLogin', user.userLogin);
    formData.append('userEmail', user.userEmail);
    formData.append('password', user.userPassword);

    return this.http.post(`${ApiRoutes.SERVER_URL}${ApiRoutes.USER_REGISTER}`,
      formData).toPromise() as Promise<ServerResponse>;
  }
  async GetCurrentUser(): Promise<ServerResponse> {

    return this.http.get(
      `${ApiRoutes.SERVER_URL}${ApiRoutes.USER_CURRENT}`
    ).toPromise() as Promise<ServerResponse>;
  }
  async GetUser(id?: number): Promise<ServerResponse> {

    const params: HttpParams = new HttpParams().set('userID', (id || -1 ).toString());
    return this.http.get(
      `${ApiRoutes.SERVER_URL}${ApiRoutes.USER_INFO}`,
      {
        params: params
      }
    ).toPromise() as Promise<ServerResponse>;
  }

  // async Logout(): Promise<ServerResponse>{
    // return this.http.get(
      // `${ApiRoutes.SERVER_URL}${ApiRoutes.LOGOUT}`
    // ).toPromise() as Promise<ServerResponse>;
  // }

 // async IsAuth(): Promise<ServerResponse>{
    // return this.http.get(
     // `${ApiRoutes.SERVER_URL}${ApiRoutes.IS_USER_AUTHORISE}`
   // ).toPromise() as Promise<ServerResponse>;
  // }
}
