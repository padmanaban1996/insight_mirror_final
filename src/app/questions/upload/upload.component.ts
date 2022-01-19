import { HttpClient } from '@angular/common/http';
import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';
import { QuestionsService } from '../questions.service';
import { questionTemplateFilePath } from 'src/app/constants';
import * as Papa from 'papaparse';
import { Iquestion } from 'src/app/quiz/model/quiz';
import { MatSnackBar } from '@angular/material/snack-bar';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { LocalUserService } from 'src/app/core/services/local-user.service';
import * as XLSX from 'xlsx';
const upload_file_location = environment.base_api_url + '/questions/upload';
@Component({
  selector: 'app-upload',
  templateUrl: './upload.component.html',
  styleUrls: ['./upload.component.css']
})
export class UploadComponent implements OnInit {
  @Output() uploadedQuestions = new EventEmitter<any>();
  filepath = questionTemplateFilePath;
  uploadForm: FormGroup;
  questionsExcelData = [];
  questions = [] as Iquestion[];
  flag: boolean = false;
  isCsvFile: boolean;
  isExcelFile: boolean;
  arrayBuffer: any;
  constructor(private modalService: NgbModal, private localUserService: LocalUserService, private matSnackBar: MatSnackBar, private fb: FormBuilder, private httpClient: HttpClient, public router: Router) { }

  ngOnInit(): void {
    this.uploadForm = this.fb.group({
      uploadQuestions: ['']
    });
  }

  onFileSelect(event) {
    console.log(event.target.files[0].name);

    this.isCsvFile = !!event.target.files[0].name.match(/(.csv)/);
    this.isExcelFile = !!event.target.files[0].name.match(/(.xls|.xlsx)/);
    if (this.isCsvFile) {
      const file = event.target.files[0];
      this.uploadForm.get('uploadQuestions').setValue(file);
      Papa.parse(file, {
        header: true,
        skipEmptyLines: true,
        complete: (result, file) => {
          console.log(result.data);

          this.questionsExcelData = result.data;
          const questionMatch = this.questionsExcelData.map(item => item.title)
            .filter((value, index, self) => self.indexOf(value) === index)
          const findDuplicateQuestions = (arr) => {
            let sorted_arr = arr.slice().sort();
            let results = [];
            for (let i = 0; i < sorted_arr.length - 1; i++) {
              if (sorted_arr[i + 1] == sorted_arr[i]) {
                results.push(sorted_arr[i]);
              }
            }
            return results;
          }
          const sameQuestion = findDuplicateQuestions(this.questionsExcelData.map(item => item.question));
          if (sameQuestion.length > 0) {
            this.matSnackBar.open("Same Question Exists", 'Cancel', {
              duration: 2000, verticalPosition: 'top', horizontalPosition: "right"
            });
            this.modalService.dismissAll();
          }
          this.questionsExcelData.forEach(element => {
            if (element.correctAnswer === '' || element.question === '') {
              this.matSnackBar.open("Check All Fields", 'Cancel', {
                duration: 2000, verticalPosition: 'top', horizontalPosition: "right"
              });
              this.modalService.dismissAll();
            }
            const singleQuestion = {} as Iquestion;
            singleQuestion.title = element.title;
            singleQuestion.a = element.a;
            singleQuestion.b = element.b;
            singleQuestion.c = element.c;
            singleQuestion.d = element.d;
            singleQuestion.createdBy = this.localUserService.getUser()._id
            singleQuestion.correctAnswer = element.correctAnswer;
            this.questions.push(singleQuestion)
          });
        }
      })
    }
    if (this.isExcelFile) {
      const file = event.target.files[0];
      let fileReader = new FileReader();
      fileReader.readAsArrayBuffer(file);
      fileReader.onload = (e) => {
        this.arrayBuffer = fileReader.result;
        var data = new Uint8Array(this.arrayBuffer);
        var arr = new Array();
        for (var i = 0; i != data.length; ++i) arr[i] = String.fromCharCode(data[i]);
        var bstr = arr.join("");
        var workbook = XLSX.read(bstr, { type: "binary", cellDates: true });
        var first_sheet_name = workbook.SheetNames[0];
        var worksheet = workbook.Sheets[first_sheet_name];
        var arraylist = XLSX.utils.sheet_to_json(worksheet, { raw: true });
        this.questionsExcelData = XLSX.utils.sheet_to_json(worksheet, {
          raw: true,
          defval: ""
        });
        console.log(this.questionsExcelData);

        const questionMatch = this.questionsExcelData.map(item => item.question)
          .filter((value, index, self) => self.indexOf(value) === index)
        const findDuplicateQuestions = (arr) => {
          let sorted_arr = arr.slice().sort();
          let results = [];
          for (let i = 0; i < sorted_arr.length - 1; i++) {
            if (sorted_arr[i + 1] == sorted_arr[i]) {
              results.push(sorted_arr[i]);
            }
          }
          return results;
        }
        const sameQuestion = findDuplicateQuestions(this.questionsExcelData.map(item => item.question));
        if (sameQuestion.length > 0) {
          this.matSnackBar.open("Same Question Exists", 'Cancel', {
            duration: 2000, verticalPosition: 'top', horizontalPosition: "right"
          });
          this.modalService.dismissAll();
        }
        this.questionsExcelData.forEach(element => {
          if (element.correctAnswer === '' || element.question === '') {
            this.matSnackBar.open("Check All Fields", 'Cancel', {
              duration: 2000, verticalPosition: 'top', horizontalPosition: "right"
            });
            this.modalService.dismissAll();
          }
          const singleQuestion = {} as Iquestion;
          singleQuestion.title = element.question;
          singleQuestion.a = element.a;
          singleQuestion.b = element.b;
          singleQuestion.c = element.c;
          singleQuestion.d = element.d;
          singleQuestion.createdBy = this.localUserService.getUser()._id
          singleQuestion.correctAnswer = element.correctAnswer;
          singleQuestion.qtype = element.questiontype;
          singleQuestion.paragraph = element.paragraph
          this.questions.push(singleQuestion)
        });
      }
    }
  }
  downloadExcelFile() {
    let link = document.createElement("a");
    link.download = "questions_upload.xlsx";
    link.href = questionTemplateFilePath;
    link.click();
  }
  onSubmit() {
    this.flag = true
    console.log("Questions on submit", this.questions);
    if (this.questions.length === 0) {
      this.matSnackBar.open("File not be Empty!", "undo", { duration: 1000, verticalPosition: 'top', horizontalPosition: "right" })
    } else {
      this.httpClient.post<any>(upload_file_location, this.questions).subscribe(
        (res) => {
          this.uploadedQuestions.emit(this.questions)
          this.matSnackBar.open("Questions upload", "success", { duration: 2000, verticalPosition: 'top', horizontalPosition: "right" })
          this.modalService.dismissAll();
        },
        (err) => {
          err
          this.modalService.dismissAll();
        })
    }
  }


}
