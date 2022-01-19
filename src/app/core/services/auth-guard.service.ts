import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { JwtService } from './jwt.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardService {

  constructor(private jwtService: JwtService, public router: Router, private cookieService: CookieService) { }
  canActivate(): boolean {
    if (this.cookieService.get('jwt_token')) {
      return true;
    } else {
      this.router.navigate(['/login']);
      console.warn('You should login to access', 'error', { duration: 3000 });
      return false;
    }
  }
  canActivateChild(): boolean {
    return this.canActivate();
  }
}

