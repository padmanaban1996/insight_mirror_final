import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ListComponent } from './list/list.component';
import { CreateComponent } from './create/create.component';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { QuestionsService } from './questions.service';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { CountdownModule } from 'ngx-countdown';
import { QuestionRoutingModule } from './question-routing.module';
import { MaterialModule } from '../core/material.modute';
import { DataTablesModule } from 'angular-datatables';
import { CoreModule, FlexLayoutModule } from '@angular/flex-layout';



@NgModule({

  imports: [
    CommonModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    CountdownModule,
    NgbModule,
    QuestionRoutingModule,
    MaterialModule,
    FlexLayoutModule,
    DataTablesModule,
    CoreModule


  ],
  declarations: [ListComponent, CreateComponent],
  exports: [ListComponent, CreateComponent],
  providers: [QuestionsService]
})
export class QuestionsModule { }
