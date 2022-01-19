import { Injectable } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';

@Injectable({
  providedIn: 'root'
})
export class JwtService {
  token_key: string = 'jwt_token';
  constructor(private cookieService: CookieService) { }

  setToken(token: string) {
    window.localStorage.setItem(this.token_key, token);
  }
  setSessionToken(token: string) {
    window.sessionStorage.setItem(this.token_key, token);
  }
  getToken() {
    return window.localStorage.getItem(this.token_key);
  }

  destroyToken() {
    localStorage.removeItem(this.token_key);
    localStorage.clear()
    sessionStorage.removeItem(this.token_key);
    this.cookieService.delete("jwt_token");
  }

}
