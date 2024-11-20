import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class LoginService {

   url = 'http://localhost:8080/auth/';
  constructor(private http: HttpClient) { }

  login(credentials: { username: string; password: string }): Observable<any>{
    const headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });
    return this.http.post(this.url + 'users/login', credentials, {headers});
  }

  getUser(email: string){
    const headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });
    return this.http.get(this.url + 'users/get-user?email='+ email, {headers});
  }

  updateUser(credentials: {username: string, name: string, id: string, password: string}): Observable<any>{
    const headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });
    return this.http.put(this.url + 'users/update', credentials, {headers});
  }

  updatePassword(credentials: {username: string, currentPassword: string, password: string, confirmPassword: string}): Observable<any>{
    const headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });
    return this.http.put(this.url + 'users/update-password', credentials, {headers});
  }
}
