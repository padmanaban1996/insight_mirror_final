import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SchoolCreateComponent } from './school-create/school-create.component';
import { SchoolComponent } from './school.component';

const routes: Routes = [
  {
    path: '',

    children: [
      {
        path: 'page',
        component: SchoolComponent
      },
      {
        path: 'create',
        component: SchoolCreateComponent,
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SchoolRoutingModule { }
