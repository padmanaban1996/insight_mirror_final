import { Route } from '@angular/compiler/src/core';
import { Component, OnInit } from '@angular/core';
import {
  FormGroup,
  FormBuilder,
  Validators,
  FormControl
} from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { data } from 'jquery';
import { Observable } from 'rxjs';
import { ClassesServiceService } from 'src/app/classes/classes-service.service';
import { EachClass } from 'src/app/classes/model';
import { classTeacherofLabel, emailError, pwdConfirmError, subjectsLabel, subjectsPlaceHolder, teacherClassesPlaceholder, teacherClassLabel, teacherCPasswordLabel, teacherCreateTitle, teacherEmailLabel, teacherMobileNUmber, teacherNameLabel, teacherPasswordLabel, teacherSubmitButton } from 'src/app/constants';
import { User } from 'src/app/core/model/user';
import { LocalUserService } from 'src/app/core/services/local-user.service';
import { ConfirmedValidator } from 'src/app/core/validators/confirmed.validator';
import { SchoolService } from 'src/app/school/school.service';
import { TeacherService } from '../teacher.service';
@Component({
  selector: 'app-teacher-create',
  templateUrl: './teacher-create.component.html',
  styleUrls: ['./teacher-create.component.css']
})
export class teacherCreateComponent implements OnInit {
  teacherCreateTitle: string
  teacherNameLabel: string
  teacherEmailLabel: string
  teacherPasswordLabel: string
  teacherCPasswordLabel: string
  teacherClassLabel: string
  teacherClassesPlaceholder: string
  classTeacherofLabel: string
  subjectsLabel: string
  subjectsPlaceHolder: string
  teacherMobileNUmber: string
  teacherSubmitButton: string
  emailError: string
  pwdConfirmError: string

  teachercreateform: FormGroup;
  role: string;
  schoolId: string;
  classesList = [] as EachClass[];
  classTeacherRequired = [] as EachClass[]
  subjectsList: string[];
  classesSelected: string[] = [];
  subjectsSelected: string[] = []
  subscriptionPlan: number
  classTeacherOfClassSelected: string;
  selected_Id: string = '';
  options: boolean = false;
  flag: boolean = false;

  constructor(private formBuilder: FormBuilder,
    private localUserService: LocalUserService,
    private classesServie: ClassesServiceService,
    public teacherService: TeacherService,
    private matSnackBar: MatSnackBar,
    private schoolService: SchoolService,
    private router: Router,
  ) {
    this.role = "teacher";
    this.schoolId = this.localUserService.getUser().belongs_to_school;
    this.schoolService.getSingleSchoolDetails(this.schoolId).subscribe(data => {
      this.subjectsList = data.subjects;
      this.subscriptionPlan = this.localUserService.getUser().subscriptionPlan
    })
    this.options = false;

    this.teacherCreateTitle = teacherCreateTitle
    this.teacherNameLabel = teacherNameLabel
    this.teacherEmailLabel = teacherEmailLabel
    this.teacherPasswordLabel = teacherPasswordLabel
    this.teacherCPasswordLabel = teacherCPasswordLabel
    this.teacherClassLabel = teacherClassLabel
    this.teacherClassesPlaceholder = teacherClassesPlaceholder
    this.classTeacherofLabel = classTeacherofLabel
    this.subjectsLabel = subjectsLabel
    this.subjectsPlaceHolder = subjectsPlaceHolder
    this.teacherMobileNUmber = teacherMobileNUmber
    this.teacherSubmitButton = teacherSubmitButton
    this.emailError = emailError
    this.pwdConfirmError = pwdConfirmError
  }

  ngOnInit(): void {
    this.initForm();
    // write api after wards which returns only the classes with no class teachers
    this.classesServie.getClassesOfoneSchool(this.schoolId).subscribe(
      data => {
        this.classesList = data
        data.forEach(element => {
          if (element.classTeacher == null) {
            this.classTeacherRequired.push(element)
          }
        });
      }
    );
  }
  subjects: any[] = ["Maths", "Chemistry", "Physics", "Biology", "Geography", "Computer", "English", "History"];

  private initForm() {
    this.teachercreateform = this.formBuilder.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email, Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$')]],
      password: ['', [Validators.required]],
      confirm_password: ['', [Validators.required]],
      belongs_to_school: [''],
      subscriptionPlan: [''],
      _teacher: this.formBuilder.group({
        belongs_to_class: [''],
        subjects: [''],
        is_class_teacher: [''],
        class_teacher_of: [''],
        mobile_number: ['', [Validators.required, Validators.pattern("^((\\+91-?)|0)?[0-9]{10}$")]],
      })

    },
      {

        validator: ConfirmedValidator('password', 'confirm_password')

      });
    this.teachercreateform.get('email').valueChanges.subscribe(event => {
      this.teachercreateform.get('email').setValue(event.toLowerCase(), { emitEvent: false });
    });
  }
  // getting form controls for validation
  get f() {
    return this.teachercreateform.controls;
  }
  get s() {
    return this.teachercreateform['controls']._teacher['controls'];
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

  onSubmit() {
    this.flag = true;
    const teacher: User = this.teachercreateform.value;
    teacher.role = this.role;
    teacher.belongs_to_school = this.schoolId;
    teacher._teacher.belongs_to_class = this.classesSelected;
    teacher._teacher.is_class_teacher = this.options;
    teacher._teacher.is_class_teacher = this.options;
    teacher._teacher.subjects = this.subjectsSelected;
    teacher.subscriptionPlan = this.subscriptionPlan
    if (this.options) {
      teacher._teacher.class_teacher_of = this.classTeacherOfClassSelected;
    } else {
      teacher._teacher.class_teacher_of = null;
    }



    this.teacherService.createTeacherUser(teacher).subscribe(
      data => {
        if (data._id) {
          this.matSnackBar.open("Teacher  create", "success", { duration: 2000 })
          this.reset();
          this.flag = false;
          this.router.navigate(['livequiz/settings/page/teacher/list']);
        } else {
          this.matSnackBar.open("Something wrong", "failed", { duration: 2000 })
        }
      }
    )
  }



  reset() {
    this.teachercreateform.reset();
  }
}
