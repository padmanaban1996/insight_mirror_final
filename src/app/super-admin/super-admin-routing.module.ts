import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuardService } from '../core/services/auth-guard.service';
import { SuperAdminComponent } from './super-admin.component';

const routes: Routes = [
  {
    path: '',
    children: [

      {
        path: '',
        component: SuperAdminComponent,
      },
      {
        path: 'school',
        loadChildren: () => import('../school/school-routing.module').then(m => m.SchoolRoutingModule)

      },

    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SuperAdminRoutingModule { }
