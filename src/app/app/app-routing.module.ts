import { InjectionToken, NgModule } from '@angular/core';
import { Routes, RouterModule, ActivatedRouteSnapshot } from '@angular/router';

import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { HttpInterceptorService } from '../core/services/http-interceptor.service';
import { AuthGuardService } from '../core/services/auth-guard.service';
import { pathToFileURL } from 'url';
import { AppComponent } from './app.component';
import { AdminSubscritionExpireComponent } from '../admin/admin-subscription-expair.component.ts/admin-subscription-expire.component';

const externalUrlProvider = new InjectionToken('externalUrlRedirectResolver');

const routes: Routes = [
  {
    path: '',
    component: AppComponent,
    children: [

      { path: '', redirectTo: 'schedule', pathMatch: 'full' },

      {
        path: 'questions',
        loadChildren: () => import('../questions/questions.module').then(m => m.QuestionsModule)
      },
      {
        path: 'quiz',
        loadChildren: () => import('../quiz/quiz.module').then(m => m.QuizModule)
      },
      {
        path: 'schedule',
        loadChildren: () => import('../schedule/schedule.module').then(m => m.ScheduleModule)
      },
      {
        path: 'dashboard',
        loadChildren: () => import('../dashboard/dashboard-routing.module').then(m => m.DashboardRoutingModule)
      },
      {
        path: 'settings',
        loadChildren: () => import('../settings/settings-routing.module').then(m => m.SettingsRoutingModule)
      },
      {
        path: 'admincontact', component: AdminSubscritionExpireComponent

      },

    ]
  }

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],

})
export class AppRoutingModule { }
