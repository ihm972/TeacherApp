import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminViewComponent } from './components/admin-view/admin-view.component';
import { Error404Component } from './components/errors/error404/error404.component';
import { HomeComponent } from './components/home/home.component';
import { AdminStudentListComponent } from './components/admin-student-list/admin-student-list.component';
import { RegisterComponent } from './components/register/register.component';
import { StudentFormComponent } from './components/register/student-form/student-form.component';
import { TeacherFormComponent } from './components/register/teacher-form/teacher-form.component';

const routes: Routes = [
  /* Redirecting the user to the home page if the user enters the root of the application. */
  { path: '', pathMatch: 'full', redirectTo: 'home' },
  /* Telling the router to load the UserListComponent when the user navigates to the home page. */
  { path: 'home', component: HomeComponent },
  { path: 'profile', component: AdminViewComponent },
  { path: 'students', component: AdminStudentListComponent },
  { path: 'registro', component: RegisterComponent, children: [
    { path: 'estudiante', component:StudentFormComponent},
    { path: 'profesor', component:TeacherFormComponent}
  ] },
  { path:'actualizar/estudiante/:studentId', component:StudentFormComponent},
  /* This is a wildcard route. It will match any route that is not defined in the application. */
  { path: '**', component: Error404Component }
];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
