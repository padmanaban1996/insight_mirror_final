import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SubjectsRoutingModule } from './subjects-routing.module';
import { SubjectsComponent } from './subjects.component';
import { SubjectsListComponent } from './subjects-list/subjects-list.component';
import { SubjectsCreateComponent } from './subjects-create/subjects-create.component';
import { MaterialModule } from '../core/material.modute';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ReusableComponentsModule } from '../components/reusable.module';
import { CoreModule } from '../core/core.module';
import { DataTablesModule } from 'angular-datatables';
import { SubjectsPageComponent } from '../pages/subjects-page/subjects-page.component';


@NgModule({
  declarations: [SubjectsComponent, SubjectsListComponent, SubjectsCreateComponent, SubjectsPageComponent],
  exports: [SubjectsComponent, SubjectsListComponent, SubjectsCreateComponent, SubjectsPageComponent],
  imports: [
    CommonModule,
    SubjectsRoutingModule,
    MaterialModule,
    ReactiveFormsModule,
    FormsModule,
    NgbModule,
    ReusableComponentsModule,
    CoreModule,
    DataTablesModule
  ]
})
export class SubjectsModule { }
