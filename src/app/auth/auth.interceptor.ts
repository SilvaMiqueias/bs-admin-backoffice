import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';
import {AuthService} from "./auth.service";
import {jwtDecode} from "jwt-decode/build/esm";
import {ToastrService} from "ngx-toastr";
import {Router} from "@angular/router";

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor(private router: Router, private authService: AuthService, private toastrService: ToastrService) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {

    const token = this.authService.getToken();
    if(token){
      const exp = this.authService.getUser().exp;
      const currentTime = Math.floor(Date.now() / 1000)
      if(currentTime < exp){
        const cloned = request.clone({
          setHeaders: {
            Authorization: `Bearer ${token}`,
            ContentType: 'application/json'
          }
        });
        return next.handle(cloned);
      }else{
        localStorage.removeItem('user');
        this.toastrService.error('Token expirado!');
        this.router.navigate(['/login']);
      }

    }
    return next.handle(request);
  }
}
