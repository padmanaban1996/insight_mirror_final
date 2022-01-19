import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { ModalDismissReasons, NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { DataTableDirective } from 'angular-datatables';
import { Subject } from 'rxjs';
import { ClassesServiceService } from 'src/app/classes/classes-service.service';
import { EachClass } from 'src/app/classes/model';
import { studentAddButton, studentError, studentFilterPlaceholder, studentTableHead, studentUploadButton, studentuploadTitle } from 'src/app/constants';
import { Student } from 'src/app/core/model/user';
import { LocalUserService } from 'src/app/core/services/local-user.service';
import { Quiz } from 'src/app/quiz/model/quiz';
import { StudentUser } from '../model/student';
import { StudentService } from '../student.service';

@Component({
  selector: 'app-student-list',
  templateUrl: './student-list.component.html',
  styleUrls: ['./student-list.component.css']
})
export class StudentListComponent implements OnInit {
  studentFilterPlaceholder: string
  studentAddButton: string
  studentUploadButton: string
  studentError: string
  studentTableHead: string
  studentuploadTitle: string

  students: StudentUser[];
  filteredStudents: StudentUser[];
  schoolId: string;
  studentslength: number;
  closeResult = '';
  classSelected: string;
  allClassList: EachClass[];
  loading: boolean = true;
  @Input() quizlists: Quiz[] = [];
  @ViewChild(DataTableDirective)


  dtElement: DataTableDirective;
  dtOptions: any = {};
  dtTrigger: Subject<any> = new Subject();
  summarymodal: NgbModalRef;
  selectedid: any;
  @ViewChild('singleStudentModal') singleStudentModal: ElementRef;
  close_Student_upload_modal: boolean;
  constructor(private router: Router,
    private studentservice: StudentService,
    private localUserService: LocalUserService,
    private eachClassService: ClassesServiceService,
    private modalService: NgbModal) {
    this.schoolId = this.localUserService.getUser().belongs_to_school
    this.eachClassService.getClassesOfoneSchool(this.schoolId).subscribe(data => {
      this.allClassList = data
    })
    this.studentFilterPlaceholder = studentFilterPlaceholder
    this.studentAddButton = studentAddButton
    this.studentUploadButton = studentUploadButton
    this.studentError = studentError
    this.studentTableHead = studentTableHead
    this.studentuploadTitle = studentuploadTitle
  }

  ngOnInit(): void {
    this.getStudents();
    // data table options
    this.dtOptions = {
      pagingType: 'full',
      pageLength: 10,
      dom: 'Pfrtip',
      searching: true,
      language: {
        "search": "",
        searchPlaceholder: "Search...",
        info: "showing _END_ out of _TOTAL_ Students Found",
        infoEmpty: "0 Students Found",
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
  onListItemClick(index: number) {

    this.selectedid = this.students[index]._id;
    console.log(this.selectedid);

    this.open(this.singleStudentModal);
  }
  getStudents() {

    this.studentservice.getStudents(this.schoolId).subscribe(
      data => {
        this.students = data;
        this.studentslength = data.length;
        this.filteredStudents = this.students;
        this.loading = false
        this.dtTrigger.next();
      }
    )
  }
  // on selecting the class below code will run
  changeClass(classId: string) {
    // this.students.forEach(element => {

    // });
    if (classId == null) {
      this.filteredStudents = this.students;
    } else {
      this.filteredStudents = this.students.filter(item => item._student.belongs_to_class_id === classId)
    }
    this.studentslength = this.filteredStudents.length


  }
  openAddNewStudent() {
    this.router.navigate(['livequiz/settings/page/student/create']);
  }
  // openStudentUpload() {
  //   this.router.navigate(['livequiz', 'student', 'upload'])
  // }
  open(content) {
    this.modalService.open(content, { ariaLabelledBy: 'New Class', windowClass: 'student-upload', centered: true }).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }
  closestudentuploadmodal(e) {
    this.close_Student_upload_modal = e;
    console.log(e)
    if (this.close_Student_upload_modal == true) {
      console.log("changeDetected...")
      this.modalService.dismissAll()
    }

  }
  modalClose(e) {
    console.warn('modal close');

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
