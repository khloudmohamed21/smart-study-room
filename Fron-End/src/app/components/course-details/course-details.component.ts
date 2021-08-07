import { Component, Input, OnInit } from '@angular/core';
import jwt_decode from "jwt-decode";
import { CourseDetailsService } from 'src/app/services/course-details.service';
import { Router, ActivatedRoute } from '@angular/router';
declare var $: any;

@Component({
  selector: 'app-course-details',
  templateUrl: './course-details.component.html',
  styleUrls: ['./course-details.component.css']
})
export class CourseDetailsComponent implements OnInit {

  id:any;
  course=false;
  lesson=false;
  resource=false;
  courseDetails:any;
  resourseDetails:any;
  lessonDetails:any;
  lessonsRcourse:any;
  resourseRlessonRresourse:any;
  resourceRlesson:any;
  token:any;
  decoded:any;
  btnAddMe:Boolean = true;
  resourseNotFound = false
  resourseDeleted:Boolean = true;
  registertionDone:Boolean = false;
  isLoad=false
  constructor( private _CourseDetailsService:CourseDetailsService,  private route: ActivatedRoute, private _Router:Router) { 
    try {
      this.token = localStorage.getItem("TOKEN");
      
      this.decoded = jwt_decode(this.token);
      console.log(this.decoded);
      
    } catch (error) {
      localStorage.clear();
    }
    this.route.params.subscribe(params => {
      this.id = params['id']; // (+) converts string 'id' to a number
    });
    this.getCourseDetails();

  }


  getCourseDetails() {
    this._CourseDetailsService.getCourseDetails(this.id).subscribe((res) => {
      if(res.message == "course not found"){
        this._CourseDetailsService.getLessonDetails(this.id).subscribe((res) => {
          if(res.message == "lesson not found"){
              this._CourseDetailsService.getResourceDetails(this.id).subscribe((res) => {
                if(res.message == "resourse not found"){
                  this.resourseNotFound=true
                }else{
                    this.resource = true;
                    this.resourseDetails = res.resourse
                    this.isLoad = true

                    if(this.decoded.user_id == res.resourse.userID._id || this.decoded.userRole == "admin"){
                      this.btnAddMe = false
                    }
                    console.log(res);
                }
              });
          }else{
            this.lesson = true;
            this.lessonDetails = res.lesson
            this.resourceRlesson = res.resourses
            this.isLoad = true            
            if(this.decoded.user_id == res.lesson.userID._id || this.decoded.userRole == "admin"){
              this.btnAddMe = false
            }
          }

        });
      }else{
        this.course = true;
        this.courseDetails = res.course
        this.lessonsRcourse = res.lessons
        this.resourseRlessonRresourse = res.resourses
        this.isLoad = true
        if(this.decoded.user_id == res.course.userID._id || this.decoded.userRole == "admin"){
          this.btnAddMe = false
        }
      }
    });
  }
  getLessonDetails() {
 
    this._CourseDetailsService.getLessonDetails(this.id).subscribe((res) => {

    });
  }
  getReaourceDetails() {
 
    this._CourseDetailsService.getResourceDetails(this.id).subscribe((res) => {
      if(res.message == "resourse not found"){
        this.resourseNotFound=true
      }
      
        this.resourseDetails = res.resourse
      if(this.decoded.user_id == res.resourse.userID._id || this.decoded.userRole == "admin"){
        this.btnAddMe = false
      }
    
      console.log(res);
    });
  }
  addRegistertionCourse(){
    let data ={ 
      id : this.id
    }
    this._CourseDetailsService.addRegistertionCourse(data).subscribe((res) => {
      if(res.message == "u registeration done"){
        this.registertionDone = true;
        this.btnAddMe = false
      }else if(res.message == "u already registered"){
        this.btnAddMe = false
      }
      console.log(res);
    });
  }
  delete(){
    
    this._CourseDetailsService.deleteResource(this.id).subscribe((res) => {
      console.log(res);
      
      if(res.messages =='resourse deleted'){
        this.resourseNotFound=true
        this.resourseDeleted = false
        this.getCourseDetails();
        this.deleteRegistertionResourse()
      }else{

        this._CourseDetailsService.deleteLesson(this.id).subscribe((res) => {
          console.log(res);
          
          if(res.messages =='lesson deleted'){
            this.resourseNotFound=true
            this.resourseDeleted = false
            this.getCourseDetails();
            this.deleteRegistertionResourse()
          }else{
    
            
        this._CourseDetailsService.deleteCourse(this.id).subscribe((res) => {
          console.log(res);
          
          if(res.messages =='course deleted'){
            this.resourseNotFound=true
            this.resourseDeleted = false
            this.getCourseDetails();
            this.deleteRegistertionResourse()
          }
        });
          }
          
            
        });
      }
        
    });

  }
  deleteRegistertionResourse(){
        //delete from registered course
        this._CourseDetailsService.deleteRegistertionResourse(this.id).subscribe((res) => {
          console.log(res);
       
          // if(res.messages =="resourse not found"){
    
          // }
        });
  }
  ngOnInit(): void {

  }

  reloadCurrentPage(id:any) {
  
    window.location.href = `/details/${id}` ;
   }
}
