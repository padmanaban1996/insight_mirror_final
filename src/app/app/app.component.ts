import { Component, Input, OnInit } from '@angular/core';
import { NavigationEnd, NavigationStart, Router } from '@angular/router';
import { JwtService } from '../core/services/jwt.service';
import * as $ from 'jquery';
import { User } from '../core/model/user';
import { LocalUserService } from '../core/services/local-user.service';
import { Route } from '@angular/compiler/src/core';
import { Subscription } from 'rxjs-compat';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  currentRoute: string;
  role: string = '';
  constructor(private localUserService: LocalUserService, private router: Router) {
    this.role = this.localUserService.getUser().role;
    console.log("URL", router.url);
  }



  ngOnInit(): void {
    if (this.role == 'admin') {
      this.router.navigate([''])
    }
    if (this.role == 'superadmin') {
      this.router.navigate(['/superAdmin/school/page'])
    }
  }

}
