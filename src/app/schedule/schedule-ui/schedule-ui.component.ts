import { Content } from '@angular/compiler/src/render3/r3_ast';
import { ApplicationRef, Component, OnInit, OnDestroy, HostListener, Input, ChangeDetectorRef, Output, EventEmitter, ViewChild, ElementRef } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { DatatableComponent } from '@swimlane/ngx-datatable';
import { Observable } from 'rxjs';
import { Joinclass, matToggleLabel1, matToggleLabel2, matToggleLabel3, scheduleAddButton, scheduleError, schedulePageTitle, scheduleTimeLabel, start, subjectFilterPlaceholder, summary, teacherFilterPlaceholder } from 'src/app/constants';
import { User } from 'src/app/core/model/user';
import { AuthService } from 'src/app/core/services/auth.service';
import { JwtService } from 'src/app/core/services/jwt.service';
import { LocalUserService } from 'src/app/core/services/local-user.service';
import { UserService } from 'src/app/core/services/user.service';
import { Quiz } from 'src/app/quiz/model/quiz';
import { QuizService } from 'src/app/quiz/quiz.service';
import { SchoolService } from 'src/app/school/school.service';
import { Subject } from 'src/app/subjects/model';
import { Schedule } from '../model/schedule';
import { ScheduleService } from '../schedule.service';

@Component({
  selector: 'app-schedule-ui',
  templateUrl: './schedule-ui.component.html',
  styleUrls: ['./schedule-ui.component.css']
})
export class ScheduleUiComponent implements OnInit {
  scheduleError: string
  schedulePageTitle: string
  matToggleLabel1: string
  matToggleLabel2: string
  matToggleLabel3: string
  scheduleAddButton: string
  teacherFilterPlaceholder: string
  subjectFilterPlaceholder: string
  scheduleTimeLabel: string
  Joinclass: string
  summary: string
  start: string

  roomUrl: string;
  showDiv: Array<boolean> = [];
  schedulePaginated: Observable<Schedule[]>;
  scheduleList: Schedule[] = [];
  allScheduleList: Schedule[] = [];
  filteredScheduleList: Schedule[] = [];
  allQuizList: Quiz[] = [];
  filteredQuizList: Quiz[] = [];
  quizLength: number = null
  scheduleLength: number = null;
  meetName: string;
  startTime: number;
  endTime: number;
  studentId: string;
  role: string;
  user: User;
  users: User[];
  type: string = null;
  allTeachersList: User[];
  allSubject: string[];
  subject: string = null;
  teacherSelected: string = null;
  name: string;
  loading: boolean = true;
  date;
  isClosed: boolean;
  scheduleselected: Schedule;
  id: number;
  initialCall: boolean = false;
  intervalId: number;
  timer: NodeJS.Timeout
  browserRefresh: any;
  rows = [];
  temp = [];
  @ViewChild(DatatableComponent) public table: DatatableComponent;
  @ViewChild('myCanvas')
  myCanvas: ElementRef<HTMLCanvasElement>;

  public context: CanvasRenderingContext2D;
  participant: any[] = [];
  // selected = [false, false, false];
  constructor(private localUserStorage: LocalUserService,
    private userService: UserService,
    private authApi: AuthService,
    private localService: LocalUserService,
    private scheduleService: ScheduleService,
    private jwtService: JwtService,
    private schoolService: SchoolService,
    private modelService: NgbModal,
    private router: Router,
    private appRef: ApplicationRef,
    private cd: ChangeDetectorRef,
    private quizService: QuizService
  ) {
    this.user = this.localUserStorage.getUser();
    this.studentId = this.user._id;
    this.role = this.user.role;
    this.date = Date.now();
    this.type = '2';

    if (this.role !== "superadmin") {
      this.schoolService.getSingleSchoolDetails(this.user.belongs_to_school).subscribe(data => {
        this.allSubject = data.subjects
      })
    }

    this.scheduleError = scheduleError
    this.schedulePageTitle = schedulePageTitle
    this.matToggleLabel1 = matToggleLabel1
    this.matToggleLabel2 = matToggleLabel2
    this.matToggleLabel3 = matToggleLabel3
    this.scheduleAddButton = scheduleAddButton
    this.teacherFilterPlaceholder = teacherFilterPlaceholder
    this.subjectFilterPlaceholder = subjectFilterPlaceholder
    this.scheduleTimeLabel = scheduleTimeLabel
    this.Joinclass = Joinclass
    this.summary = summary
    this.start = start

  }
  @HostListener('window:focus', ['$event'])
  onFocus(event: any): void {
    this.refreshData();
  }

  @HostListener('window:blur', ['$event'])
  onBlur(event: any): void {

    clearInterval(this.timer)


  }


  ngAfterViewInit(): void {
    const user = this.localService.getUser()
    const jwt_token = localStorage.getItem('jwt_token')

    // this.authApi.getUserState(user._id).subscribe(data => {
    //   console.log("user state data", data.token);
    //   if (jwt_token != data.token) {
    //     this.jwtService.destroyToken();
    //     this.localService.destroyUser();
    //     this.router.navigate(['login']);
    //     location.reload();

    //   }
    // })
  }

  ngOnInit(): void {
    if (this.user.role !== "superadmin") {
      this.userService.getAllUsers(this.user.belongs_to_school).subscribe((data) => {
        this.users = data;
        this.allTeachersList = data.filter(item => item.role == "teacher");
        this.loading = true;
      });
      this.getData();
      this.cd.detectChanges();
      this.refreshData();
    }
  }
  refreshData() {
    this.timer = setInterval(() => {
      this.getData();
      this.ngAfterViewInit()
    }, 3000);
  }
  getData() {
    if (this.user.role !== "superadmin") {
      this.scheduleService.getSchedules(this.user.belongs_to_school, this.user._id).subscribe((data) => {
        this.allScheduleList = data.reverse();
        this.scheduleLength = data.length;
        this.initialCall = true;
        this.filterList();
      });
    }
    // if (this.user.role === 'teacher') {
    //   this.quizService.getQuizByTeacher(this.user._id).subscribe(data => {
    //     this.allQuizList = data.reverse();
    //     this.quizLength = data.length;
    //     this.initialCall = true;
    //     this.filterList();
    //   })
    // }
    // if (this.user.role === 'student') {
    //   this.quizService.getQuizByStudent(this.user._id).subscribe(data => {
    //     this.allQuizList = data.reverse();
    //     for (let index = 0; index < this.allQuizList.length; index++) {
    //       this.allQuizList[index].participant = []
    //       const participant = this.allQuizList[index].participants.filter(item => item.studentId === this.user._id);
    //       participant.forEach(element => {
    //         this.allQuizList[index].participant.push(element)
    //       });
    //     }
    //     console.log(this.allQuizList);

    //     this.quizLength = data.length;
    //     this.initialCall = true;
    //     this.filterList();
    //   })
    // }
  }
  ngOnDestroy() {
    clearInterval(this.timer);
  }

  filterList() {
    this.filteredScheduleList = this.allScheduleList;
    this.filteredQuizList = this.allQuizList;
    if (this.type !== null) {
      switch (this.type) {
        case "1": {
          this.filteredScheduleList = this.filteredScheduleList;
          this.filteredQuizList = this.allQuizList.filter(item => item.scheduled === true);
          this.temp = [...this.filteredScheduleList];
          this.temp = [...this.filteredQuizList];
          break;
        }
        case "2": {
          this.filteredScheduleList = this.filteredScheduleList.filter(item => item.sesssion_ended === false)
          this.filteredQuizList = this.filteredQuizList.filter(item => item.session_ended === false && item.scheduled === true)
          this.temp = [...this.filteredScheduleList];
          this.temp = [...this.filteredQuizList]
          break;
        }
        case "3": {
          this.filteredScheduleList = this.filteredScheduleList.filter(item => item.sesssion_ended === true)
          this.filteredQuizList = this.filteredQuizList.filter(item => item.session_ended === true)
          this.temp = [...this.filteredScheduleList];
          this.temp = [...this.filteredQuizList]
          break;
        }
        default: {
          this.filteredScheduleList = this.filteredScheduleList.filter(item => item.sesssion_ended === false)
          this.filteredQuizList = this.filteredQuizList.filter(item => item.session_ended === false)
          this.temp = [...this.filteredScheduleList];
          this.temp = [...this.filteredQuizList]
          break;
        }
      }
    }

    if (this.teacherSelected !== null) {
      this.filteredScheduleList = this.filteredScheduleList.filter(item => item.host_id == this.teacherSelected);
    }
    this.scheduleLength = this.filteredScheduleList.length;
    this.quizLength = this.filteredQuizList.length;
  }
  updateFilter(event) {
    const val = event.target.value.toLowerCase();
    const temp = this.temp.filter(function (d) {
      return d.name.toLowerCase().indexOf(val) !== -1 || !val;
    });
    this.filteredScheduleList = temp;
  }
  openAddNewSchedule() {
    this.router.navigate(['livequiz', 'schedule', 'create']);
  }
  startClass(schedule: Schedule) {
    this.router.navigate(['liveclass'], { state: { schedule: schedule } });
  }
  openQuizResults(quiz: Quiz) {
    if (this.user.role == 'student') {
      this.router.navigate(['livequiz/quiz/student_result/', quiz._id, this.user._id])
    }
    if (this.user.role == 'teacher') {
      this.router.navigate(['livequiz/quiz/result'], { state: { quiz: quiz }, skipLocationChange: true },);
    }

  }

  startQuiztoStudent(quiz) {
    this.router.navigate(['test'], { state: { quiz: quiz, reattempt: false }, skipLocationChange: true });
  }
  delete(id: string) {
    this.scheduleService.deleteOneSchedule(id).subscribe(data => {
    })
  }
  open(schedule: Schedule) {
    this.scheduleselected = schedule
    this.router.navigate(['livequiz/schedule/attendence'], { state: { scheduleselected: schedule }, skipLocationChange: true });
    this.appRef.tick();
  }

}
