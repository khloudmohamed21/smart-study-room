import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AccountSettingsComponent } from './components/account-settings/account-settings.component';
import { AccountComponent } from './components/account/account.component';
import { NotificationComponent } from './components/admin/notification/notification.component';
import { CourseDetailsComponent } from './components/course-details/course-details.component';
import { DisplayingContentOfCourseComponent } from './components/displaying-content-of-course/displaying-content-of-course.component';
import { EditcourseComponent } from './components/editcourse/editcourse.component';
import { EditlessonComponent } from './components/editlesson/editlesson.component';
import { HomeComponent } from './components/home/home.component';
import { IndexComponent } from './components/index/index.component';
import { LoginComponent } from './components/login/login.component';
import { NotfoundComponent } from './components/notfound/notfound.component';
import { SignUpComponent } from './components/sign-up/sign-up.component';
import { UpdateComponent } from './components/update/update.component';
import { UploadComponent } from './components/upload/upload.component';
import { AuthGuard } from './guards/auth.guard';
import { HomeResorcesComponent } from './home-resorces/home-resorces.component';
import { InstructorOrstudentComponent } from './instructor-orstudent/instructor-orstudent.component';



const routes: Routes = [
  {path:"", redirectTo:"index", pathMatch:"full"},
  {path:"index", component:IndexComponent},
  {path:"login", component:LoginComponent},
  {path:"signup", component:SignUpComponent},
  {path:"default", canActivate:[AuthGuard],component:InstructorOrstudentComponent},
  {path:"home", canActivate:[AuthGuard], component:HomeComponent},
  {path:"homeResource", canActivate:[AuthGuard], component:HomeResorcesComponent},
  {path:"upload", canActivate:[AuthGuard], component:UploadComponent},
  {path:"update/:id", canActivate:[AuthGuard], component:UpdateComponent},
  {path:"editcourse/:id", canActivate:[AuthGuard], component:EditcourseComponent},
  {path:"editlesson/:id", canActivate:[AuthGuard], component:EditlessonComponent},
  {path:"details/:id", canActivate:[AuthGuard], component:CourseDetailsComponent},
  {path:"content/:id", canActivate:[AuthGuard],component:DisplayingContentOfCourseComponent},
  {path:"account/:id", canActivate:[AuthGuard],component:AccountComponent},
  {path:"accountSettings", canActivate:[AuthGuard],component:AccountSettingsComponent},
  {path:"admin", canActivate:[AuthGuard],component:NotificationComponent},
  {path:"**", component:NotfoundComponent},
];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
