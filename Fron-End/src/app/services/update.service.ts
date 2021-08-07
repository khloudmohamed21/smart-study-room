import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UpdateService {

  baseURL ='http://localhost:3000/';

  constructor(private _HttpClient:HttpClient) { }

  // updateCourse(data:any,id: any):Observable<any>{
    
  //   let token = localStorage.getItem('TOKEN');
  //   return this._HttpClient.put(this.baseURL+`updateresourse/${id}`,data,{ 
  //     headers:new HttpHeaders({
  //       'token': `${token}`,
  //     })
  //   })    
  // }
  displayCourse():Observable<any>{
    
    let token = localStorage.getItem('TOKEN');
    return this._HttpClient.get(this.baseURL+`displaycourse`,{ 
      headers:new HttpHeaders({
        'token': `${token}`,
      })
    })    
  }
  


  updateResourse(data:any,id: any):Observable<any>{
    
    let token = localStorage.getItem('TOKEN');
    return this._HttpClient.put(this.baseURL+`updateresourse/${id}`,data,{ 
      headers:new HttpHeaders({
        'token': `${token}`,
      })
    })    
  }

  updateCourse(data:any,id: any):Observable<any>{
    
    let token = localStorage.getItem('TOKEN');
    return this._HttpClient.put(this.baseURL+`updatecourse/${id}`,data,{ 
      headers:new HttpHeaders({
        'token': `${token}`,
      })
    })    
  }
  ///////////////////////////////////////////////////////
  updateLesson(data:any,id: any):Observable<any>{
    
    let token = localStorage.getItem('TOKEN');
    return this._HttpClient.put(this.baseURL+`updatelesson/${id}`,data,{ 
      headers:new HttpHeaders({
        'token': `${token}`,
      })
    })    
  }

}
