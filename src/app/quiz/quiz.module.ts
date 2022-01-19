import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { QuizPageComponent } from './quiz-page/quiz-page.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { QuizService } from './quiz.service';
import { CreateQuizComponent } from './create/create.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { HttpClientModule } from '@angular/common/http';
import { NgSelectModule } from '@ng-select/ng-select';
import { AmazingTimePickerModule } from 'amazing-time-picker';
import { CountdownModule } from 'ngx-countdown';
import { SecondsComponent } from './seconds/seconds.component';
import { QuizListComponent } from './quiz-list/quiz-list.component'
import { QuizEditComponent } from './quiz-edit/quiz-edit.component';
import { QuizHostComponent } from './quiz-host/quiz-host.component';
import { QuizRoutingModule } from './quiz-routing.module';
import { MaterialModule } from '../core/material.modute';
import { SingleQuizResultComponent } from './single-quiz-result/single-quiz-result.component';
import { StudentsQuizResultComponent } from './students-quiz-result/students-quiz-result.component';
import { QuizResultsService } from './quiz-results.service';
import { BrowserModule } from '@angular/platform-browser';
import { FlexLayoutModule } from '@angular/flex-layout';
import { ReusableComponentsModule } from '../components/reusable.module';
import { DataTablesModule } from 'angular-datatables';
import { CoreModule } from '../core/core.module';
import { SingleQuestionComponent } from '../questions/single-question/single-question.component';
import { CapitalizeFirstPipe } from '../core/services/first-letter-upeercase';
import { UploadComponent } from '../questions/upload/upload.component';
import { QuizMcqComponent } from './quiz-mcq2/quiz-mcq2.component';
import { QuizBlanksCreateComponent } from './quiz-blanks-create/quiz-blanks-create.component';
import { QuizPictureMcqComponent } from './quiz-picture-mcq/quiz-picture-mcq.component';
import { QuizParagraphCreateComponent } from './quiz-paragraph-create/quiz-paragraph-create.component';
import { QuizReadingComprehensionComponent } from './quiz-reading-comprehension/quiz-reading-comprehension.component';
import { QuizSingleComponent } from './quiz-single/quiz-single.component';
import { QuizMatchesComponent } from './quiz-matches/quiz-matches.component';
import { ChartsModule } from 'ng2-charts';
import { CarouselModule } from 'ngx-owl-carousel-o';
@NgModule({
  declarations: [QuizPageComponent, CreateQuizComponent, SingleQuizResultComponent, SecondsComponent, UploadComponent, QuizMcqComponent, QuizEditComponent, QuizHostComponent, StudentsQuizResultComponent, QuizListComponent, SingleQuestionComponent, CapitalizeFirstPipe, QuizBlanksCreateComponent, QuizPictureMcqComponent, QuizParagraphCreateComponent, QuizReadingComprehensionComponent, QuizSingleComponent, QuizMatchesComponent],
  exports: [QuizPageComponent, CreateQuizComponent, SingleQuestionComponent],
  imports: [
    CommonModule,
    HttpClientModule,
    NgSelectModule,
    FormsModule,
    NgbModule,
    ReactiveFormsModule,
    CountdownModule,
    QuizRoutingModule,
    MaterialModule,
    FlexLayoutModule,
    ReusableComponentsModule,
    DataTablesModule,
    AmazingTimePickerModule,
    CoreModule,
    CarouselModule,
    ChartsModule,
  ],
  providers: [QuizService, QuizResultsService]
})
export class QuizModule { }
