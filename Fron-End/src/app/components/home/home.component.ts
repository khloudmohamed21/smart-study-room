import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HomeService } from 'src/app/services/home.service';
import jwt_decode from "jwt-decode";
import { UploadService } from 'src/app/services/upload.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  defultValueOfDomain = -1;
  defultValueOfCourse = -1;
  domainList:any;
  courseList:any;
  lessonList:any;
  resourseList:any;
  token:any;
  decoded:any;
  domainChangeValue:any;
  courseListOfDomainID:any;
  isLoad = false;
  dNone = false;
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
  searchForm = new FormGroup({
    domainID:new FormControl(''),
    search:new FormControl(''),
  })
  // display domains
  displayDomain(){
    this._UploadService.displayDomain().subscribe(response =>{
      console.log(response.domainList);
      this.domainList=response.domainList
    })
    }

  search(){
    console.log(this.searchForm.value);
    if(this.searchForm.value.domainID =="" && this.searchForm.value.search ==""){
      this.getAllData();

    }else if(this.searchForm.value.search ==""){
      this._HomeService.searchCourse(this.searchForm.value).subscribe(res =>{
        this.resourseList = [];
        this.courseList = res?.courseList;
        this.lessonList = []
        console.log(res);
      })
    }else{
      this._HomeService.searchCourse(this.searchForm.value).subscribe(res =>{
        this.resourseList = [];
        this.courseList = res?.courseList;
        this.lessonList = []
        console.log(res);
      })
    }

  }


  ngOnInit(): void {
  }

}
