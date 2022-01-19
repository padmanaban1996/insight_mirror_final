import { LogicalFileSystem } from '@angular/compiler-cli/src/ngtsc/file_system';
import { ChangeDetectorRef, Component, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { DateRange } from '@angular/material/datepicker';
import { DataTableDirective } from 'angular-datatables';
import { strict } from 'assert';
import { table } from 'console';
import { Subject } from 'rxjs';
import { textChangeRangeIsUnchanged } from 'typescript';
import { Student, User } from '../core/model/user';
import { ExcelService } from '../core/services/excel.service';
import { LocalUserService } from '../core/services/local-user.service';
import { UserService } from '../core/services/user.service';
import { Attendance, Schedule } from '../schedule/model/schedule';
import { ScheduleService } from '../schedule/schedule.service';
import { StudentUser } from '../student/model/student';
import { StudentService } from '../student/student.service';
import * as XLSX from 'xlsx';
import { singleStudentAnswerSheet } from '../liveclass-template/model';
import { QuizResultsService } from '../quiz/quiz-results.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { SchoolService } from '../school/school.service';
import { SchoolDetails } from '../school/model';
import { DatePipe } from '@angular/common';
import { TeacherService } from '../teacher/teacher.service';
import { TeacherUser } from '../teacher/model';
import { ActivatedRoute, Router } from '@angular/router';




class ScheduleAttendence {
    name: string
    activities: ParticipantActivity[]
    attendence: boolean
}
export interface allStudentActCalculated {
    name: string,
    actvities: StudentsWithAttendacePercentage[],
}
export interface StudentsWithAttendacePercentage {
    id: string,
    name: string
    attendance: boolean
}


export interface ParticipantActivity {
    color: string
    value: number
}
export interface IndexActivity {
    value: number
}

@Component({
    selector: 'app-attendence-summary',
    templateUrl: './attendence-summary.component.html',
    styleUrls: ['./attendence-summary.component.css']
})

export class AttendenceSummaryComponent implements OnInit {

    id: string;
    allStudentsAttendance = [] as Array<Attendance>
    ScheduleAttendence = [] as Array<ScheduleAttendence>;
    studentAttendance = [] as boolean[];
    oneStudentActivity = [];
    _Atime: Array<ParticipantActivity> = [];
    _Btime: Array<ParticipantActivity> = [];
    _Index_activity: Array<IndexActivity> = [];
    attendanceStatus = null;
    percentage: number;
    AggregatePercentage: number = 0;
    resultArray = [];
    studentWise = {};
    schoolId: string = '';
    studentWiseCalculatedArray = [];
    studentWiseOverallpercentage = [];
    _object = Object;
    students = [] as StudentUser[]
    schedule: Schedule;
    quizResults = [] as singleStudentAnswerSheet[]
    @ViewChild('table') table: ElementRef;

    @ViewChild(DataTableDirective)
    dtElement: DataTableDirective;
    dtOptions: any = {};
    labels = [] as string[];
    dtTrigger: Subject<any> = new Subject();
    isViewInitialized = false;
    @Output() close_summary_modal: EventEmitter<boolean> = new EventEmitter();

    // start_time: Date = new Date("2020-11-07T10:30:13.945+00:00");
    // end_time: Date = new Date("2020-11-07T12:40:13.945+00:00");
    everyUserActivity: Array<any> = [];

    schoolDetail = {} as SchoolDetails;
    teacherModel = {} as TeacherUser;

    schoolName: string;
    noOfparticipants: number
    hostName: string
    duration: any

    constructor(private scheduleservice: ScheduleService,
        private userService: StudentService,
        private localUserService: LocalUserService,
        private quizResultsService: QuizResultsService,
        private excelService: ExcelService,
        private changeDetector: ChangeDetectorRef,
        private matSnackBar: MatSnackBar,
        private schoolService: SchoolService,
        private datePipe: DatePipe,
        private teacherService: TeacherService,
        private router: Router) {
        this.dtOptions = {
            pagingType: 'full',
            responsive: true,
            pageLength: 10,
            dom: 'Pfrtip',
            searching: true,
            language: {
                "search": "",
                searchPlaceholder: "Search..."
            }
        };
        this.schedule = this.router.getCurrentNavigation().extras.state.scheduleselected;
        console.log(this.schedule);

    }
    ngOnInit(): void {
        this.getSchoolData();
        this.getHostData()
        this.userService.getStudents(this.localUserService.getUser().belongs_to_school).subscribe(data => {
            this.students = data
            this.attendanceStatus = this.schedule.attendanceClosed
            this.noOfparticipants = this.schedule.participants.length
            const totalTime = Math.floor((new Date(this.schedule.ends_at).valueOf() - new Date(this.schedule.starts_at).valueOf()) / 1000);
            this.duration = Math.round(totalTime / 60)
            for (let i = 0; i < this.schedule.participants.length; i++) {
                this.allStudentsAttendance[i] = {} as Attendance;
                this.allStudentsAttendance[i].name = ''
                const val = this.schedule.activities.find(e => e.participant_id == this.schedule.participants[i]);
                if (val == undefined)
                    this.allStudentsAttendance[i].status = false
                else
                    this.allStudentsAttendance[i].status = true
                const teacher = this.schedule.activities.find(e => e.participant_id == this.schedule.host_id)
                if (teacher != undefined)
                    console.log("Teacher value is", teacher);
                //effective method save the student name on the schedule participant list
                this.allStudentsAttendance[i].name = this.students.find(e => e._id == this.schedule.participants[i]).name;
                this.allStudentsAttendance[i].participant_id = this.schedule.participants[i];

            }
            this.processSingleSchedule(this.schedule.activities, this.schedule.participants, this.schedule.starts_at, this.schedule.ends_at)

            this.dtTrigger.next()
        })
        this.quizResultsService.getQuizResultsInLiveClass(this.schedule._id).subscribe(data => {
            console.log("from service", data);

            this.quizResults = data;

            if (data == []) {
                this.quizResults = null
            } else {
                for (let i = 0; i < data.length; i++) {
                    this.labels.push(`${i + 1} Quiz Result`)
                }
            }

        }, err => console.error("", err));


        // data table options

    }

    private getSchoolData() {
        this.schoolService.getSingleSchoolDetails(this.localUserService.getUser().belongs_to_school).subscribe(data => {
            this.schoolDetail = data;
            this.schoolName = this.schoolDetail.name;
        })
    }

    private getHostData() {
        this.teacherService.getSingleTeacher(this.schedule.host_id).subscribe(data => {
            this.teacherModel = data;
            this.hostName = this.teacherModel.name;
        })
    }

    ngonViewInit() {
        this.dtTrigger.next();
    }

    exportexcel(): void {
        /* table id is passed over here */
        let element = document.getElementById('excel-table2');
        const ws: XLSX.WorkSheet = XLSX.utils.table_to_sheet(element);

        /* generate workbook and add the worksheet */
        const wb: XLSX.WorkBook = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');

        /* save to file */
        XLSX.writeFile(wb, "LiveClassDetails.xlsx");

    }


    exportAsXLSX(): void {
        let element = document.getElementById("excel-table1")
        const ws: XLSX.WorkSheet = XLSX.utils.table_to_sheet(element);

        const wb: XLSX.WorkBook = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');
        var fmt = "0%";
        /* change cell format of range B2:D4 */
        var range = { s: { r: 1, c: 1 }, e: { r: this.studentWiseOverallpercentage.length, c: 3 } };
        for (var R = range.s.r; R <= range.e.r; ++R) {
            for (var C = range.s.c; C <= range.e.c; ++C) {
                var cell = ws[XLSX.utils.encode_cell({ r: R, c: C })];
                if (!cell || cell.t != 'n') continue; // only format numeric cells
                cell.z = fmt;
            }
        }
        ws['!cols'] = [];
        ws['!cols'][1] = { hidden: true };
        /* save to file */
        XLSX.writeFile(wb, 'LiveclassSummary.xlsx');
    }

    giveAttendance(val: number) {
        this.allStudentsAttendance[val].status = !this.allStudentsAttendance[val].status

    }
    saveData() {
        this.scheduleservice.saveAttendance(this.allStudentsAttendance, this.schedule._id).subscribe(res => {
            this.close_summary_modal.emit(true);
            this.matSnackBar.open("Attendance summary Saved", "success", { duration: 1000 })

        })
    }
    ngAfterViewInit() {
        console.log(" ngafterviewinit called");

        this.isViewInitialized = true;
        this.changeDetector.detectChanges();
    }
    generateColor(type: string): string {

        if (type == 'roomopen')
            return '#ff0000';
        if (type == 'join')
            return '#f55145';
        if (type == 'blur')
            return '#55b559';
        if (type == 'back')
            return '#ff9e0f';
        if (type == 'leave')
            return '#55b559';
        if (type == 'close')
            return '#ffffff';
        if (type == 'roomclose')
            return '#ffffff';

    }

    processSingleSchedule(data: any, participants: any, startTime: any, endTime: any) {

        for (let i in participants)
            this.studentWise[participants[i]] = []
        for (let i in data) {
            this.studentWise[data[i]['participant_id']].push(data[i]);

        }
        for (let [key, value] of Object.entries(this.studentWise)) {

            this.studentWiseCalculatedArray.push(this.processEachStudent(value, key, startTime, endTime));
        }

        console.log("student wise calucalated array", this.studentWiseCalculatedArray);

    }
    processEachStudent(val: any, id: any, startTime: any, endTime: any) {
        const data = val
        console.log(data);
        this.resultArray = []
        const totalTime = Math.floor((new Date(endTime).valueOf() - new Date(startTime).valueOf()) / 1000);
        console.log("total", totalTime);

        let totalConsumed = 0;
        let current = 0;
        for (let i = 0; i < data.length; i++) {
            const color = this.generateColor(data[i]['activity_type'])
            let temp = 0;
            if (i == 0) {
                const start = Math.floor((new Date(data[0]['time']).valueOf() - new Date(startTime).valueOf()) / 1000);
                temp = Math.round((start / totalTime) * 100);
                console.log("index 0", temp);
            }
            else {
                if (i == (data.length - 1)) {
                    const last = Math.floor((new Date(endTime).valueOf() - new Date(data[i]['time']).valueOf()) / 1000);
                    temp = Math.round((last / totalTime) * 100);
                    console.log("index last", temp);
                    if (totalConsumed + temp != 100) {
                        temp = 100 - totalConsumed;
                    }
                }
                else {
                    const loop = Math.floor((new Date(data[i]['time']).valueOf() - new Date(data[i - 1]['time']).valueOf()) / 1000);
                    temp = Math.round((loop / totalTime) * 100);
                    console.log("for loop", temp);
                }
            }
            totalConsumed = temp + totalConsumed;
            this.resultArray.push({
                "type": data[i]['activity_type'],
                "color": color,
                "width": temp
            })
        }
        console.log("result Array", this.resultArray);
        totalConsumed = 0;
        this.resultArray.forEach((data) => {
            if (data.color == '#55b559')
                totalConsumed = data['width'] + totalConsumed;
        }
        );
        this.studentWiseOverallpercentage.push(totalConsumed);

        return this.resultArray
    }

    //-------------end ---------------Rishi Attendance logic

}