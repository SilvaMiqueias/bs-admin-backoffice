import {Injectable} from '@angular/core';
import {HttpClient, HttpParams} from "@angular/common/http";
import {Observable} from "rxjs";
import {PageAuthor} from "../page-author";

@Injectable({
  providedIn: 'root'
})
export class AuthorService {

  url = 'http://localhost:8080/report/author/';

  constructor(private http: HttpClient) { }

  findAllByPage(search: string, page: number, size: number): Observable<PageAuthor>{
    let params = new HttpParams()
      .set('search', search)
      .set('page', page.toString())
      .set('size', size.toString());

    return this.http.get<PageAuthor>(this.url + 'find-all-by-page', {params});
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
}
