import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  plsConfirmEmail = false;
  emailNotValid = false;
  passNotValid = false;
  inValidData = false;
  constructor(private _AuthService:AuthService, private _Router:Router) { }
  
  signInForm:FormGroup = new FormGroup({
    email:new FormControl('', [Validators.required, Validators.email]),
    password:new FormControl('', [Validators.required])
  })

  signInData(){
    if(this.signInForm.valid){
      this._AuthService.signIn(this.signInForm.value).subscribe(res=>{
        if(res.message == 'done'){
          localStorage.setItem("TOKEN", res.token) 
          this._Router.navigate(['/default'])     
        }else if(res.message=="please confirm u email first  "){
          this.plsConfirmEmail=true;
        }else if(res.message=="invaild email"){
          this.emailNotValid=true
        }else if(res.message == "invaild password"){
          this.passNotValid=true
        }else if(res.message=="in-valid data"){
          this.inValidData=true;
        }
        console.log(res);
      })
    }
  }
  ngOnInit(): void {
  }

}
