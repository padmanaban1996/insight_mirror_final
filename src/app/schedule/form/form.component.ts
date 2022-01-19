import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ScheduleService } from '../schedule.service';
import { Student, User } from 'src/app/core/model/user';
import { UserService } from 'src/app/core/services/user.service';
import { Observable, Subject } from 'rxjs';
import { LocalUserService } from 'src/app/core/services/local-user.service';
import { JwtService } from 'src/app/core/services/jwt.service';
import { environment } from 'src/environments/environment';
import { NgbTimeStruct } from '@ng-bootstrap/ng-bootstrap';
import { MatChipList } from '@angular/material/chips';
import { EachClass, EachClassStudent } from 'src/app/classes/model';
import { ClassesServiceService } from 'src/app/classes/classes-service.service';
import { SchoolService } from 'src/app/school/school.service';
import { SchoolDetails } from 'src/app/school/model';
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
import { ScheduleCreate } from '../model/schedule';
import { AmazingTimePickerService } from 'amazing-time-picker';
import * as _moment from "moment";
import { MatSnackBar } from '@angular/material/snack-bar';
import { addParticipentsLabel, dateLabel, endTimeLabel, meetNameLabel, meetNamePlaceholder, scheduleCreateButton, scheduleCreateError, scheduleCreateTitle, startTimeLabel, SubjectsSelectLabel, subjectsSelectPlaceholder } from 'src/app/constants';
import { CookieService } from 'ngx-cookie-service';
const moment = _moment;


@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css']
})


export class FormComponent implements OnInit {
  scheduleCreateTitle: string
  scheduleCreateError: string
  meetNameLabel: string
  meetNamePlaceholder: string
  SubjectsSelectLabel: string
  subjectsSelectPlaceholder: string
  addParticipentsLabel: string
  dateLabel: string
  startTimeLabel: string
  endTimeLabel: string
  scheduleCreateButton: string

  createScheduleForm: FormGroup;

  participantsSelected: EachClassStudent[] = [];
  loggedInUser: User;
  roomUrl: string;
  val: string;

  submitted: boolean = false;
  showMsg: boolean = false;
  useSchool: SchoolDetails;
  starts_at_formated = new Date();
  starts_at_time;
  ends_at_time;
  @ViewChild('chipList')
  chipList: MatChipList;
  classesIdList: string[];
  classesList: EachClass[] = [];
  classCheck: boolean[] = [];

  subjectList: string[] = [];
  subjectsSelected: string;
  dt;
  today;
  flag: boolean = false;
  starts_at_time2: string;
  ends_at_time2: string
  greater: boolean = false;


  constructor(private fb: FormBuilder,
    private localUserService: LocalUserService,
    private userServcice: UserService,
    private schoolService: SchoolService,
    private atp: AmazingTimePickerService,
    private jwtService: JwtService,
    private scheduleservice: ScheduleService,
    private classesService: ClassesServiceService,
    private matSnackBar: MatSnackBar,
    private router: Router,
    private cookieService: CookieService) {
    this.loggedInUser = this.localUserService.getUser();
    this.subjectList = this.loggedInUser._teacher.subjects;
    this.val = this.cookieService.get('jwt_token');;
    this.classesIdList = this.localUserService.getUser()._teacher.belongs_to_class;

    this.starts_at_time = "10:00";
    this.ends_at_time = "11:00";
    this.starts_at_time2 = "10:00";
    this.ends_at_time2 = "11:00"
    this.dt = new Date();
    this.scheduleCreateTitle = scheduleCreateTitle
    this.scheduleCreateError = scheduleCreateError
    this.meetNameLabel = meetNameLabel
    this.meetNamePlaceholder = meetNamePlaceholder
    this.SubjectsSelectLabel = SubjectsSelectLabel
    this.subjectsSelectPlaceholder = subjectsSelectPlaceholder
    this.addParticipentsLabel = addParticipentsLabel
    this.dateLabel = dateLabel
    this.startTimeLabel = startTimeLabel
    this.endTimeLabel = endTimeLabel
    this.scheduleCreateButton = scheduleCreateButton

  }


  ngOnInit(): void {

    for (const id of this.classesIdList) {
      this.classesService.getOneClassDetailsById(id).subscribe(data => {
        this.classesList.push(data);
        this.classCheck.push(false);
      })
    }
    this.initForm();
    this.today = new Date();
  }
  subjects: any[] = ["Maths", "Chemistry", "Physics", "Biology", "Geography", "Computer", "English", "History"];

  eachClassOnClick() {

  }

  private initForm() {
    this.createScheduleForm = this.fb.group({
      name: ['', Validators.required],
      host_id: [''],
      belongs_to_school: [''],
      subject: [''],
      starts_at: ['', Validators.required],
      ends_at: ['', Validators.required],
      scheduled_date: ['', Validators.required],
      participants: ['']

    });
  }
  get f() {
    return this.createScheduleForm.controls;

  }



  selectedClass(id: string, index: number) {

    this.classCheck[index] = !this.classCheck[index];
    console.log("check value");

    if (this.classCheck[index] == true) {
      console.log("add called");

      this.classesList.forEach(element => {
        if (element._id == id) {
          element.students.forEach(data => {
            const isAvailable = this.participantsSelected.findIndex(e => e.name == data.name)
            if (isAvailable == -1)
              this.participantsSelected.push(data)
          });
        }

      });
    } else {
      console.log("remove called");
      this.classesList[index].students.forEach(element => {
        for (let i = 0; i < this.participantsSelected.length; i++) {
          if (element._id == this.participantsSelected[i]._id) {
            this.participantsSelected.splice(i);
          }
        }

      });
    }

  }

  removeItem(index: number) {
    this.participantsSelected.splice(index, 1);
  }

  onSubmit() {
    this.submitted = true;
    this.flag = true
    if (this.loggedInUser.subscriptionPlan == 1 && this.participantsSelected.length > 60) {
      this.matSnackBar.open("your subscription allows only 60 participants per schedule", "failed", { duration: 2000 })
    } else {

      const schedule: ScheduleCreate = this.createScheduleForm.value;
      let participantIds: string[] = [];
      this.participantsSelected.forEach(element => {
        participantIds.push(element._id);
      });
      schedule.belongs_to_school = this.loggedInUser.belongs_to_school;
      schedule.participants = participantIds;
      schedule.host_id = this.loggedInUser._id;
      schedule.subject = this.subjectsSelected;
      schedule.starts_at = this.starts_at_time;
      schedule.ends_at = this.ends_at_time;
      console.log(schedule);

      this.scheduleservice.createSchedule(schedule).subscribe(
        data => {
          this.router.navigate(['livequiz/schedule/list']);
          console.log(data);

          this.showMsg = true;
          this.resetForm();
          this.flag = false;
        }
      )
    }

  }
  openClock(ev: any, val: number) {
    const amazingTimePicker = this.atp.open();
    amazingTimePicker.afterClose().subscribe(time => {
      console.log(time);

      const dateTime: string = this.dt = moment(new Date).format('MM/DD/YYYY') + " " + time;
      let _time = moment(dateTime).utc();
      let _time2 = moment(dateTime).format('LT');
      _time.format("YYYY-MM-DD HH:mm:ss")
      if (val == 1) {
        this.starts_at_time = _time
        this.starts_at_time2 = _time2;

      } else {
        this.ends_at_time = _time
        this.ends_at_time2 = _time2;
      }
      if (this.ends_at_time < this.starts_at_time) {
        this.greater = true
      } else {
        this.greater = false
      }
    });
  }
  resetForm() {
    this.createScheduleForm.reset()
  }




}
