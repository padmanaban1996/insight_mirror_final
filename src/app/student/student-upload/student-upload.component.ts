import { HttpClient } from '@angular/common/http';
import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { downloadButton, saveButton, studentselectedClass, studentsTemplateFilePath, uploadText } from 'src/app/constants';
import { environment } from 'src/environments/environment';
import * as Papa from 'papaparse'
import { StudentUser, StudentCreate, Student } from '../model/student';
import { LocalUserService } from 'src/app/core/services/local-user.service';
import { EachClass } from 'src/app/classes/model';
import { ClassesServiceService } from 'src/app/classes/classes-service.service';
import { TeacherUser } from 'src/app/teacher/model';
import { single } from 'rxjs/operators';
import { TeacherService } from 'src/app/teacher/teacher.service';
import { StudentService } from '../student.service';
import { MatSnackBar } from '@angular/material/snack-bar';
// import { Student } from 'src/app/core/model/user';

@Component({
    selector: 'app-upload-student',
    templateUrl: './student-upload.component.html',
    styleUrls: ['./student-upload.component.css']
})
export class UploadStudentsComponent implements OnInit {
    studentselectedClass: string
    uploadText: string
    downloadButton: string
    saveButton: string

    uploadForm: FormGroup;
    templateDownloaded: boolean;
    students = [] as StudentCreate[];
    schoolId: string = '';
    selectedClassId: string = null;
    currentSubscriptionPlan: number = null;
    selectedClassname: string = null;
    classes: EachClass[];
    studentsExcelData = []
    progress: number = 0;
    @Output() close_Student_upload_modal: EventEmitter<boolean> = new EventEmitter();
    constructor(private fb: FormBuilder, private eachClassService: ClassesServiceService, private studentService: StudentService, private localUserService: LocalUserService, private httpClient: HttpClient, public router: Router, private matSnackBar: MatSnackBar,) {
        this.schoolId = this.localUserService.getUser().belongs_to_school;
        this.currentSubscriptionPlan = this.localUserService.getUser().subscriptionPlan

        this.studentselectedClass = studentselectedClass
        this.uploadText = uploadText
        this.downloadButton = downloadButton
        this.saveButton = saveButton
    }

    ngOnInit(): void {
        this.eachClassService.getClassesOfoneSchool(this.schoolId).subscribe(data => {
            this.classes = data
        })
        this.uploadForm = this.fb.group({
            uploadstudents: ['']
        });
    }
    onChange(i) {
        console.log("selected value", i);
        this.selectedClassId = this.classes[i]._id;
        this.selectedClassname = this.classes[i].name;

    }
    onFileSelect(event) {
        if (event.target.files.length > 0) {
            const file = event.target.files[0];
            this.uploadForm.get('uploadstudents').setValue(file);
            Papa.parse(file, {
                header: true,
                skipEmptyLines: true,
                complete: (result, file) => {
                    console.log("upload data ", result.data);
                    this.studentsExcelData = result.data
                    this.studentsExcelData.forEach(element => {
                        //pwd set link will be sent via mail to the students
                        const singleStudent = {} as StudentCreate;
                        singleStudent.belongs_to_school = this.schoolId;
                        singleStudent.name = element.name;
                        singleStudent.email = element.email;
                        singleStudent.password = element.password;
                        singleStudent._student = {} as Student;
                        singleStudent._student.belongs_to_class_id = this.selectedClassId;
                        singleStudent._student.parent_email_id = element.parent_email_id;
                        singleStudent._student.parent_mobile_number = element.parent_phone_number;
                        singleStudent.role = 'student';
                        singleStudent.subscriptionPlan =
                            this.students.push(singleStudent)
                    });
                }
            })
        }
    }

    downloadExcelFile() {
        let link = document.createElement("a");
        link.download = `${this.selectedClassname}_students_upload`;
        link.href = studentsTemplateFilePath;
        link.click();
        this.templateDownloaded = true;
    }

    //file upload service : later add in questions service

    onSubmit() {
        console.log("Student on submit", this.students);

        this.studentService.saveManyStudents(this.students).subscribe(data => {
            this.matSnackBar.open("Student upload", "success", { duration: 1000 })
            this.close_Student_upload_modal.emit(true);
            this.router.navigate(['livequiz/settings/page/student/list']);
        });
    }




}
