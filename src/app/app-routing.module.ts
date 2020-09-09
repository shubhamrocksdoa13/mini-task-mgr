import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { TaskMgrComponent } from './task-mgr/task-mgr.component'

const routes: Routes = [
  { path : 'task-manager', component: TaskMgrComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
