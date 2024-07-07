import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { AddTaskComponent } from './MyComponents/add-task/add-task.component';
import { HomeListComponent } from './MyComponents/home-list/home-list.component';

const routes: Routes = [
  { path: 'add', component: AddTaskComponent },
  { path: 'edit/:id', component: AddTaskComponent },
  { path: '', component: HomeListComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
