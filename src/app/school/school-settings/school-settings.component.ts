import { HttpClient } from '@angular/common/http';
import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { LocalUserService } from 'src/app/core/services/local-user.service';
import { environment } from 'src/environments/environment';
import { ThemeService } from '../../admin-theme/theme.service';

@Component({
  selector: 'app-school-settings',
  templateUrl: './school-settings.component.html',
  styleUrls: ['./school-settings.component.css']
})
export class SchoolSettingsComponent implements OnInit {
  color: string = "#196dff";
  color1: string = "#008000";
  color2: string = "#fff";
  classRefresh: boolean = false;
  darkTheme;
  lightTheme;
  url = null;
  file: any;
  schoolId: string;
  selectedFile: File;
  backgroundColor: string;
  fontColor: string;
  linkColor: string;
  buttonColor: string;
  uploadForm: FormGroup;
  refresh_classes;
  refresh_subjects;

  constructor(private modalService: NgbModal,
    private themeservice: ThemeService,
    private localUserService: LocalUserService,
    private httpService: HttpClient,
    private fb: FormBuilder

  ) {
    this.schoolId = this.localUserService.getUser().belongs_to_school;
  }


  toggleDarktheme() {
    this.themeservice.toggleDark();
  }
  toggleLighttheme() {
    this.themeservice.toggleLight();
  }
  ngOnInit() {
    this.uploadForm = this.fb.group({
      uploadLogo: ['']
    });

  }
  // classes list refresh
  onSaveDataRefreshClasses(e: boolean) {
    this.refresh_classes = e;
  }
  // subjects list refresh
  onSaveDataRefreshSubjects(e: boolean) {
    this.refresh_subjects = e;
  }


  //modal  logics
  open(content) {
    this.modalService.open(content, { ariaLabelledBy: 'New Class', windowClass: 'my-class' });
  }

  //modal : close when the timer runs out
  modalClose(e) {
    console.warn('modal close');

  }
}


