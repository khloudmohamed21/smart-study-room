import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';


import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './components/login/login.component';
import { SignUpComponent } from './components/sign-up/sign-up.component';
import { HomeComponent } from './components/home/home.component';
import { UploadComponent } from './components/upload/upload.component';
import { AccountComponent } from './components/account/account.component';
import { CourseDetailsComponent } from './components/course-details/course-details.component';
import { AccountSettingsComponent } from './components/account-settings/account-settings.component';
import { DisplayingContentOfCourseComponent } from './components/displaying-content-of-course/displaying-content-of-course.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { NotfoundComponent } from './components/notfound/notfound.component';
import { IndexComponent } from './components/index/index.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { UpdateComponent } from './components/update/update.component';
import { NotificationComponent } from './components/admin/notification/notification.component';
import { EditcourseComponent } from './components/editcourse/editcourse.component';
import { EditlessonComponent } from './components/editlesson/editlesson.component';
//////////////////////////////
import {VgCoreModule} from '@videogular/ngx-videogular/core';
import {VgControlsModule} from '@videogular/ngx-videogular/controls';
import {VgOverlayPlayModule} from '@videogular/ngx-videogular/overlay-play';
import {VgBufferingModule} from '@videogular/ngx-videogular/buffering';
import { NgxDocViewerModule } from 'ngx-doc-viewer';
import { InstructorOrstudentComponent } from './instructor-orstudent/instructor-orstudent.component';
import { HomeResorcesComponent } from './home-resorces/home-resorces.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    SignUpComponent,
    HomeComponent,
    UploadComponent,
    AccountComponent,
    CourseDetailsComponent,
    AccountSettingsComponent,
    DisplayingContentOfCourseComponent,
    NavbarComponent,
    NotfoundComponent,
    IndexComponent,
    UpdateComponent,
    NotificationComponent,
    EditcourseComponent,
    EditlessonComponent,
    InstructorOrstudentComponent,
    HomeResorcesComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
    FormsModule,
    VgCoreModule,
    VgControlsModule,
    VgOverlayPlayModule,
    VgBufferingModule,
    NgxDocViewerModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
