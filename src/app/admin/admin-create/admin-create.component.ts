import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import {
    FormGroup,
    FormBuilder,
    Validators,
    FormControl
} from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { data } from 'jquery';
import { Student } from 'src/app/core/model/user';
import { LocalUserService } from 'src/app/core/services/local-user.service';
import { SchoolDetails } from 'src/app/school/model';
import { SchoolService } from 'src/app/school/school.service';
import { ConfirmedValidator } from 'src/app/core/validators/confirmed.validator';
import { AdminService } from '../admin.service';
import { adminCPasswordLabel, adminCreateTitle, adminEmailLabel, adminMobileNUmber, adminNameLabel, adminPasswordLabel, adminSubmitButton, emailError, pwdConfirmError } from 'src/app/constants';
@Component({
    selector: 'app-admin-create',
    templateUrl: './admin-create.component.html',
    styleUrls: ['./admin-create.component.css']
})
export class AdminCreateComponent implements OnInit {
    adminCreateTitle: string
    adminNameLabel: string
    adminEmailLabel: string
    adminPasswordLabel: string
    adminCPasswordLabel: string
    adminMobileNUmber: string
    adminSubmitButton: string
    emailError: string
    pwdConfirmError: string
    adminUserCreateForm: FormGroup;
    adminPersonalDetails: FormGroup;
    subscriptionPlan: number
    role: string = "admin";
    loading: boolean = true;
    flag: boolean = false;

    @Input('schoolId') schoolId: string;
    @Output() refresh_admins: EventEmitter<boolean> = new EventEmitter();

    constructor(private fb: FormBuilder,
        private adminService: AdminService,
        private router: Router,
        private matSnackBar: MatSnackBar, private localUserService: LocalUserService, private schoolService: SchoolService) {
        this.adminCreateTitle = adminCreateTitle
        this.adminNameLabel = adminNameLabel
        this.adminEmailLabel = adminEmailLabel
        this.adminPasswordLabel = adminPasswordLabel
        this.adminCPasswordLabel = adminCPasswordLabel
        this.adminMobileNUmber = adminMobileNUmber
        this.adminSubmitButton = adminSubmitButton
        this.emailError = emailError
        this.pwdConfirmError = pwdConfirmError
    }
    ngOnInit(): void {
        this.schoolService.getSingleSchoolDetails(this.schoolId).subscribe(data => {
            this.subscriptionPlan = data.subscriptionPlan
        })
        this.initForm();
    }



    onSubmit() {
        this.flag = true

        const admin = this.adminUserCreateForm.value;
        admin.belongs_to_school = this.schoolId;
        admin.role = this.role;
        admin.subscriptionPlan = this.subscriptionPlan
        if (this.adminUserCreateForm.valid) {
            console.log(admin);

            this.adminService.createAdminUser(admin).subscribe(data => {

                if (data._id) {
                    this.refresh_admins.emit(true);
                    this.matSnackBar.open("Admin User create", "success", { duration: 2000 })
                    this.reset();
                    this.flag = false

                    // this.router.navigate(['livequiz/settings/page']);


                } else {

                    this.matSnackBar.open("Something wrong", "failed", { duration: 2000 })
                }
            })
        } else {
            this.matSnackBar.open("Fill all fields", "failed", { duration: 2000 })

        }

        // this.router.navigate([''])

    }


    private initForm() {
        this.adminUserCreateForm = this.fb.group({
            name: ['', [Validators.required]],
            email: ['', [Validators.required, Validators.email, Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$')]],
            password: ['', [Validators.required]],
            confirm_password: ['', [Validators.required]],
            role: [''],
            subscriptionPlan: [''],
            belongs_to_school: [''],
            _admin: this.fb.group({
                mobile_number: ['', [Validators.required, Validators.pattern("^((\\+91-?)|0)?[0-9]{10}$")]],

            })
        },

            {
                validator: ConfirmedValidator('password', 'confirm_password')
            },
        )
        // this.adminUserCreateForm.get('email').valueChanges.subscribe(event => {
        //     this.adminUserCreateForm.get('email').setValue(event.toLowerCase(), { emitEvent: false });
        // })
    }
    // getting form controls for validation
    get f() {
        return this.adminUserCreateForm.controls;
    }
    get s() {
        return this.adminUserCreateForm['controls']._teacher['controls'];
    }
    // input eye for pwd and c_pwd
    p_hide: boolean = true;
    cp_hide: boolean = true;
    passwordEye() {
        this.p_hide = !this.p_hide;
    }
    confirmpasswordEye() {
        this.cp_hide = !this.cp_hide;
    }

    reset() {
        this.adminUserCreateForm.reset();
    }
}
