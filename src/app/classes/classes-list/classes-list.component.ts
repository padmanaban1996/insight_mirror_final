import { ChangeDetectorRef, Component, Input, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { DataTableDirective } from 'angular-datatables';
import { Observable, Subject } from 'rxjs';
import { classError, classTableHead } from 'src/app/constants';
import { LocalUserService } from 'src/app/core/services/local-user.service';
import { ClassesServiceService } from '../classes-service.service';
import { EachClass } from '../model';

@Component({
  selector: 'app-classes-list',
  templateUrl: './classes-list.component.html',
  styleUrls: ['./classes-list.component.css']
})
export class ClassesListComponent implements OnInit {
  loading: boolean = true;
  classes: EachClass[];
  schoolId: string
  classeslength: number;
  classTableHead: string
  classError: string
  @Input() refresh_classes = false;
  @ViewChild(DataTableDirective)
  dtElement: DataTableDirective;
  dtOptions: any = {};
  dtTrigger: Subject<any> = new Subject();

  constructor(private classService: ClassesServiceService,
    private localUserService: LocalUserService,
    private ref: ChangeDetectorRef,
    private router: Router,
    private modalService: NgbModal) {
    this.classError = classError
    this.classTableHead = classTableHead
  }

  ngOnChanges() {
    if (this.refresh_classes == true) {
      let currentUrl = this.router.url;
      this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
        this.router.navigate([currentUrl]);
      });


    }
  }
  ngOnInit(): void {
    this.schoolId = this.localUserService.getUser().belongs_to_school;
    this.getData();
    // data table options
    this.dtOptions = {
      pagingType: 'full',
      pageLength: 10,
      dom: 'Pfrtip',
      searching: true,
      language: {
        "search": "",
        searchPlaceholder: "Search...",
        info: "showing _END_ out of _TOTAL_ Classes Found",
        infoEmpty: " 0 Classes Found",
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

  getData() {
    this.classService.getClassesOfoneSchool(this.schoolId).subscribe(data => {
      this.classes = data;
      this.classeslength = data.length
      this.loading = false;
      this.dtTrigger.next();
    })
  }
  open(content) {
    this.modalService.open(content, { ariaLabelledBy: 'New Class', windowClass: 'my-class' });
  }

  //modal : close when the timer runs out
  modalClose(e) {
    console.warn('modal close');

  }
}
