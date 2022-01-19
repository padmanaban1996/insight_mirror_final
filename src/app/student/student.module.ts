import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StudentCreateComponent } from './student-create/student-create.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from '../core/material.modute';
import { StudentListComponent } from './student-list/student-list.component';
import { StudentRoutingModule } from './student-routing.module';
import { StudentService } from './student.service';
import { UploadStudentsComponent } from './student-upload/student-upload.component';
import { NgSelectModule } from '@ng-select/ng-select';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { CheckFormFieldValidity } from '../core/validators/check-formfieldvalidity.directive';
import { ReusableComponentsModule } from '../components/reusable.module';
import { CoreModule } from '../core/core.module';
import { DataTablesModule } from 'angular-datatables';
import { StudentDetailsComponent } from './student-details/student-details.component';


@NgModule({
  declarations: [StudentCreateComponent, StudentListComponent, StudentDetailsComponent, UploadStudentsComponent],
  exports: [StudentCreateComponent, StudentListComponent, StudentDetailsComponent],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    NgbModule,
    MaterialModule,
    StudentRoutingModule,
    NgSelectModule,
    ReusableComponentsModule,
    CoreModule,
    DataTablesModule



  ],
  providers: [StudentService]
})
export class StudentModule { }
