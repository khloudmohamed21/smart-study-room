import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AccountService {

  baseURL ='http://localhost:3000/';

  constructor(private _HttpClient:HttpClient) { }
  displayAcoountSettings(id:any):Observable<any>
  {
    let token = localStorage.getItem('TOKEN');

    return this._HttpClient.get(this.baseURL+`displayaccountsettings/${id}`,{ 
      headers:new HttpHeaders({
        'token': `${token}`,
      })
    })
  }

  updataAccount(data:any, id:any):Observable<any>
  {
    let token = localStorage.getItem('TOKEN');

    return this._HttpClient.put(this.baseURL+`updateaccountsettings/${id}`,data,{ 
      headers:new HttpHeaders({
        'token': `${token}`,
      })
    })
  }

  updatePassword(data:any):Observable<any>
  {
    let token = localStorage.getItem('TOKEN');

    return this._HttpClient.put(this.baseURL+`updatepassword`,data,{ 
      headers:new HttpHeaders({
        'token': `${token}`,
      })
    })
  }
  deleteImage():Observable<any>
  {
    let token = localStorage.getItem('TOKEN');

    return this._HttpClient.delete(this.baseURL+`deleteimageaccountsettings`,{ 
      headers:new HttpHeaders({
        'token': `${token}`,
      })
    })
  }
}
