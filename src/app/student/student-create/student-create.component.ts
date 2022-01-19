import { Component, OnInit } from '@angular/core';
import {
  FormGroup,
  FormBuilder,
  Validators,
  FormControl
} from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { ClassesServiceService } from 'src/app/classes/classes-service.service';
import { EachClass } from 'src/app/classes/model';
import { emailError, parentEmailLabel, parentPhoneNumberLabel, pwdConfirmError, studentClassLabel, studentCPasswordLabel, studentCreateTitle, studentEmailLabel, studentNameLabel, studentPasswordLabel, studentSubmitButton } from 'src/app/constants';
import { Student, User } from 'src/app/core/model/user';
import { LocalUserService } from 'src/app/core/services/local-user.service';
import { ConfirmedValidator } from 'src/app/core/validators/confirmed.validator';
import { StudentCreate } from '../model/student';
import { StudentService } from '../student.service';
@Component({
  selector: 'app-student-create',
  templateUrl: './student-create.component.html',
  styleUrls: ['./student-create.component.css']
})
export class StudentCreateComponent implements OnInit {
  studentCreateTitle: string
  pwdConfirmError: string
  emailError: string
  studentNameLabel: string
  studentEmailLabel: string
  studentPasswordLabel: string
  studentCPasswordLabel: string
  parentPhoneNumberLabel: string
  studentClassLabel: string
  parentEmailLabel: string
  studentSubmitButton: string

  studentcreateform: FormGroup;
  role: string;
  classSelected: string;
  classesList: Observable<EachClass[]>;
  loading: boolean = true;
  schoolId: string;
  subscriptionPlan: number;
  flag: boolean = false;

  constructor(private formBuilder: FormBuilder,
    private localUserService: LocalUserService,
    public studentservice: StudentService,
    private classesService: ClassesServiceService,
    private matSnackBar: MatSnackBar,
    private router: Router,
  ) {
    this.role = "student";
    this.schoolId = this.localUserService.getUser().belongs_to_school;
    this.subscriptionPlan = this.localUserService.getUser().subscriptionPlan

    this.studentCreateTitle = studentCreateTitle
    this.pwdConfirmError = pwdConfirmError
    this.emailError = emailError
    this.studentNameLabel = studentNameLabel
    this.studentEmailLabel = studentEmailLabel
    this.studentPasswordLabel = studentPasswordLabel
    this.studentCPasswordLabel = studentCPasswordLabel
    this.parentPhoneNumberLabel = parentPhoneNumberLabel
    this.studentClassLabel = studentClassLabel
    this.parentEmailLabel = parentEmailLabel
    this.studentSubmitButton = studentSubmitButton
  }

  ngOnInit(): void {
    this.classesList = this.classesService.getClassesOfoneSchool(this.schoolId);
    this.initForm();

  }

  private initForm() {
    this.studentcreateform = this.formBuilder.group({
      name: ['', Validators.required,],
      email: ['', [Validators.required, Validators.email, Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$')]],
      password: ['', [Validators.required]],
      confirm_password: ['', [Validators.required]],
      belongs_to_school: [''], //value not from the form
      subscriptionPlan: [''],
      _student: this.formBuilder.group({
        belongs_to_class_id: [''],
        parent_email_id: ['', [Validators.required, Validators.email, Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$')]],
        parent_mobile_number: ['', [Validators.required, Validators.pattern("^((\\+91-?)|0)?[0-9]{10}$")]]
      })

    },
      {

        validator: ConfirmedValidator('password', 'confirm_password')

      });
    this.studentcreateform.get('email').valueChanges.subscribe(event => {
      this.studentcreateform.get('email').setValue(event.toLowerCase(), { emitEvent: false });
    })
  }
  get f() {
    return this.studentcreateform.controls;

  }
  get s() {
    return this.studentcreateform['controls']._student['controls'];
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
  onSubmit() {
    this.flag = true
    const student: StudentCreate = this.studentcreateform.value;
    student.role = this.role;
    student.belongs_to_school = this.schoolId;
    student._student.belongs_to_class_id = this.classSelected
    student.subscriptionPlan = this.subscriptionPlan



    this.studentservice.createStudent(student).subscribe(
      data => {
        if (data._id) {
          this.matSnackBar.open("Student  create", "success", { duration: 2000 })
          this.reset();
          this.flag = false;
          this.router.navigate(['livequiz/settings/page/student/list']);
        } else {
          this.matSnackBar.open("Something wrong", "failed", { duration: 2000 })
        }
      }
    )
  }



  reset() {
    this.studentcreateform.reset();
  }

}
