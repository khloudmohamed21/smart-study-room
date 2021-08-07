import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CourseDetailsService } from 'src/app/services/course-details.service';
import jwt_decode from "jwt-decode";

@Component({
  selector: 'app-displaying-content-of-course',
  templateUrl: './displaying-content-of-course.component.html',
  styleUrls: ['./displaying-content-of-course.component.css']
})
export class DisplayingContentOfCourseComponent implements OnInit {
  token:any;
  decoded:any;
  id:any;
  resourseDetails = {
    resource : ""
  };
  baseURL:any;
  d:any;
  getResource:any;
  resourceType:any;
  constructor(private _CourseDetailsService:CourseDetailsService, private route: ActivatedRoute, private _Router:Router) { 

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
    
    
    this.getReaourceDetails()
  }

  getReaourceDetails() {
 
    this._CourseDetailsService.getResourceDetails(this.id).subscribe((res) => {
      // if(res.message == "resourse not found"){
      //   this.resourseNotFound=true
      // }
       ////////////////////////////////////////////////////////////////////
      var type = this.resourseDetails.resource.lastIndexOf('.')
      this.resourceType = this.resourseDetails.resource.slice(type+1,this.resourseDetails.resource.length);
        
        this.resourseDetails = res.resourse
        var ret = this.resourseDetails.resource.indexOf('s');
        this.getResource = this.resourseDetails.resource.slice(ret+2,this.resourseDetails.resource.length);


      

        this.baseURL = `http://localhost:3000/uploads/${this.getResource}`
        console.log(this.baseURL);
        
        this.d = true;
            
        
        
      if(this.decoded.user_id == res.resourse.userID._id || this.decoded.userRole == "admin"){
      }
    
      console.log(res);
    });
  }




  ngOnInit(): void {
  }






}
