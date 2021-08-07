import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UploadService {

  
  constructor(private _HttpClient:HttpClient ) { }

  baseURL ='http://localhost:3000/';
  ////////////////////////////////////////////////////////////////////////
  uploadResourse(data: any):Observable<any>
  {

    let token = localStorage.getItem('TOKEN');
    
    return this._HttpClient.post(this.baseURL+'uploadresourse', data,{ 
      headers:new HttpHeaders({
        'token': `${token}`,
    })
  });
  }
  uploadedCourses(id:any):Observable<any>{
    let token = localStorage.getItem('TOKEN');
    
    return this._HttpClient.get(this.baseURL+`displayuploadcourse/${id}`, { 
      headers:new HttpHeaders({
        'token': `${token}`,
    })
  });
  }
  uploadedResource(id:any):Observable<any>{
    let token = localStorage.getItem('TOKEN');
    
    return this._HttpClient.get(this.baseURL+`displayuploadresourse/${id}`, { 
      headers:new HttpHeaders({
        'token': `${token}`,
    })
  });
  }
  uploadedLesson(id:any):Observable<any>{
    let token = localStorage.getItem('TOKEN');
    
    return this._HttpClient.get(this.baseURL+`displayuploadlesson/${id}`, { 
      headers:new HttpHeaders({
        'token': `${token}`,
    })
  });
  }
  registeredCourses(id:any):Observable<any>{
    let token = localStorage.getItem('TOKEN');
    
    return this._HttpClient.get(this.baseURL+`displayregistertionresourse/${id}`, { 
      headers:new HttpHeaders({
        'token': `${token}`,
    })
  });
  }
  /////////////////////////////////////////////////////////////////////////
  addDomain(data: any):Observable<any>
  {

    let token = localStorage.getItem('TOKEN');
    
    return this._HttpClient.post(this.baseURL+'adddomain', data,{ 
      headers:new HttpHeaders({
        'token': `${token}`,
    })
  });
  }
  ////////////////////////////////////////////////////////////////////////
  displayDomain():Observable<any>
  {

    let token = localStorage.getItem('TOKEN');
    
    return this._HttpClient.get(this.baseURL+'displayDomains',{ 
      headers:new HttpHeaders({
        'token': `${token}`,
    })
  });
  }
  ////////////////////////////////////////////////////////////////////////
  displayCourseDomainID(domainID:any):Observable<any>
  {

    let token = localStorage.getItem('TOKEN');
    
    return this._HttpClient.post(this.baseURL+'displayCourseDependingOnDomainID',domainID,{ 
      headers:new HttpHeaders({
        'token': `${token}`,
    })
  });
  }
  ////////////////////////////////////////////////////////////////////////
  addCourse(data: any):Observable<any>
  {

    let token = localStorage.getItem('TOKEN');
    
    return this._HttpClient.post(this.baseURL+'addcourse', data,{ 
      headers:new HttpHeaders({
        'token': `${token}`,
    })
  });
  }
  ///////////////////////////////////////////////////////////////////////
  displayCourse():Observable<any>
  {

    let token = localStorage.getItem('TOKEN');
    
    return this._HttpClient.get(this.baseURL+'displaycourse',{ 
      headers:new HttpHeaders({
        'token': `${token}`,
    })
  });
  }
////////////////////////////////////////////////////////////////////////
  addLesson(data: any):Observable<any>
  {
  
    let token = localStorage.getItem('TOKEN');
      
    return this._HttpClient.post(this.baseURL+'addlesson', data,{ 
      headers:new HttpHeaders({
        'token': `${token}`,
    })
  });
  }
///////////////////////////////////////////////////////////////////////
  displayLessonDependingCourseID(courseID:any):Observable<any>
    {
  
      let token = localStorage.getItem('TOKEN');
      
      return this._HttpClient.post(this.baseURL+'displayLessonDependingOnCourseID',courseID,{ 
        headers:new HttpHeaders({
          'token': `${token}`,
      })
    });
  }
}
