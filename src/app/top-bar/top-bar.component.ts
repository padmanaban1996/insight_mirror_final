import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { ThemeService } from '../admin-theme/theme.service';
import { User } from '../core/model/user';
import { JwtService } from '../core/services/jwt.service';
import { LocalUserService } from '../core/services/local-user.service';
import { SchoolService } from '../school/school.service';

@Component({
  selector: 'app-top-bar',
  templateUrl: './top-bar.component.html',
  styleUrls: ['./top-bar.component.css']
})
export class TopBarComponent implements OnInit {
  isLoggedIn: boolean;
  jwtToken: string;
  loggedInUser: User;
  role: string;
  url: string = null;
  showDiv: boolean = null
  showlModel: boolean;
  userName: string;
  isRunning = true;
  schoolName: string;
  dashboardRoute: string = '';
  shortname: boolean = false;
  email: string;


  constructor(private localService: LocalUserService,
    private schoolService: SchoolService,
    private jwtService: JwtService,
    private router: Router,
    private themeService: ThemeService,
    private cookieService: CookieService
  ) {
    this.loggedInUser = this.localService.getUser();
    this.role = this.loggedInUser.role;
  }

  ngOnInit(): void {
    this.jwtToken = this.cookieService.get('jwt_token');;
    this.userName = this.loggedInUser.name
    this.email = this.loggedInUser.email
    //convert the below as observable and use async pipe in template to load the data
    if(this.role !== "superadmin"){
    this.schoolService.getSingleSchoolDetails(this.loggedInUser.belongs_to_school).subscribe(data => {
      this.schoolName = data.name;
      this.url = data.logoUrl;
      if (this.role === 'admin') {
        this.dashboardRoute = 'dashboard/admin'
      }
      if (this.schoolName.length > 20) {
        this.shortname = true
      }
      else {
        this.shortname = false
      }

    });
  }

  }
  opensideNav() {
    this.showDiv = true

  }
  logOut() {
    this.jwtService.destroyToken();
    this.localService.destroyUser();
    this.router.navigate(['login']);
    window.location.reload();

  }
  verifyLogin() {
    let loggedId: boolean;
    if (this.jwtToken) {
      loggedId = true;
    }
    loggedId = false;
    return loggedId;
  }

  pauseClick() {
    this.isRunning = false;
  }
  restartClick() {
    this.isRunning = true;
  }
  public get hideDiv(): boolean {
    return this.themeService.hideDiv;
  }
}



