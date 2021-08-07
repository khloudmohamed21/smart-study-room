import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { UploadService } from 'src/app/services/upload.service';
import jwt_decode from "jwt-decode";

@Component({
  selector: 'app-upload',
  templateUrl: './upload.component.html',
  styleUrls: ['./upload.component.css']
})
export class UploadComponent implements OnInit {
  
  images: any;
  resource:any;
  token:any;
  decoded:any;
  domainList:any;
  courseList:any;
  addDomainDone = false;
  addCourseDone = false;
  addLessonDone = false;
  uploadResourseDone = false;
  resourseUndefined = false;
  defultValueOfDomain = -1;
  defultValueOfCourse = -1;
  defultValueOfLesson = -1;
  domainChangeValue :any;
  courseChangeValue:any;
  courseListOfDomainID:any;
  lessonListOfDomainID :any;
  constructor( private _UploadService:UploadService) {

    try {
      this.token = localStorage.getItem("TOKEN");
      
      this.decoded = jwt_decode(this.token);
      console.log(this.decoded.user_id);
      
    } catch (error) {
      localStorage.clear();
    }
    this.displayDomain()
    this.displayCourse()

  }
  domainChange(e:any){
    this.domainChangeValue= e.target.value
    this.displayCourseDomainID()
    this.defultValueOfCourse = -1;
  
  }
  courseChange(e:any){
    this.courseChangeValue= e.target.value
    this.displaylessonCourseID()
    this.defultValueOfLesson = -1;
  }

// upload domain
  uploadDomain = new FormGroup({
    title:new FormControl('',[Validators.required]),
    desc:new FormControl('',[Validators.required]),
  })
  FormDataDomain(){
    this._UploadService.addDomain(this.uploadDomain.value).subscribe(response =>{
      console.log(response);
      if(response.message=='add domain done'){
        this.addDomainDone =true;
        this.uploadDomain.reset();
        this.reloadCurrentPage()

      }
      
    })
  }
//////////////////////////////////////////////////
// display domains
  displayDomain(){
    this._UploadService.displayDomain().subscribe(response =>{
      console.log(response.domainList);
      this.domainList=response.domainList

    })
  }
///////////////////////////////////////////////////
// display domains
  displayCourseDomainID(){
    let data = {
      domainID:this.domainChangeValue
    }
  this._UploadService.displayCourseDomainID(data).subscribe(response =>{
    console.log(response.courseListOfDomainID);
    this.courseListOfDomainID=response.courseListOfDomainID

  })
}
///////////////////////////////////////////////////
// upload course
  uploadCourse = new FormGroup({
    domainID:new FormControl('',[Validators.required]),
    title:new FormControl('',[Validators.required]),
    desc:new FormControl('',[Validators.required]),
    userID:new FormControl('',[Validators.required]),
    Objective:new FormControl('',[Validators.required]),
  })
  FormDataCourse(){
    this._UploadService.addCourse(this.uploadCourse.value).subscribe(response =>{
      if(response.message=='add course done'){
        this.addCourseDone =true;
        this.uploadCourse.reset();
        this.defultValueOfDomain = -1;
        this.reloadCurrentPage()

      }
      
    })
  }
///////////////////////////////////////////////////
// display courses
  displayCourse(){
    this._UploadService.displayCourse().subscribe(response =>{
      console.log(response.courseList);
      this.courseList=response.courseList
    })
  }
///////////////////////////////////////////////////
// upload lesson
  lessonData = new FormGroup({
    courseID:new FormControl('',[Validators.required]),
    title:new FormControl('',[Validators.required]),
    desc:new FormControl('',[Validators.required]),
    userID:new FormControl('',[Validators.required]),
  })
  FormDataLesson(){
    this._UploadService.addLesson(this.lessonData.value).subscribe(response =>{
      if(response.message=='add lesson done'){
        this.addLessonDone =true;
        this.lessonData.reset();
        this.defultValueOfCourse = -1;

      }
  console.log(response);
      
    })
  }

///////////////////////////////////////////////////
// upload resourse
  uploadresourse = new FormGroup({
    domainID:new FormControl('',[Validators.required]),
    courseID:new FormControl('',[Validators.required]),
    title:new FormControl('',[Validators.required]),
    keywords:new FormControl('',[Validators.required]),
    desc:new FormControl('',[Validators.required]),
    lessonID:new FormControl(''),
    resource:new FormControl('',[Validators.required])
  })
  uploadresource(event:any){
    if(event.target.files.length > 0){
      const file = <File>event.target.files[0];
      this.resource = file;
    }
    console.log(this.resource);
    
  }
  FormData()
  {    
    const formData = new FormData();
    formData.append('domainID', this.uploadresourse.value.domainID);
    formData.append('courseID', this.uploadresourse.value.courseID);
    formData.append('lessonID', this.uploadresourse.value.lessonID);
    formData.append('title', this.uploadresourse.value.title);
    formData.append('keywords', this.uploadresourse.value.keywords);
    formData.append('desc', this.uploadresourse.value.desc);
    formData.append('userID', this.decoded.user_id);
    formData.append('resource', this.resource);    

    this._UploadService.uploadResourse(formData).subscribe(res =>{
      if(res.message == 'upload resourse done'){
        
        this.uploadResourseDone = true
        this.defultValueOfDomain -1;
        this.defultValueOfCourse = -1;
        this.defultValueOfLesson = -1;
        this.uploadresourse.reset();
      }else if(res.message == 'file undefined'){
        this.resourseUndefined=true;
      }
      this.reloadCurrentPage()
    })
  }
///////////////////////////////////////////////////
// display lessons
displaylessonCourseID(){
  let data = {
    courseID:this.courseChangeValue
  }
this._UploadService.displayLessonDependingCourseID(data).subscribe(response =>{
  console.log(response.lessonListOfDomainID);
  this.lessonListOfDomainID=response.lessonListOfDomainID

})
}
///////////////////////////////////////////////////
  ngOnInit(): void {
  }
  reloadCurrentPage() {
  
    window.location.reload() ;
   }

}
