import { ChangeDetectorRef, Component, OnInit, ViewEncapsulation } from '@angular/core';
import { ActivatedRoute, Router, RouterLinkActive, Routes } from '@angular/router';
import { User } from '../core/model/user';
import { JwtService } from '../core/services/jwt.service';
import { LocalUserService } from '../core/services/local-user.service';
import { SchoolService } from '../school/school.service';

// view encapsulation will remove the default styling of tab and custom styles are added in local style
@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class SettingsComponent implements OnInit {
  isViewInitialized = false;
  loggedInUser: User;
  role: string;

  navLinks = [];

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private changeDetector: ChangeDetectorRef,
    private localService: LocalUserService,
    private schoolService: SchoolService,
    private jwtService: JwtService,
  ) {
    this.loggedInUser = this.localService.getUser();
    this.role = this.loggedInUser.role;
  }

  ngOnInit() {
    this.navLinks = (
      this.route.routeConfig && this.route.routeConfig.children ?
        this.buildNavItems(this.route.routeConfig.children) :
        []
    );
  }

  ngAfterViewInit() {
    this.isViewInitialized = true;
    this.changeDetector.detectChanges();
    // (<HTMLElement>document.querySelector('.mat-tab-link:last-child')).style.display = 'none';
  }

  buildNavItems(routes: Routes) {

    return (routes)
      .filter(route => route.data)
      .map(({ path = '', data }) => ({
        path: path,
        label: data.label,
        icon: data.icon
      }));

  }


  // isLinkActive(rla: RouterLinkActive): boolean {
  //   const routerLink = rla.linksWithHrefs.first;
  //   return this.router.isActive(routerLink.urlTree, false);
  // }

}
