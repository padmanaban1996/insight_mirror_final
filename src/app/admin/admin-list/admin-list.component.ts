import { DOCUMENT } from '@angular/common';
import { ChangeDetectorRef, Component, ElementRef, EventEmitter, Inject, Input, OnInit, Output, ViewChild } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { DataTableDirective } from 'angular-datatables';
import { Subject } from 'rxjs';
import { adminError, adminTableHead } from 'src/app/constants';
import { User } from 'src/app/core/model/user';
import { LocalUserService } from 'src/app/core/services/local-user.service';
import { AdminService } from '../admin.service';
import { AdminUser } from '../model';

@Component({
  selector: 'app-admin-list',
  templateUrl: './admin-list.component.html',
  styleUrls: ['./admin-list.component.css']
})
export class AdminListComponent implements OnInit {
  adminError: string
  adminTableHead: string
  loading: boolean = true;
  allAdminsOfASchool: AdminUser[];
  schoolId: string;
  allAdminsOfASchoollength: number = null;
  @Input() refresh_admins
  @ViewChild(DataTableDirective)
  dtElement: DataTableDirective;
  dtOptions: any = {};
  dtTrigger: Subject<any> = new Subject();
  @ViewChild('singleAdminModal') singleAdminModal: ElementRef;

  selectedid: string;
  refresh: boolean;
  @Output() selectedAdmin: EventEmitter<User> = new EventEmitter<User>();
  constructor(
    private adminServies: AdminService,
    private localUserService: LocalUserService,
    private changeDetector: ChangeDetectorRef,
    private router: Router,
    private modalService: NgbModal,
  ) {
    this.loading = true;
    this.schoolId = this.localUserService.getUser().belongs_to_school;
    this.adminTableHead = adminTableHead;
    this.adminError = adminError


  }

  ngOnInit(): void {

    this.getData();
    this.dtOptions = {
      pagingType: 'full',
      pageLength: 10,
      dom: 'Pfrtip',
      searching: true,
      language: {
        "search": "",
        searchPlaceholder: "Search...",
        info: "showing _END_ out of _TOTAL_ Admins Found",
        infoEmpty: " 0 Admins Found",
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
  // ngOnChanges() {
  //   if (this.refresh_admins === true || this.refresh === true) {
  //     this.getData()

  //   }
  // }

  onListItemClick(index: number) {
    this.selectedid = this.allAdminsOfASchool[index]._id;
    console.log(this.selectedid);
    this.open(this.singleAdminModal);
  }

  getData() {
    this.adminServies.getAdmins(this.schoolId).subscribe(data => {
      this.allAdminsOfASchool = data.filter(item => item.role == 'admin');
      this.allAdminsOfASchoollength = this.allAdminsOfASchool.length
      this.loading = false;
      this.dtTrigger.next();
    })
  }
  //modal  logics
  open(content) {
    this.modalService.open(content, { ariaLabelledBy: 'New Class', windowClass: 'admin-details', centered: true });
  }

  //modal : close when the timer runs out
  modalClose(e) {
    console.warn('modal close');
  }
  // admins list refresh
  onSaveDataRefreshAdmins(e: boolean) {
    if (e === true) {

      this.getData();
    }
  }

}
