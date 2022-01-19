import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { classCreateError, classNameLabel, classSubmitButton } from 'src/app/constants';
import { LocalUserService } from 'src/app/core/services/local-user.service';
import { ClassesServiceService } from '../classes-service.service';

@Component({
  selector: 'app-classes-create',
  templateUrl: './classes-create.component.html',
  styleUrls: ['./classes-create.component.css']
})
export class ClassesCreateComponent implements OnInit {
  classCreateError: string
  classNameLabel: string
  classSubmitButton: string
  classesCreateForm: FormGroup;
  @Output() refresh_classes: EventEmitter<boolean> = new EventEmitter();

  schoolId: string;
  constructor(private fb: FormBuilder,
    private classesService: ClassesServiceService,
    private localUserService: LocalUserService,
    private router: Router,
    private matSnackBar: MatSnackBar
  ) {
    this.classCreateError = classCreateError
    this.classNameLabel = classNameLabel
    this.classSubmitButton = classSubmitButton
  }
  ngOnInit(): void {
    this.schoolId = this.localUserService.getUser().belongs_to_school;
    this.initForm();
  }



  onSubmit() {
    const classes = this.classesCreateForm.value;
    classes.belongs_to_school = this.schoolId;

    this.classesService.createClasses(classes).subscribe(data => {
      this.refresh_classes.emit(true);
      this.matSnackBar.open("Classes  create", "success", { duration: 2000 })
      this.reset();
    })
  }


  private initForm() {
    this.classesCreateForm = this.fb.group({
      name: ['', [Validators.required]],
      belongs_to_school: ['']

    })
  }
  get f() {
    return this.classesCreateForm.controls;
  }


  reset() {
    this.classesCreateForm.reset();
  }

}
