import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Form, FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { ModalDismissReasons, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { AmazingTimePickerService } from 'amazing-time-picker';
import { resolve } from 'dns';
import { element, promise } from 'protractor';
import { Observable } from 'rxjs';
import { addParticipentsLabel, dateLabel, endTimeLabel, newQuestionModalTitle, questionTemplateFilePath, quizCreate, quizcreateButton, quizlabel, quizQustionAdd, selectQuestionLabel, startTimeLabel, SubjectsSelectLabel, subjectsSelectPlaceholder } from 'src/app/constants';
import { User } from 'src/app/core/model/user';
import { LocalUserService } from 'src/app/core/services/local-user.service';
import { UserService } from 'src/app/core/services/user.service';
import { Questions } from 'src/app/questions/model/questions';
import { QuestionsService } from 'src/app/questions/questions.service';
import { Iquestion, Quiz } from '../model/quiz';
import { QuizHostComponent } from '../quiz-host/quiz-host.component';
import { QuizService } from '../quiz.service';
import * as _moment from "moment";
import { EachClass, EachClassStudent } from 'src/app/classes/model';
import { ClassesServiceService } from 'src/app/classes/classes-service.service';
import { ConfirmationDialogService } from 'src/app/components/confirmation-dialog/confirmation-dialog.service';
import { ToastrService } from 'ngx-toastr';

const moment = _moment;

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.css']
})
export class CreateQuizComponent implements OnInit {
  questionForm: FormGroup;
  questions: FormArray;
  videoForm: FormGroup
  videos: FormArray
  quizCreate: string
  quizlabel: string
  dt;
  showQuestiondata = [];
  showOptions = []
  quizName: string = 'Untitled Quiz';
  quizSubject: string;
  quizQuestions: any[] = [];
  classesIdList: string[];
  quizData: any;
  questionModel: any;
  id: string;
  showQuestionOptions = [];
  today;
  quizQustionAdd: string
  selectQuestionLabel: string
  quizcreateButton: string
  newQuestionModalTitle: string
  createQuizForm: FormGroup;
  questionsList: Observable<Questions[]>;
  questionsSelected = [];
  allQuestionsSelected: Questions[] = [];
  closeResult = '';
  user: User;
  starts_at_time;
  imageOption1Src: any;
  imageOption2Src: any;
  imageOption3Src: any;
  imageOption4Src: any;
  ends_at_time;
  greater: boolean = false;
  singleCreatedQuestion;
  questionsValueGot: boolean;
  createdquestion: Questions;
  flag: boolean = false

  questionsfinal: Questions[] = [];
  addParticipentsLabel: any;
  startTimeLabel: any;
  endTimeLabel: any;
  dateLabel: any;
  starts_at_time2: string;
  ends_at_time2: string
  participantsSelected: EachClassStudent[] = [];
  tempClassList: EachClass[] = []
  classesList: EachClass[] = [];
  classCheck: boolean[] = [];
  subjectsSelected: string;
  SubjectsselsctedLabel: string;
  subjectSelectedPlaceholder: string;
  subject: any;
  quizVideos: any[] = [];
  scheduled: boolean;

  undo: boolean = false;
  temp: any;
  data: any;
  createdQuizId: string;
  constructor(private quizService: QuizService,
    private questionService: QuestionsService,
    private toastr: ToastrService,
    public router: Router,
    private atp: AmazingTimePickerService,
    private fb: FormBuilder,
    private formBuilder: FormBuilder,
    private localUserService: LocalUserService,
    private classesService: ClassesServiceService,
    private matSnackBar: MatSnackBar,
    private modalService: NgbModal,
    private confirmationDialogService: ConfirmationDialogService) {
    this.user = this.localUserService.getUser();
    this.quizCreate = quizCreate
    this.quizlabel = quizlabel
    this.quizQustionAdd = quizQustionAdd
    this.selectQuestionLabel = selectQuestionLabel
    this.quizcreateButton = quizcreateButton
    this.newQuestionModalTitle = newQuestionModalTitle
    this.addParticipentsLabel = addParticipentsLabel
    this.dateLabel = dateLabel
    this.startTimeLabel = startTimeLabel
    this.endTimeLabel = endTimeLabel
    this.SubjectsselsctedLabel = SubjectsSelectLabel
    this.subjectSelectedPlaceholder = subjectsSelectPlaceholder
    this.classesIdList = this.localUserService.getUser()._teacher.belongs_to_class;
  }
  name = new FormControl('');
  subjects: any[] = ["Maths", "Chemistry", "Physics", "Biology", "Geography", "Computer", "English", "History"];

  ngOnInit(): void {
    this.getSingleQuizQuestions();
    for (const id of this.classesIdList) {
      this.classesService.getOneClassDetailsById(id).subscribe(data => {
        this.tempClassList.push(data);
        this.classCheck.push(false);
      })
    }
    this.classesList = this.tempClassList.sort((a, b) => 0 - (a.name > b.name ? -1 : 1));
  }

  addQuestion(): void {
    const data = {
      qtype: ''
    } as Iquestion
    this.quizData.questions.push(data);
  }
  uploadQuestions(content) {
    this.modalService.open(content, { ariaLabelledBy: 'New Class', windowClass: 'question-upload', centered: true })
  }
  uploadedQuestions(event) {
    console.log(event);
    event.forEach(element => {
      this.quizQuestions.push(element)
    });
  }
  addVideo(): void {
    const data = {} as any
    this.quizData.videos.push(data);
  }
  deleteVideo(i) {
    this.temp = this.quizData.videos[i];
    this.quizData.videos.splice(i, 1)
    this.undo = false;
    console.log("temp::", this.temp);
    let snackBarRef = this.matSnackBar.open("Video Link deleted successfully.", 'Undo', {
      duration: 3000
    });
    snackBarRef.onAction().subscribe(() => {
      console.log('undo');
      this.quizData.videos.splice(i, 0, this.temp);
      this.undo = true;
    });
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

  updateQuiz(scheduled: boolean) {
    this.flag = true
    this.quizData.name = this.quizName
    this.quizData.subject = this.subject
    this.quizData.scheduled = scheduled
    this.quizData.createdBy = this.user._id
    this.quizData.belongsToSchool = this.user.belongs_to_school;
    let participantIds = [];
    this.participantsSelected.forEach(element => {
      participantIds.push({ studentId: element._id });
    });
    this.quizData.participants = participantIds
    console.log(this.quizData);
    this.quizService.createQuiz(this.quizData).subscribe(data => {
      console.log(data);
      this.toastr.success("quiz created", "success");
      this.router.navigate(['livequiz/quiz/list'])
    }, error => {
      this.toastr.warning(error.error.message)
    })
  }
  onSelectSubject(e) {
    console.log(e);
    this.subject = e
  }
  optionClick(e, i) {
    this.quizData.questions[i].correctAnswer = e;
  }
  deletelistQuestion(i) {
    console.log(i);
    this.undo = false;
    this.temp = this.quizData.questions[i];
    this.quizData.questions.splice(i, 1)
    let snackBarRef = this.matSnackBar.open("Question deleted successfully.", 'Undo', {
      duration: 3000
    });
    snackBarRef.onAction().subscribe(() => {
      console.log('undo');
      this.quizData.questions.splice(i, 0, this.temp);
      this.undo = true;
    });
  }
  deleteQuiz() {
    this.confirmationDialogService.confirm('Please confirm..', 'Do you really want to delete this quiz ?')
      .then((confirmed) => {
        if (confirmed) {
          this.matSnackBar.open("Quiz deleted successfully.", '', { duration: 3000 })
          this.router.navigate(['livequiz/quiz/list'])

        }
      })
      .catch(() => console.log("user canceled quiz delete."));
  }
  deleteemitQuestion(i) {
    console.log(i);
    this.temp = this.quizQuestions[i];
    this.quizQuestions.splice(i, 1)
    let snackBarRef = this.matSnackBar.open("Question deleted successfully.", 'Undo', {
      duration: 3000
    });
    snackBarRef.onAction().subscribe(() => {
      console.log('undo');
      this.quizQuestions.splice(i, 0, this.temp);
      this.undo = true;
    });

  }
  onChangeEvent(event, i) {
    this.questionForm.controls.questions.value[i].image = event.target.value;
  }
  getSingleQuizQuestions() {
    this.quizData = {
      questions: [],
      participants: [],
      videos: [],
    }
    console.log(this.quizData);
    this.quizQuestions = this.quizData.questions;
    this.quizVideos = this.quizData.videos
    for (let index = 0; index < this.quizQuestions.length; index++) {
      this.showQuestionOptions.push(false)

    }

  }

  onFileInput(event, i,) {
    if (event.target.files && event.target.files[0]) {
      const file = event.target.files[0];
      const reader = new FileReader();
      reader.onload = e => this.quizQuestions[i].image = reader.result;
      reader.readAsDataURL(file);
    }
  }
  onOptionOneInput(event, i) {
    if (event.target.files && event.target.files[0]) {
      const file = event.target.files[0];
      const reader = new FileReader();
      reader.onload = e => this.quizQuestions[i].a = reader.result;
      reader.readAsDataURL(file);
    }
  }
  onOptionTwoInput(event, i) {
    if (event.target.files && event.target.files[0]) {
      const file = event.target.files[0];
      const reader = new FileReader();
      reader.onload = e => this.quizQuestions[i].b = reader.result;
      reader.readAsDataURL(file);
    }
  }
  onOptionThreeInput(event, i) {
    if (event.target.files && event.target.files[0]) {
      const file = event.target.files[0];
      const reader = new FileReader();
      reader.onload = e => this.quizQuestions[i].c = reader.result;
      reader.readAsDataURL(file);
    }
  }
  onOptionFourInput(event, i) {
    if (event.target.files && event.target.files[0]) {
      const file = event.target.files[0];
      const reader = new FileReader();
      reader.onload = e => this.quizQuestions[i].d = reader.result;
      reader.readAsDataURL(file);
    }
  }
  getCreatedQuestion(data) {
    console.log("emitted!", data);
    this.quizQuestions.push(data);
  }
  showQuestionOptionsByIndex(i) {
    this.showQuestiondata[i] = !this.showQuestiondata[i]
  }
  onSelectQuestionType(event, i) {
    console.log(event, i);
    this.quizData.questions[i].qtype = event
    this.showOptions[i] = true
    switch (event) {
      case 'mcq2':
        this.quizData.questions[i].c = ''
        this.quizData.questions[i].d = ''

        break;
      case 'blanks':
        this.quizData.questions[i].a = ''
        this.quizData.questions[i].b = ''
        this.quizData.questions[i].c = ''
        this.quizData.questions[i].d = ''
        break;
      case 'paragraph':
        this.quizData.questions[i].a = ''
        this.quizData.questions[i].b = ''
        this.quizData.questions[i].c = ''
        this.quizData.questions[i].d = ''
        break;
      default:
        break
    }
  }
  open(content) {
    this.modalService.open(content, { ariaLabelledBy: 'New Class', windowClass: 'question-add', })
  }
}




