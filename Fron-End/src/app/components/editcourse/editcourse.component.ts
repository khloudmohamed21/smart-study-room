import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { UpdateService } from 'src/app/services/update.service';
import jwt_decode from "jwt-decode";
import { Router, ActivatedRoute } from '@angular/router'
import { UploadService } from 'src/app/services/upload.service';
import { CourseDetailsService } from 'src/app/services/course-details.service';

@Component({
  selector: 'app-editcourse',
  templateUrl: './editcourse.component.html',
  styleUrls: ['./editcourse.component.css']
})
export class EditcourseComponent implements OnInit {
  id:any;
  token:any;
  decoded:any;
  domainList:any;
  courseDetails ={
    domainID:"",
    title:"",
    desc:"",
    objective:""
  };
  constructor(private _UpdateService:UpdateService, private route: ActivatedRoute,private _UploadService:UploadService,private _CourseDetailsService:CourseDetailsService, private _Router:Router) { 

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
    this.getCourseDetails()
    this.displayDomain()
  }
  
  getCourseDetails() {
    this._CourseDetailsService.getCourseDetails(this.id).subscribe((res) => {
      this.courseDetails = res.course
      console.log(res);
      


    });
  }
  // display domains
  displayDomain(){
    this._UploadService.displayDomain().subscribe(response =>{
      console.log(response.domainList);
      this.domainList=response.domainList

    })
  }
///////////////////////////////////////////////////
// update course
updateCourse = new FormGroup({
  domainID:new FormControl('',[Validators.required]),
  title:new FormControl('',[Validators.required]),
  desc:new FormControl('',[Validators.required]),
  objective:new FormControl('',[Validators.required]),
})
FormDataCourse(){
  
  this._UpdateService.updateCourse(this.updateCourse.value, this.id).subscribe(response =>{
    if(response.messages=='course updated'){
      this._Router.navigate([`/details/${this.id}`])     

    }
    console.log(response);
    
    
  })
}
///////////////////////////////////////////////////
  ngOnInit(): void {
  }

}
