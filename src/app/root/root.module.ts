import { NgModule } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { RootComponent } from './root/root.component';
import { RootRoutingModule } from './root-routing.module';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CoreModule } from '../core/core.module';
import { CountdownGlobalConfig, CountdownModule } from 'ngx-countdown';
import { MaterialModule } from '../core/material.modute';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LiveclassComponent } from '../liveclass-template/liveclass.component';
import { SuperAdminModule } from '../super-admin/super-admin.module';
import { SocketIoModule, SocketIoConfig } from 'ngx-socket-io';
import { environment } from 'src/environments/environment';
import { ScheduleModule } from '../schedule/schedule.module';
import { LivequizTeacherComponent } from '../liveclass-template/livequiz-teacher/livequiz-teacher.component';
import { LivequizStudentComponent } from '../liveclass-template/livequiz-student/livequiz-student.component';
import { LivequizListComponent } from '../liveclass-template/livequiz-list/livequiz-list.component';

import { DataTablesModule } from 'angular-datatables';
import { ResultChartComponent } from '../liveclass-template/result-chart/result-chart.component';
import { ChartsModule } from 'ng2-charts';
import { WindowComponent } from '../new-window.component';
import { ToastrModule } from 'ngx-toastr';
import { ReusableComponentsModule } from '../components/reusable.module';
import { WebcamModule } from 'ngx-webcam';
import { ResetPasswordComponent } from './reset-password/reset-password.component';
import { PreJoinComponent } from '../liveclass-template/pre-join/pre-join.component';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { NgxChartsModule } from '@swimlane/ngx-charts';
import { TimerComponent } from '../liveclass-template/timer';
import { CookieService } from 'ngx-cookie-service';
import { ColorPickerModule } from 'ngx-color-picker';
import { QuiztestComponent } from '../quiz/quiztest/quiztest.component';
import { QuizTeacherComponent } from '../quiz/quiz-teacher/quiz-teacher.component';
import { QuizStudentComponent } from '../quiz/quiz-student/quiz-student.component';
import { EmbedVideo } from 'ngx-embed-video';
import { SingleLiveQuizResultComponent } from '../liveclass-template/single-livequiz-result/single-livequiz-result.component';
import { StudentliveQuizResultComponent } from '../liveclass-template/student-livequiz-result/student-livequiz-result.component';
import { CarouselModule } from 'ngx-owl-carousel-o';
const config: SocketIoConfig = { url: environment.socket_url, options: {} };



@NgModule({
  declarations: [RootComponent, TimerComponent, WindowComponent, QuiztestComponent, QuizTeacherComponent, QuizStudentComponent, LiveclassComponent, LivequizTeacherComponent, LivequizStudentComponent, SingleLiveQuizResultComponent, StudentliveQuizResultComponent, LivequizListComponent, ResultChartComponent, ResetPasswordComponent, PreJoinComponent],
  imports: [
    CommonModule,
    BrowserModule,
    FormsModule,
    WebcamModule,
    ReactiveFormsModule,
    RootRoutingModule,
    CoreModule,
    CountdownModule,
    ChartsModule,
    MaterialModule,
    SuperAdminModule,
    BrowserAnimationsModule,
    DataTablesModule,
    CarouselModule,
    ReusableComponentsModule,
    ToastrModule.forRoot(),
    EmbedVideo.forRoot(),
    SocketIoModule.forRoot(config),
    NgxDatatableModule,
    NgxChartsModule,
    ColorPickerModule,
  ],
  exports: [],
  bootstrap: [RootComponent],
  providers: [DatePipe, CookieService]
})
export class RootModule { }
