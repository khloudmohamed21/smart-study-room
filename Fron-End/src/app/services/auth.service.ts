import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private _HttpClient:HttpClient ) { }

  baseURL ='https://sroom.herokuapp.com/';

  signIn(data: any):Observable<any>
  {
    return this._HttpClient.post(this.baseURL+'handleSignIn', data);
  }
  
  signUp(data: any):Observable<any>
  {
    return this._HttpClient.post(this.baseURL+'handleSignUp', data);
  }
  isLoggedIn()
  {
    return !!localStorage.getItem('TOKEN')
  }

}
