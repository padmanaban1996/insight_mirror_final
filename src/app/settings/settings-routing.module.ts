import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AdminThemeComponent } from '../admin-theme/admin-theme.component';
import { AdminListComponent } from '../admin/admin-list/admin-list.component';
import { ClassesListComponent } from '../classes/classes-list/classes-list.component';
import { settingsNavLabel1, settingsNavLabel2, settingsNavLabel3, settingsNavLabel4, settingsNavLabel5, settingsNavLabel6 } from '../constants';
import { AdminPageComponent } from '../pages/admin-page/admin-page.component';
import { ClassesPageComponent } from '../pages/classes-page/classes-page.component';
import { SubjectsPageComponent } from '../pages/subjects-page/subjects-page.component';
import { SchoolSettingsComponent } from '../school/school-settings/school-settings.component';
import { SubjectsListComponent } from '../subjects/subjects-list/subjects-list.component';
import { SubscriptionComponent } from '../subscription/subscription/subscription.component';
import { SettingsComponent } from './settings.component';
settingsNavLabel1
settingsNavLabel2
settingsNavLabel3
settingsNavLabel4
settingsNavLabel5
settingsNavLabel6
const routes: Routes = [
  {
    path: '',
    children: [{
      path: 'page',
      component: SettingsComponent,
      children: [
        { path: '', redirectTo: 'admins', pathMatch: 'full' },
        {
          path: 'admins',
          data: { label: settingsNavLabel1 },
          component: AdminPageComponent
        },
        {
          path: 'student',
          loadChildren: () => import('../student/student.module').then(m => m.StudentModule),
          data: { label: settingsNavLabel2 }
        },
        {
          path: 'teacher',
          data: { label: settingsNavLabel3 },
          loadChildren: () => import('../teacher/teacher.module').then(m => m.teacherModule)
        },
        {
          path: 'classes',
          data: { label: settingsNavLabel4 },
          component: ClassesPageComponent
        },
        // {
        //   path: 'subjects',
        //   data: { label: settingsNavLabel5 },
        //   component: SubjectsPageComponent
        // },
        {
          path: 'subscription',
          data: { label: settingsNavLabel6 },
          component: SubscriptionComponent
        },
      ]
    },

    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SettingsRoutingModule { }
