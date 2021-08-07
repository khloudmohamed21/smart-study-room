import { Component, OnInit } from '@angular/core';
import jwt_decode from "jwt-decode";
import { Router, ActivatedRoute } from '@angular/router'
import { UploadService } from 'src/app/services/upload.service';
import { AccountService } from 'src/app/services/account.service';
@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.css']
})
export class AccountComponent implements OnInit {
  id:any;
  resourseNull=false;
  token:any;
  decoded:any;
  uploadedData:any;
  registeredData:any;
  userData:any;
  lessonList:any;
  courseList:any;
  user:any;
  isLoad = false;
  constructor(private route: ActivatedRoute, private _UploadService:UploadService, private _AccountService:AccountService) {
    try {
      this.token = localStorage.getItem("TOKEN");
      
      this.decoded = jwt_decode(this.token);      
    } catch (error) {
      localStorage.clear();
    }

    this.route.params.subscribe(params => {
      this.id = params['id']; // (+) converts string 'id' to a number
    });
    this.uploadedCourses()
    this.uploadedLessons()
    this.uploadedResources()
    // this.registeredCourses()
    this.displayAcoountSettings()
  }
  uploadedCourses() {
 
    this._UploadService.uploadedCourses(this.decoded.user_id).subscribe((res) => {
      this.courseList = res.courseList
    });
  }
  uploadedResources() {
 
    this._UploadService.uploadedResource(this.decoded.user_id).subscribe((res) => {
      this.uploadedData = res.resourseList
      this.isLoad =true
    });
  }
  uploadedLessons() {
 
    this._UploadService.uploadedLesson(this.decoded.user_id).subscribe((res) => {
      this.lessonList = res.lessonList
    });
  }
  ///////////////////////////////////////////////////////////////////////////////////
  // registeredCourses() {
 
  //   this._UploadService.registeredCourses(this.decoded.user_id).subscribe((res) => {
  //     this.registeredData = res.registertionResourseList
  //     if(this.registeredData.resourseList.resourseID == null){
  //       this.resourseNull= true
  //     }
  //     console.log(res);
      
  //   });
  // }
  displayAcoountSettings(){
    this._AccountService.displayAcoountSettings(this.decoded.user_id).subscribe((res) => {
      this.user = res.user
      console.log(this.user);
      
    });
  }

  ngOnInit(): void {
  }

}
