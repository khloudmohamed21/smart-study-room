import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import jwt_decode from "jwt-decode";
import { Router, ActivatedRoute } from '@angular/router'
import { UpdateService } from 'src/app/services/update.service';
import { CourseDetailsService } from 'src/app/services/course-details.service';

@Component({
  selector: 'app-editlesson',
  templateUrl: './editlesson.component.html',
  styleUrls: ['./editlesson.component.css']
})
export class EditlessonComponent implements OnInit {
  id:any;
  token:any;
  decoded:any;
  courseList:any;
  lessonDetails = {
    title:"",
    desc:"",
    courseID:{
      _id:Number,
    }
  };
  constructor(private route: ActivatedRoute,  private _UpdateService:UpdateService, private _CourseDetailsService:CourseDetailsService, private _Router:Router) { 
    try {
      this.token = localStorage.getItem("TOKEN");
      
      this.decoded = jwt_decode(this.token);      
    } catch (error) {
      localStorage.clear();
    }
    this.route.params.subscribe(params => {
      this.id = params['id']; // (+) converts string 'id' to a number
    });
    this.getLessonDetails()
    this.displayCourse()
  }
  getLessonDetails() {
 
    this._CourseDetailsService.getLessonDetails(this.id).subscribe((res) => {
        console.log(res.lesson.courseID);

          this.lessonDetails = res.lesson 
        
    });
  }
  ///////////////////////////////////////////////////
  displayCourse(){
    this._UpdateService.displayCourse().subscribe(response =>{
      this.courseList=response.courseList

    })
  }
  ///////////////////////////////////////////////////
// upload lesson
lessonData = new FormGroup({
  courseID:new FormControl('',[Validators.required]),
  title:new FormControl('',[Validators.required]),
  desc:new FormControl('',[Validators.required]),
})
FormDataLesson(){
  this._UpdateService.updateLesson(this.lessonData.value, this.id).subscribe(response =>{
    if(response.messages=='lesson updated'){
      this._Router.navigate([`/details/${this.id}`])     
    }
console.log(response);
    
  })
}

///////////////////////////////////////////////////
  ngOnInit(): void {
  }

}
