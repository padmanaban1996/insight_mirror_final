
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuardService } from '../core/services/auth-guard.service';
import { studentQuizResultUrl } from '../route-urls';
import { CreateQuizComponent } from './create/create.component';
import { QuizEditComponent } from './quiz-edit/quiz-edit.component';
import { QuizHostComponent } from './quiz-host/quiz-host.component';
import { QuizPageComponent } from './quiz-page/quiz-page.component';
import { QuizSingleComponent } from './quiz-single/quiz-single.component';
import { QuizStudentComponent } from './quiz-student/quiz-student.component';
import { QuiztestComponent } from './quiztest/quiztest.component';
import { SingleQuizResultComponent } from './single-quiz-result/single-quiz-result.component';
import { StudentsQuizResultComponent } from './students-quiz-result/students-quiz-result.component';

//shedule routes
const routes: Routes = [

    {
        path: '',
        canActivate: [AuthGuardService],
        children: [

            {
                path: 'list',
                component: QuizPageComponent,
                canActivate: [AuthGuardService]
            },
            {
                path: 'host',
                component: QuizHostComponent,
                canActivate: [AuthGuardService]
            },

            {
                path: 'edit',
                component: QuizEditComponent,
                canActivate: [AuthGuardService]
            },
            {
                path: 'create',
                component: CreateQuizComponent,
                canActivate: [AuthGuardService]
            },

            {
                path: 'student-test',
                component: QuizStudentComponent,
                canActivate: [AuthGuardService]
            },
            //below has query params of quiz id and participant id
            {
                path: 'result',
                component: SingleQuizResultComponent,
                canActivate: [AuthGuardService]
            },
            {
                path: 'student_result/:id1/:id2',
                component: StudentsQuizResultComponent,
                canActivate: [AuthGuardService]
            },
            {
                path: 'single/:id',
                component: QuizSingleComponent,
                canActivate: [AuthGuardService]
            }

        ]
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],

})
export class QuizRoutingModule { }
