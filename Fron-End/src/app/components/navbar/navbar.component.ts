import { HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import jwt_decode from "jwt-decode";

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  token:any;
  decoded:any;
  constructor(public _AuthService:AuthService, private _Router:Router) {
    try {
      this.token = localStorage.getItem("TOKEN");
      
      this.decoded = jwt_decode(this.token);
      console.log(this.decoded);
      
    } catch (error) {
      localStorage.clear();
    }
  }
  
  logout()
  {
    localStorage.clear()
    this._Router.navigate(['/login'])
  }
  ngOnInit(): void {
  }

}
