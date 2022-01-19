import { Component, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { ModalDismissReasons, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { DataTableDirective } from 'angular-datatables';
import { Subject } from 'rxjs';
import { quizError, quizQuestionLabel, quizTableHead, searchPlaceholder } from 'src/app/constants';
import { User } from 'src/app/core/model/user';
import { LocalUserService } from 'src/app/core/services/local-user.service';
import { Quiz } from '../model/quiz';
import { checkIfStudenHasResult } from '../model/quiz-results';
import { QuizService } from '../quiz.service';

@Component({
  selector: 'app-quiz-list',
  templateUrl: './quiz-list.component.html',
  styleUrls: ['./quiz-list.component.css']
})
export class QuizListComponent implements OnInit {
  searchByTitle: string;
  quizError: string
  quizTableHead: string
  searchPlaceholder: string
  quizQuestionLabel: string
  active: number;
  quizLength: number = null;
  selectedid: string;
  loggedInUser: User;
  quizAttendedByUser: boolean;
  participantId: string;
  checkIfStudentAttended = {} as checkIfStudenHasResult;
  loading: boolean = true;
  closeResult = '';
  Activity = [];
  selected: boolean[] = []
  @Input() quizlists: Quiz[] = [];
  @Output() selectedQuiz: EventEmitter<Quiz> = new EventEmitter<Quiz>();
  @ViewChild('singleQuizQuestionsModal') singleQuizQuestionsModal: ElementRef;
  @ViewChild(DataTableDirective)
  dtElement: DataTableDirective;
  dtOptions: any = {};
  dtTrigger: Subject<any> = new Subject();

  constructor(
    private quizService: QuizService,
    public router: Router,
    private localUserService: LocalUserService,
    private modalService: NgbModal,

  ) {
    this.loggedInUser = this.localUserService.getUser();
    this.participantId = this.loggedInUser._id;
    this.quizError = quizError
    this.quizTableHead = quizTableHead
    this.searchPlaceholder = searchPlaceholder
    this.quizQuestionLabel = quizQuestionLabel
  }

  ngOnInit(): void {
    this.getQuiz();

    // data table options
    this.dtOptions = {
      pagingType: 'full',
      pageLength: 10,
      dom: 'Pfrtip',
      searching: true,
      // bPaginate: false,
      language: {
        "search": "",
        searchPlaceholder: "Search...",
        info: "showing _END_ out of _TOTAL_ Quizzes Found",
        infoEmpty: "0 Quizzes Found",

      },
      oLanguage: {
        "oPaginate": {
          "sFirst": "First", // This is the link to the first page
          "sPrevious": "<i class='fa fa-arrow-left' aria-hidden='true'></i>", // This is the link to the previous page
          "sNext": "<i class='fa fa-arrow-right' aria-hidden='true'></i>", // This is the link to the next page
          "sLast": "Last" // This is the link to the last page
        }
      }
    };
  }


  onListItemClick(index: number,) {
    this.selectedid = this.quizlists[index]._id;
    this.selectedQuiz.emit(this.quizlists[index])
    // this.open(this.singleQuizQuestionsModal);
    this.router.navigate(['livequiz/quiz/single', this.selectedid])
  }

  //get data from the api
  getQuiz() {
    if (this.loggedInUser.role == 'student' || this.loggedInUser.role == 'admin') {
      this.quizService.getAllQuizBySchool(this.loggedInUser.belongs_to_school)
        .subscribe(data => {
          this.quizlists = data
          this.quizLength = this.quizlists.length;
          this.loading = false;
          this.dtTrigger.next();
        })
    }
    if (this.loggedInUser.role == 'teacher') {
      this.quizService.getQuizByTeacher(this.loggedInUser._id)
        .subscribe(data => {
          console.log(data);

          this.quizlists = data

          this.quizLength = this.quizlists.length;
          this.loading = false;
          this.dtTrigger.next();
        })
    }
  }
  open(content) {
    this.modalService.open(content, { ariaLabelledBy: 'New Class', windowClass: 'my-class', centered: true }).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }

  onQuizUpdate(e) {
    console.log('modal close', e);
    if (e) {
      this.dtElement.dtInstance.then((dtInstance: DataTables.Api) => {
        dtInstance.destroy();
        this.getQuiz()
      });
    }

  }
  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return `with: ${reason}`;
    }
  }
}
