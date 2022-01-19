import { HttpClient } from '@angular/common/http';
import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { downloadButton, saveButton, teachersTemplateFilePath, uploadText } from 'src/app/constants';
import { environment } from 'src/environments/environment';
import * as Papa from 'papaparse';
import { Teacher, TeacherCreate, TeacherUser } from '../model';
import { TeacherService } from '../teacher.service';
import { LocalUserService } from 'src/app/core/services/local-user.service';
import { ClassesServiceService } from 'src/app/classes/classes-service.service';
import { EachClass } from 'src/app/classes/model';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-upload-teacher',
  templateUrl: './upload-teacher.component.html',
  styleUrls: ['./upload-teacher.component.css']
})
export class UploadTeacherComponent implements OnInit {
  uploadText: string
  downloadButton: string
  saveButton: string

  uploadForm: FormGroup;
  teachers = [] as TeacherCreate[];
  schoolId: string = '';
  templateDownloaded: boolean = false;
  teachersExcelData = [];
  selectedClassId: string = null;
  currentSubscriptionPlan: number = null;
  selectedClassname: string;
  classes: EachClass[];
  belongsToClass: string[] = [];
  ClassTeacherOf: string;
  @Output() close_Teacher_upload_modal: EventEmitter<boolean> = new EventEmitter();

  constructor(private fb: FormBuilder,
    private httpClient: HttpClient,
    private teacherService: TeacherService,
    public router: Router,
    private localUserService:
      LocalUserService,
    private eachClassService: ClassesServiceService,
    private matSnackBar: MatSnackBar) {
    this.schoolId = this.localUserService.getUser().belongs_to_school;

    this.currentSubscriptionPlan = this.localUserService.getUser().subscriptionPlan
    this.uploadText = uploadText
    this.downloadButton = downloadButton
    this.saveButton = saveButton
  }

  ngOnInit(): void {
    this.eachClassService.getClassesOfoneSchool(this.schoolId).subscribe(data => {
      this.classes = data
      console.log('each class data', data);

    })
    this.uploadForm = this.fb.group({
      uploadteachers: ['']
    });
  }
  classListItemClick(i) {
    console.log("selected value", this.classes[i]);
    this.selectedClassId = this.classes[i]._id;
    this.selectedClassname = this.classes[i].name;

  }

  downloadExcelFile() {
    let link = document.createElement("a");
    link.download = "teachers_upload.csv";
    link.href = teachersTemplateFilePath;
    link.click();
    this.templateDownloaded = true;
  }

  onFileSelect(ev) {
    if (ev.target.files.length > 0) {
      const file = ev.target.files[0];
      this.uploadForm.get('uploadteachers').setValue(file);
      Papa.parse(file, {
        header: true,
        skipEmptyLines: true,
        complete: (result, file) => {
          console.log("upload data ", result.data);
          this.teachersExcelData = result.data
          this.teachersExcelData.forEach(element => {
            const singleTeacher = {} as TeacherCreate;
            singleTeacher.belongs_to_school = this.schoolId;
            singleTeacher.name = element.name;
            singleTeacher.email = element.email;
            singleTeacher.password = element.password;
            singleTeacher._teacher = {} as Teacher
            if (element.is_class_teacher.toLowerCase() === "true") {
              singleTeacher._teacher.is_class_teacher = true;
            } else {
              singleTeacher._teacher.is_class_teacher = false;
            }
            element.belongs_to_class.split(',').forEach(element => {


              for (let i = 0; i < this.classes.length; i++) {
                if (this.classes[i].name == element) {
                  this.belongsToClass.push(this.classes[i]._id)
                  console.log("classes", this.classes[i]._id);


                }
              }
            });

            for (let i = 0; i < this.classes.length; i++) {
              if (this.classes[i].name == element.class_teacher_of) {
                this.ClassTeacherOf = this.classes[i]._id
                console.log("class teacher of", this.ClassTeacherOf);

              }
            }
            singleTeacher._teacher.belongs_to_class = this.belongsToClass
            singleTeacher._teacher.class_teacher_of = this.ClassTeacherOf
            singleTeacher._teacher.mobile_number = element.mobile_number
            singleTeacher.role = 'teacher'
            singleTeacher.subscriptionPlan =
              this.teachers.push(singleTeacher)
          })

        }
      });
    }
    // let workBook = null;
    // let jsonData = null;
    // const reader = new FileReader();
    // const file = ev.target.files[0];
    // reader.onload = (event) => {
    //   const data = reader.result;
    //   workBook = .read(data, { type: 'binary' });
    //   jsonData = workBook.SheetNames.reduce((initial, name) => {
    //     const sheet = workBook.Sheets[name];
    //     initial[name] = XLSX.utils.sheet_to_json(sheet);
    //     return initial;
    //   }, {});

    //   jsonData.forEach(element => {
    //     console.log("Each data", element);
    //     this.teachers.push = jsonData
    //   });

    // }
    // reader.readAsBinaryString(file);
  }

  onSubmit() {
    console.log("teacher on submit", this.teachers);
    this.teacherService.saveManyTeachers(this.teachers).subscribe(data => {
      console.log("response is", data);
      this.matSnackBar.open("Teacher upload", "success", { duration: 1000 })
      this.close_Teacher_upload_modal.emit(true);
      this.router.navigate(['livequiz/settings/page/teacher/list']);


    })

    // this.teacherService.saveManyTeachers(this.teachers).subscribe(data => {
    //   console.log("Response is",data);

    // });
  }

}
