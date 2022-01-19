import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { HttpClientModule } from '@angular/common/http';
import { NgSelectModule } from '@ng-select/ng-select';
import { FormComponent } from './form/form.component';
import { ScheduleUiComponent } from './schedule-ui/schedule-ui.component';
import { ScheduleService } from './schedule.service';
import { ScheduleRoutingModule } from './schedule-routing.module';
import { MaterialModule } from '../core/material.modute';
import { AttendenceSummaryComponent } from '../attendence-summary/attendence-summary.component';
import { AmazingTimePickerModule } from 'amazing-time-picker';
import { LiveclassTemplateService } from '../liveclass-template/liveclass-template.service';
import { ReusableComponentsModule } from '../components/reusable.module';
import { CoreModule } from '../core/core.module';
import { DataTablesModule } from 'angular-datatables';


@NgModule({
  declarations: [FormComponent, ScheduleUiComponent, AttendenceSummaryComponent],
  exports: [FormComponent, ScheduleUiComponent, AttendenceSummaryComponent],
  imports: [
    CommonModule,
    HttpClientModule,
    NgSelectModule,
    FormsModule,
    NgbModule,
    ReactiveFormsModule,
    ScheduleRoutingModule,
    MaterialModule,
    ReusableComponentsModule,
    AmazingTimePickerModule,
    CoreModule,
    DataTablesModule,
  ],
  providers: [ScheduleService, LiveclassTemplateService]
})
export class ScheduleModule { }
