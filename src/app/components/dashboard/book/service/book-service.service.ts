import {Injectable} from '@angular/core';
import {HttpClient, HttpParams} from "@angular/common/http";
import {Observable} from "rxjs";
import {Book} from "../book";
import {PageBook} from "../page-book";

@Injectable({
  providedIn: 'root'
})
export class BookService {

  url = 'http://localhost:8080/report/auth/book/';

  constructor(private http: HttpClient) { }

  findAll(): Observable<Book[]>{
    return this.http.get<[]>(this.url + 'find-all')
  }

  findAllByPage(search: string, page: number, size: number): Observable<PageBook>{
    let params = new HttpParams()
      .set('search', search)
      .set('page', page.toString())
      .set('size', size.toString());

    return this.http.get<PageBook>(this.url + 'find-all-by-page', {params});
  }

  findBy(id: string){
    return this.http.get(this.url + 'find-by/' + id);
  }

  create(credentials: Book): Observable<any>{
    return  this.http.post(this.url + 'create', credentials);
  }

  update(credentials: Book){
    return  this.http.put(this.url + 'update', credentials);
  }

  delete(id: string){
    return this.http.delete(this.url + 'delete/' + id);
  }
}
