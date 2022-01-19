import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { adminAddButton, adminCreateTitle, adminPageTitle } from 'src/app/constants';
import { LocalUserService } from 'src/app/core/services/local-user.service';

@Component({
  selector: 'app-admin-page',
  templateUrl: './admin-page.component.html',
  styleUrls: ['./admin-page.component.css']
})
export class AdminPageComponent implements OnInit {

  refresh_admins;
  adminCreateTitle: string
  adminPageTitle: string
  adminAddButton: string
  schoolId: string
  constructor(private modalService: NgbModal, private local: LocalUserService) {
    this.adminCreateTitle = adminCreateTitle
    this.adminAddButton = adminAddButton
    this.adminPageTitle = adminPageTitle
  }

  ngOnInit(): void {
    const data = this.local.getUser()
    console.log(data);
    this.schoolId = data.belongs_to_school
  }
  //modal  logics
  open(content) {
    this.modalService.open(content, { ariaLabelledBy: 'New Class', windowClass: 'admin-create', centered: true });
  }

  //modal : close when the timer runs out
  modalClose(e) {
    console.warn('modal close');

  }
  // admins list refresh
  onSaveDataRefreshAdmins(e: boolean) {
    console.log(e);

    this.refresh_admins = e;
    this.modalService.dismissAll()
  }
}
