import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {

  baseURL ='http://localhost:3000/';


  constructor(private _HttpClient:HttpClient) { }


  updateNotificationResourse(id:any):Observable<any>
  {
    let data ={
      id
    }
    let token = localStorage.getItem('TOKEN');
    
    return this._HttpClient.put(this.baseURL+'updatenotification',data, { 
      headers:new HttpHeaders({
        'token': `${token}`,
    })
  });
  }
  deleteResourse(id:any):Observable<any>
  {
  
    let token = localStorage.getItem('TOKEN');
    
    return this._HttpClient.delete(this.baseURL+`deleteresourse/${id}`, { 
      headers:new HttpHeaders({
        'token': `${token}`,
    })
  });
  }
}
