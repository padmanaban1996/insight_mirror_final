import { HttpEvent, HttpHandler, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { Observable } from 'rxjs';
import { JwtService } from './jwt.service';

@Injectable({
  providedIn: 'root'
})
export class HttpInterceptorService {


  constructor(private jwtService: JwtService, private cookieService: CookieService) { }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const headerConfig = {
      'Content-Type': 'application/json',
      'Accept': 'application/json'
    }
    const token = this.cookieService.get('jwt_token');
    if (token) {
      headerConfig['Authorization'] = `bearer ${token}`
    }
    const _req = req.clone({ setHeaders: headerConfig });
    return next.handle(_req);
  }
}
