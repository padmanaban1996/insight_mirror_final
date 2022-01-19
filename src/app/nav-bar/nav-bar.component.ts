import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { ThemeService } from '../admin-theme/theme.service';
import { Admin } from '../admin/model';
import { User } from '../core/model/user';
import { JwtService } from '../core/services/jwt.service';
import { LocalUserService } from '../core/services/local-user.service';
import { SchoolService } from '../school/school.service';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css']
})
export class NavBarComponent implements OnInit {
  isLoggedIn: boolean;
  jwtToken: string;
  loggedInUser: User;
  role: string;

  //nav item on click routelink
  dashboardRoute: string = '';


  constructor(private localService: LocalUserService, private cookieService: CookieService, private schoolService: SchoolService, private jwtService: JwtService, private router: Router, private themeService: ThemeService) {
    this.loggedInUser = this.localService.getUser();
    this.role = this.loggedInUser.role;
  }

  ngOnInit(): void {
    if(this.role !== "superadmin"){
    this.jwtToken = this.cookieService.get('jwt_token');
    this.schoolService.getSingleSchoolDetails(this.loggedInUser.belongs_to_school)
    if (this.role === 'admin') {
      this.dashboardRoute = 'dashboard/admin'
    }
    }
  }

  logOut() {
    this.jwtService.destroyToken();
    this.localService.destroyUser();
    this.cookieService.delete('jwt_token');
    this.router.navigate(['login']);
  }
  verifyLogin() {
    let loggedId: boolean;
    if (this.jwtToken) {
      loggedId = true;
    }
    loggedId = false;
    return loggedId;
  }
  public get hideDiv(): boolean {
    return this.themeService.hideDiv;
  }
}