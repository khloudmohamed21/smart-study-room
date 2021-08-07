import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HomeService } from '../services/home.service';
import { UploadService } from '../services/upload.service';
import jwt_decode from "jwt-decode";
import { FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-home-resorces',
  templateUrl: './home-resorces.component.html',
  styleUrls: ['./home-resorces.component.css']
})
export class HomeResorcesComponent implements OnInit {

  token:any;
  decoded:any;
  domainList:any;
  courseList:any;
  lessonList:any;
  resourseList:any;
  domainChangeValue:any;
  courseListOfDomainID:any;
  defultValueOfDomain = -1;
  defultValueOfCourse = -1;
  isLoad= false;
  constructor(private _Router: Router, private _HomeService:HomeService, private _UploadService:UploadService ) { 
  
    try {
      this.token = localStorage.getItem("TOKEN");
      this.decoded = jwt_decode(this.token);
    } catch (error) {
      localStorage.clear();
      this._Router.navigate(["/signin"]);
    }

    this.getAllData();

    if (!localStorage.getItem("TOKEN")) {
      this._Router.navigate(["/signin"]);
    }

    this.displayDomain()
    this.search()
  
  }
  getAllData() {
 
    this._HomeService.getAllData().subscribe((res) => {
      console.log(res);
      
      // if (res.message == "success") {
        this.resourseList = res?.resourseList;
        this.courseList = res?.courseList;
        this.lessonList = res?.lessonList;
        this.isLoad = true
    });
  }
  ////////////////////////////////////////////////////
    // display domains
    displayDomain(){
      this._UploadService.displayDomain().subscribe(response =>{
        console.log(response.domainList);
        this.domainList=response.domainList
      })
      }
    ///////////////////////////////////////////////////
    domainChange(e:any){
      this.domainChangeValue= e.target.value
      this.displayCourseDomainID()
      this.defultValueOfCourse = -1;
  
    }
    // display courses
    displayCourseDomainID(){
      let data = {
        domainID:this.domainChangeValue
      }
      this._UploadService.displayCourseDomainID(data).subscribe(response =>{
        this.courseListOfDomainID=response.courseListOfDomainID
      })
    }
    ///////////////////////////////////////////////////
  searchForm = new FormGroup({
    domainID:new FormControl(''),
    courseID:new FormControl(''),
    search:new FormControl(''),
  })

  ///////////////////////////////////////////////////
  search(){
    console.log(this.searchForm.value);
    if(this.searchForm.value.domainID =="" && this.searchForm.value.courseID ==""&& this.searchForm.value.search ==""){
      this.getAllData();

    }else{
      this._HomeService.search(this.searchForm.value).subscribe(res =>{
        this.resourseList = res?.resourseList;
        this.courseList = [];
        this.lessonList = []
                console.log(res);
      })
    }

  }
  ngOnInit(): void {
  }

}
