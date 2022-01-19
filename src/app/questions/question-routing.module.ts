import { createComponent } from '@angular/compiler/src/core';
import { NgModule } from '@angular/core';
import { Routes, RouterModule, ActivatedRouteSnapshot } from '@angular/router';
import { AuthGuardService } from '../core/services/auth-guard.service';
import { QuizEditComponent } from '../quiz/quiz-edit/quiz-edit.component';
import { ListComponent } from './list/list.component';
import { SingleQuestionComponent } from './single-question/single-question.component';

//question routes
const routes: Routes = [

    {
        path: '',
        canActivate: [AuthGuardService],
        children: [
            {
                path: 'list',
                component: ListComponent
            },

            {
                path: 'create',
                component: QuizEditComponent,
                canActivate: [AuthGuardService],

            },

            {
                path: 'single',
                component: SingleQuestionComponent
            },
        ]
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],

})
export class QuestionRoutingModule { }
