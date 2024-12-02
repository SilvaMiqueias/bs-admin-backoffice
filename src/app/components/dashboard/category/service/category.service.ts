import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders, HttpParams} from "@angular/common/http";
import {Observable} from "rxjs";
import {Category} from "../category";
import {PageCategory} from "../page-category";

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  url = 'http://localhost:8080/report/auth/category/';

  constructor(private http: HttpClient) { }

  findAll(): Observable<Category[]>{
    return this.http.get<[]>(this.url + 'find-all')
  }

  findAllByPage(search: string, page: number, size: number): Observable<PageCategory>{
      let params = new HttpParams()
          .set('search', search)
          .set('page', page.toString())
          .set('size', size.toString());

      return this.http.get<PageCategory>(this.url + 'find-all-by-page', {params});
  }

  findBy(id: string){
    return this.http.get(this.url + 'find-by/' + id);
  }

  create(credentials: {name: string, description: string}): Observable<any>{
    return  this.http.post(this.url + 'create', credentials);
  }

  update(credentials: {id: string, name: string, description: string}){
    return  this.http.put(this.url + 'update', credentials);
  }

  delete(id: string){
    return this.http.delete(this.url + 'delete/' + id);
  }

  verifyName(name: string){
    return this.http.get(this.url + 'verify/' + name);
  }

}
