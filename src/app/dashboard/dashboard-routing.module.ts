import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AdminDashboadComponent } from './admin-dashboad/admin-dashboad.component';

const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: 'admin',
        component: AdminDashboadComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DashboardRoutingModule { }
