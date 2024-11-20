import {Injectable} from '@angular/core';
import {jwtDecode} from "jwt-decode";

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor() { }

  setToken(token: string){
      localStorage.setItem('user', token);
      this.getUser();
  }

  getToken(){
    return localStorage.getItem('user');
  }

  isAuthenticated(): boolean{
     const token = this.getToken();
     return !!token;
  }

  logout(): void{
    localStorage.removeItem('user');
  }

  getUser(): any{
    if(this.isAuthenticated()){
       const decode = jwtDecode(this.getToken()!);
       return decode;
    }
  }

}
