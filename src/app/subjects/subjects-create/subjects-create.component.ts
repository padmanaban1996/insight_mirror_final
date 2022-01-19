import { Component, EventEmitter, OnInit, Output, Type } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { SubjectsServiceService } from 'src/app/subjects/subjects-service.service';
import { LocalUserService } from 'src/app/core/services/local-user.service';
import { SubjectCreate } from '../model';
import { subjectCreateError, subjectNameLabel, subjectSubmitButton } from 'src/app/constants';

@Component({
  selector: 'app-subjects-create',
  templateUrl: './subjects-create.component.html',
  styleUrls: ['./subjects-create.component.css']
})
export class SubjectsCreateComponent implements OnInit {
  subjectNameLabel: string
  subjectCreateError: string
  subjectSubmitButton: string
  subjectsCreateForm: FormGroup;
  @Output() refresh_subjects: EventEmitter<boolean> = new EventEmitter();


  schoolId: string;
  static SubjectsPageComponent: any[] | Type<any>;
  constructor(private fb: FormBuilder,
    private subjectsService: SubjectsServiceService,
    private localUserService: LocalUserService,
    private router: Router,
    private matSnackBar: MatSnackBar
  ) {
    this.subjectCreateError = subjectCreateError
    this.subjectSubmitButton = subjectSubmitButton
    this.subjectNameLabel = subjectNameLabel
  }
  ngOnInit(): void {

    this.schoolId = this.localUserService.getUser().belongs_to_school;
    this.initForm();
  }



  onSubmit() {
    const body: SubjectCreate = {
      name: this.subjectsCreateForm.value.name
    }
    if (this.subjectsCreateForm.valid) {
      this.subjectsService.createSubjects(this.schoolId, body).subscribe(data => {

        this.refresh_subjects.emit(true);

        this.matSnackBar.open("Subjects  create", "success", { duration: 2000 })
        this.reset();

      })
    } else {
      this.matSnackBar.open("Something wrong", "failed", { duration: 2000 })
    }
    // this.router.navigate([''])
  }
  private initForm() {
    this.subjectsCreateForm = this.fb.group({
      name: ['', [Validators.required]],

    })
  }
  // get form controls for validations
  get f() {
    return this.subjectsCreateForm.controls;
  }
  reset() {
    this.subjectsCreateForm.reset();
  }
}
