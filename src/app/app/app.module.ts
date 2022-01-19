import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { QuestionsModule } from '../questions/questions.module';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { QuizModule } from '../quiz/quiz.module';
import { NgSelectModule } from '@ng-select/ng-select';
import { CountdownModule } from 'ngx-countdown';
import { AuthModule } from '../auth/auth.module';
import { CoreModule } from '../core/core.module';
import { ScheduleModule } from '../schedule/schedule.module';
import { HomeComponent } from '../pages/home/home.component';
import { ExternalUrlDirective } from '../external-url-redirect';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ScheduleRoutingModule } from '../schedule/schedule-routing.module';
import { QuizRoutingModule } from '../quiz/quiz-routing.module';
import { NavBarComponent } from '../nav-bar/nav-bar.component';
import { WhiteboardComponent } from '../whiteboard/whiteboard.component';
import { PortalModule } from '@angular/cdk/portal';
import { NgWhiteboardModule } from 'ng-whiteboard';
import { ToastrModule } from 'ngx-toastr';
import { HttpInterceptorService } from '../core/services/http-interceptor.service';
import { MaterialModule } from '../core/material.modute';
import { TopBarComponent } from '../top-bar/top-bar.component';
import { NgxPaginationModule } from 'ngx-pagination';
import { DashboardModule } from '../dashboard/dashboard.module';
import { SettingsModule } from '../settings/settings.module';
import { DataTablesModule } from 'angular-datatables';
import { ReusableComponentsModule } from '../components/reusable.module';
import { HashLocationStrategy, LocationStrategy } from '@angular/common';
import { AdminThemeComponent } from '../admin-theme/admin-theme.component';
import { AdminThemeModule } from '../admin-theme/admin-theme-module';
import { ShortNamePipe } from '../core/services/short-name';
import { ColorPickerModule } from 'ngx-color-picker';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    ExternalUrlDirective,
    NavBarComponent,
    WhiteboardComponent,
    TopBarComponent,
    ShortNamePipe,


  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    DataTablesModule,
    ReactiveFormsModule,
    FormsModule,
    NgbModule,
    NgSelectModule,
    QuestionsModule,
    CountdownModule,
    QuizModule,
    AuthModule,
    ScheduleModule,
    CoreModule,
    ScheduleRoutingModule,
    QuizRoutingModule,
    NgWhiteboardModule,
    PortalModule,
    MaterialModule,
    NgxPaginationModule,
    DashboardModule,
    SettingsModule,
    ReusableComponentsModule,
    AdminThemeModule,
    ColorPickerModule
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: HttpInterceptorService, multi: true },
    { provide: LocationStrategy, useClass: HashLocationStrategy }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
