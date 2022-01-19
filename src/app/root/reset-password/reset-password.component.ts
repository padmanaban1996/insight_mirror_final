import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from 'src/app/core/services/auth.service';
import jwt_decode from 'jwt-decode';
import { ConfirmedValidator } from 'src/app/core/validators/confirmed.validator';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.css']
})
export class ResetPasswordComponent implements OnInit {
  passwordResetForm: FormGroup
  private token = '';
  isloading = false;
  userId: string = ''
  constructor(
    private authService: AuthService,
    private snackbar: MatSnackBar,
    public router: Router,
    private route: ActivatedRoute,
    private fb: FormBuilder

  ) { }

  ngOnInit() {
    this.init();
    this.token = this.route.snapshot.params['token'];
  }
  ngAfterViewInit() {
    const decodedJwt: any = jwt_decode(this.token)
    this.userId = decodedJwt.id;
    console.log("user id is", this.userId);


  }

  onSubmit() {
    let pwd = this.passwordResetForm.controls.pwd.value;
    this.isloading = true;
    this.authService.resetPasswordSave({ token: this.token, pwd, id: this.userId }).subscribe(
      data => {
        this.isloading = false;
        this.snackbar.open('Updated Successfuly', 'success', { duration: 3000 });
        this.router.navigate(['/login']);

      },
      //error handle like this
      // data.status for  each print appropriate message
      err => {
        this.isloading = false;
        this.snackbar.open('Failed. Not updated', 'failed', { duration: 3000 });
      }
    )
  }


  private init() {
    this.passwordResetForm = this.fb.group({
      pwd: ['', Validators.required],
      confirmpwd: ['', Validators.required]
    },
      {
        validator: ConfirmedValidator('pwd', 'confirmpwd')
      }
    )
  }
  get f() {
    return this.passwordResetForm.controls;

  }
  p_hide: boolean = true;
  cp_hide: boolean = true;
  passwordEye() {
    this.p_hide = !this.p_hide;
  }
  confirmpasswordEye() {
    this.cp_hide = !this.cp_hide;
  }
}
