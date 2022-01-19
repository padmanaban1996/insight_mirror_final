import { Component, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { BehaviorSubject, Observable } from 'rxjs';
import { ThemeService } from 'src/app/admin-theme/theme.service';
import { backToLogin, emailLabel, errorAlert, forgotPasswordLabel, passwordLabel, signInButton, title, verifyEmailButton } from 'src/app/constants';
import { AuthService } from 'src/app/core/services/auth.service';
import { JwtService } from 'src/app/core/services/jwt.service';
import { LocalUserService } from 'src/app/core/services/local-user.service';
import { adminDashBoardRouteUrl, scheduleListRouteUrl } from 'src/app/route-urls';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  title: string
  emailLabel: string
  passwordLabel: string
  forgotPasswordLabel: string
  backToLogin: string
  signInButton: string
  verifyEmailButton: string
  errorAlert: string
  rememberMe: boolean;
  @ViewChild('myCanvas')
  myCanvas: ElementRef<HTMLCanvasElement>;

  public context: CanvasRenderingContext2D;

  @Output()
  loggedIn: EventEmitter<boolean> = new EventEmitter<boolean>();
  message: string;
  authLoginForm: FormGroup
  submitted: boolean = false;
  errormessage: boolean;
  forgotPwdLoginValid: boolean = false;
  forgotPwdClicked: boolean = false;
  public loading: boolean;
  constructor(private fb: FormBuilder,
    private localUserService: LocalUserService,
    private router: Router,
    private authService: AuthService,
    private jwtService: JwtService,
    private snackbar: MatSnackBar,
    private themeservice: ThemeService,
    private cookieService: CookieService
  ) {
    this.emailLabel = emailLabel;
    this.title = title;
    this.passwordLabel = passwordLabel;
    this.forgotPasswordLabel = forgotPasswordLabel;
    this.backToLogin = backToLogin;
    this.signInButton = signInButton;
    this.verifyEmailButton = verifyEmailButton;
    this.errorAlert = errorAlert
  }
  ngOnInit(): void {
    this.initForm();
  }
  ngAfterViewInit(): void {
    this.context = this.myCanvas.nativeElement.getContext('2d');
    this.context.fillStyle = '#3a8af6';
    const radius = 100;
    this.context.beginPath();
    this.context.arc(150, 150, radius, 0, 2 * Math.PI, false);
    this.context.fill();
  }
  onSubmit() {
    this.loading = true;
    console.log(this.authLoginForm.value);
    this.submitted = true;
    this.authService.login(this.authLoginForm.value).subscribe(
      data => {
        console.log(data);
        if (this.rememberMe === true) {
          console.log("TRUE called");
          this.localUserService.setUser(data.user);
          this.cookieService.set('jwt_token', data.token);
          this.jwtService.setToken(data.token);
        } else {
          console.log("FALSE called");
          this.localUserService.setUser(data.user);
          this.cookieService.set('jwt_token', data.token);
          this.jwtService.setToken(data.token);
          // this.localUserService.sessionSetUser(data.user);
          // this.cookieService.set('jwt_token', data.token);
          // this.jwtService.setSessionToken(data.token);
        }


        //currently email change to username when the backend returns the value
        const jwt_token = this.cookieService.get('jwt_token');
        const user = {
          schoolId: data.user.belongs_to_school,
          token: jwt_token,
          userId: data.user._id,
          username: data.user.name
        }
        // this.authService.saveUserState(user).subscribe(data => {
        // })
        this.loading = false;
        if (data.user.role == 'admin')
          this.router.navigate(adminDashBoardRouteUrl);
        else
          this.loading = false
        this.router.navigate(scheduleListRouteUrl);
        this.loggedIn.emit(true);
        this.themeservice.gettheme()
      },
      error => {
        this.submitted = false;
        this.loading = false
        this.snackbar.open("Invalid User", "", {
          duration: 1000, verticalPosition: 'top', panelClass: ['red-snackbar']
        });
      },
    )
  }

  forgotPassword() {
    this.forgotPwdClicked = !this.forgotPwdClicked
  }
  sendResetLink() {
    this.loading = true;
    this.authService.forgotPassword({ email: this.f.email.value }).subscribe(data => {
      this.loading = false
      this.snackbar.open("Please check your email.", "Success", { duration: 2000 })
    },
      err => {
        this.loading = false
        this.snackbar.open("Admin User create", "Failed", { duration: 2000 })
      },
    )
  }

  private initForm() {
    this.authLoginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email, Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$')]],
      password: ['', [Validators.required]],
    })
    this.authLoginForm.get('email').valueChanges.subscribe(event => {
      this.authLoginForm.get('email').setValue(event.toLowerCase(), { emitEvent: false });
    });
  }
  get f() {
    return this.authLoginForm.controls;
  }
  // input eye for password and c-password
  p_hide: boolean = true;
  cp_hide: boolean = true;
  passwordEye() {
    this.p_hide = !this.p_hide;
  }
  confirmpasswordEye() {
    this.cp_hide = !this.cp_hide;
  }
}
