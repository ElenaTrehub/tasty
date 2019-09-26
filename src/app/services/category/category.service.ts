import { Injectable } from '@angular/core';
import {ServerResponse} from '../../models/ServerResponse';
import {HttpClient, HttpParams} from '@angular/common/http';
import {ApiRoutes} from '../../models/ApiRoutes';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  constructor(private http: HttpClient) { }

  async getCategories(): Promise<ServerResponse>{

    return this.http.get(`${ApiRoutes.SERVER_URL}${ApiRoutes.CATEGORIES_LIST}`
    ).toPromise() as Promise<ServerResponse>;
  }

  async getCategoryByID(id: number): Promise<ServerResponse>{

    return this.http.get(`${ApiRoutes.SERVER_URL}${ApiRoutes.GET_CATEGORY_BY_ID}${id}`
      ).toPromise() as Promise<ServerResponse>;
  }
}
