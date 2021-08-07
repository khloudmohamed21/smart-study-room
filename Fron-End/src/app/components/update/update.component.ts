import { Component, OnInit, Output } from '@angular/core';
import jwt_decode from "jwt-decode";
import { Router, ActivatedRoute } from '@angular/router'
import { UpdateService } from 'src/app/services/update.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { CourseDetailsService } from 'src/app/services/course-details.service';
import { UploadService } from 'src/app/services/upload.service';

@Component({
  selector: 'app-update',
  templateUrl: './update.component.html',
  styleUrls: ['./update.component.css']
})
export class UpdateComponent implements OnInit {
  resourceDetails = {   domainID:"",
                        courseID:"",
                        lessonID:"" ,
                        title:"",
                        desc:"",
                        keywords:[],
                        resource:""
                    };
  id:any;
  token:any;
  decoded:any;
  resourseUpdated = false;
  courseChangeValue:any;
  courseListOfDomainID:any;
  domainChangeValue :any;
  lessonListOfDomainID:any;
  domainList:any;
  resource:any;
  getResource:any;
  courseListOfDomainIDwithoutChange:any;
  constructor(private route: ActivatedRoute, private _UpdateService:UpdateService, private _CourseDetailsService:CourseDetailsService, private _Router:Router, private _UploadService:UploadService) { 
    try {
      this.token = localStorage.getItem("TOKEN");
      
      this.decoded = jwt_decode(this.token);      
    } catch (error) {
      localStorage.clear();
    }
    this.route.params.subscribe(params => {
      this.id = params['id']; // (+) converts string 'id' to a number
    });
    this.getResourceDetails()
    this.displayDomain()
    this.displayCourseDomainID()

  }
  ///////////////////////////////////////////////////////////////
  domainChange(e:any, title:any,
    desc:any, keywords:any){  
    this.domainChangeValue= e.target.value
    this.resourceDetails = { domainID:e.target.value,
                              courseID:"-1",
                              lessonID:"null" ,
                              title:title,
                              desc:desc,
                              keywords:keywords,
                              resource:""                  
                            };
    this.displayCourseDomainID()
    

  }
  courseChange(e:any, domainID:any, title:any,
    desc:any, keywords:any){
    this.courseChangeValue= e.target.value
    console.log(this.domainChangeValue);
    this.resourceDetails = { domainID:domainID,
      courseID:this.courseChangeValue,
      lessonID:"null" ,
      title:title,
      desc:desc,
      keywords:keywords,                              resource:""                  
                  
    };
    this.displaylessonCourseID()
  }

  /////////////////////////////////////////////////////////////
  // display domains
  displayDomain(){
    this._UploadService.displayDomain().subscribe(response =>{
      this.domainList=response.domainList

    })
  }
  ///////////////////////////////////////////////////
  // display courses when change
  displayCourseDomainID(){
    let data = {
      domainID:this.domainChangeValue
    }
  this._UploadService.displayCourseDomainID(data).subscribe(response =>{
    // console.log(response.courseListOfDomainID);
    this.courseListOfDomainIDwithoutChange=response.courseListOfDomainID

  })
  }
  ///////////////////////////////////////////////////

  // display lessons
  displaylessonCourseID(){
    let data = {
      courseID:this.courseChangeValue
    }
  this._UploadService.displayLessonDependingCourseID(data).subscribe(response =>{
    this.lessonListOfDomainID=response.lessonListOfDomainID

  })
  }
  ///////////////////////////////////////////////////
  getResourceDetails() {    
      
    this._CourseDetailsService.getResourceDetails(this.id).subscribe((res) => {
      this.resourceDetails = res.resourse
      
      var ret = this.resourceDetails.resource.indexOf('-');
                
      this.getResource = this.resourceDetails.resource.slice(ret+1,this.resourceDetails.resource.length);
      // console.log(this.resourceDetails.resource);
      
      
      let data = {
          domainID:this.resourceDetails.domainID
        }
        this._UploadService.displayCourseDomainID(data).subscribe(response =>{
        this.courseListOfDomainIDwithoutChange=response.courseListOfDomainID
        let data = {
          courseID:this.resourceDetails.courseID
        }
      this._UploadService.displayLessonDependingCourseID(data).subscribe(response =>{
        this.lessonListOfDomainID=response.lessonListOfDomainID
      
      })
    })

    });
  }

  uploadresource(event:any){
    if(event.target.files.length > 0){
      const file = <File>event.target.files[0];
      this.resource = file;
      this.getResource = file.name
    }
    console.log(this.resource);
    
  }
  updateresourse = new FormGroup({
    domainID:new FormControl('',[Validators.required]),
    courseID:new FormControl('',[Validators.required]),
    title:new FormControl('',[Validators.required]),
    keywords:new FormControl('',[Validators.required]),
    desc:new FormControl('',[Validators.required]),
    lessonID:new FormControl(''),
    resource:new FormControl('',[Validators.required])
  })
  FormData()
  {    
    console.log(this.resource);
    
    const formData = new FormData();

    formData.append('domainID', this.updateresourse.value.domainID);
    formData.append('courseID', this.updateresourse.value.courseID);
    formData.append('title', this.updateresourse.value.title);
    formData.append('keywords', this.updateresourse.value.keywords);
    formData.append('desc', this.updateresourse.value.desc);
    formData.append('lessonID', this.updateresourse.value.lessonID);
    formData.append('resource', this.resource);

    this._UpdateService.updateResourse(formData, this.id).subscribe(res =>{      
      if(res.message == "resourse updated"){
        this._Router.navigate([`/details/${this.id}`])     
        this.resourseUpdated=true
      }
     })
  }

  ngOnInit(): void {

  }

}
