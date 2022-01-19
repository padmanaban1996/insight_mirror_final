import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ClassesRoutingModule } from './classes-routing.module';
import { ClassesCreateComponent } from './classes-create/classes-create.component';
import { ClassesListComponent } from './classes-list/classes-list.component';
import { ClassesComponent } from './classes.component';
import { MaterialModule } from '../core/material.modute';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ReusableComponentsModule } from '../components/reusable.module';
import { CoreModule } from '../core/core.module';
import { DataTablesModule } from 'angular-datatables';
import { ClassesPageComponent } from '../pages/classes-page/classes-page.component';


@NgModule({
  declarations: [ClassesCreateComponent, ClassesListComponent, ClassesComponent, ClassesPageComponent],
  exports: [ClassesCreateComponent, ClassesListComponent, ClassesComponent, ClassesPageComponent],
  imports: [
    CommonModule,
    ClassesRoutingModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule,
    NgbModule,
    ReusableComponentsModule,
    CoreModule,
    DataTablesModule
  ]
})
export class ClassesModule { }
