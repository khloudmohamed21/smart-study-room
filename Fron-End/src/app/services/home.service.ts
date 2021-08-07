import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class HomeService {

  baseURL ='http://localhost:3000/';

  constructor(private _HttpClient:HttpClient) { }

  getAllData():Observable<any>
  {
    let token = localStorage.getItem('TOKEN');
    return this._HttpClient.get(this.baseURL+'home',{ 
      headers:new HttpHeaders({
        'token': `${token}`,
      })
    })

  }

  getAllUnConfirmedData():Observable<any>
  {
    let token = localStorage.getItem('TOKEN');
    return this._HttpClient.get(this.baseURL+'unConfirmed',{ 
      headers:new HttpHeaders({
        'token': `${token}`,
      })
    })

  }
  search(data:any):Observable<any>
  {
    let token = localStorage.getItem('TOKEN');
    return this._HttpClient.post(this.baseURL+'search',data,{ 
      headers:new HttpHeaders({
        'token': `${token}`,
      })
    })

  }
  searchCourse(data:any):Observable<any>
  {
    let token = localStorage.getItem('TOKEN');
    return this._HttpClient.post(this.baseURL+'searchCourse',data,{ 
      headers:new HttpHeaders({
        'token': `${token}`,
      })
    })

  }
}



