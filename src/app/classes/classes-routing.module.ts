import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ClassesCreateComponent } from './classes-create/classes-create.component';
import { ClassesComponent } from './classes.component';

const routes: Routes = [
  {
    path: '',
    component: ClassesComponent,
    children: [

      {
        path: 'create',
        component: ClassesCreateComponent
      },
      {
        path: 'list',
        component: ClassesCreateComponent

      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ClassesRoutingModule { }
