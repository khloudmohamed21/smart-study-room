import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CourseDetailsService {

  baseURL ='http://localhost:3000/';

  constructor(private _HttpClient:HttpClient) { }

  getCourseDetails(id:any):Observable<any>
  {    
    let token = localStorage.getItem('TOKEN');
    
    return this._HttpClient.get(this.baseURL+`coursedetails/${id}`,{ 
      headers:new HttpHeaders({
        'token': `${token}`,
      })
    })

  }
  getLessonDetails(id:any):Observable<any>
  {    
    let token = localStorage.getItem('TOKEN');
    
    return this._HttpClient.get(this.baseURL+`lessondetails/${id}`,{ 
      headers:new HttpHeaders({
        'token': `${token}`,
      })
    })

  }
  getResourceDetails(id:any):Observable<any>
  {    
    let token = localStorage.getItem('TOKEN');
    
    return this._HttpClient.get(this.baseURL+`resoursedetails/${id}`,{ 
      headers:new HttpHeaders({
        'token': `${token}`,
      })
    })

  }
  addRegistertionCourse(data:any):Observable<any>{

    let token = localStorage.getItem('TOKEN');
    return this._HttpClient.post(this.baseURL+`addregistertionresourse`,data,{ 
      headers:new HttpHeaders({
        'token': `${token}`,
      })
    })
    
  }

  deleteResource(id:any):Observable<any>
  {    
    let token = localStorage.getItem('TOKEN');
    
    return this._HttpClient.delete(this.baseURL+`deleteresourse/${id}`,{ 
      headers:new HttpHeaders({
        'token': `${token}`,
      })
    })

  }
  
  deleteLesson(id:any):Observable<any>
  {    
    let token = localStorage.getItem('TOKEN');
    
    return this._HttpClient.delete(this.baseURL+`deleteLesson/${id}`,{ 
      headers:new HttpHeaders({
        'token': `${token}`,
      })
    })

  }
  
  deleteCourse(id:any):Observable<any>
  {    
    let token = localStorage.getItem('TOKEN');
    
    return this._HttpClient.delete(this.baseURL+`deletecourse/${id}`,{ 
      headers:new HttpHeaders({
        'token': `${token}`,
      })
    })

  }

  deleteRegistertionResourse(id:any):Observable<any>
  {    
    let token = localStorage.getItem('TOKEN');
    
    return this._HttpClient.delete(this.baseURL+`deleteregistertionresourse/${id}`,{ 
      headers:new HttpHeaders({
        'token': `${token}`,
      })
    })

  }

  

}
