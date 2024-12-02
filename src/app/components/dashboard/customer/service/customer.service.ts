import {Injectable} from '@angular/core';
import {HttpClient, HttpParams} from "@angular/common/http";
import {Observable} from "rxjs";
import {PageCustomer} from "../page.customer";

@Injectable({
  providedIn: 'root'
})
export class CustomerService {

  url = 'http://localhost:8080/report/auth/customer/';


  constructor(private http: HttpClient) { }

  findAllByPage(search: string, page: number, size: number): Observable<PageCustomer>{
    let params = new HttpParams()
      .set('search', search)
      .set('page', page.toString())
      .set('size', size.toString());

    return this.http.get<PageCustomer>(this.url + 'find-all-by-page', {params});
  }
}
