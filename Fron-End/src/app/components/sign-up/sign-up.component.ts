import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent implements OnInit {

  isMessageSuccess= false;
  failResponse ='';
  responseMessage='';

  constructor(private _AuthService:AuthService, private _Router:Router) { }

  
  signUpForm = new FormGroup({
    fname:new FormControl('',[Validators.required,Validators.pattern(/^([a-zA-Z]+[,.]?[ ]?|[a-z]+['-]?)+$/)]),
    lname:new FormControl('',[Validators.required,Validators.pattern(/^([a-zA-Z]+[,.]?[ ]?|[a-z]+['-]?)+$/)]),
    email:new FormControl('',[Validators.required,Validators.email]),
    password:new FormControl('',[Validators.required,Validators.pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&#])[A-Za-z\d@$!%*?&#]{8,10}$/)]),
    confirmPassword:new FormControl('',Validators.required),
  })
  FormData()
  {
    this._AuthService.signUp(this.signUpForm.value).subscribe(response =>{
      if(response.message == 'valid data'){

        this.isMessageSuccess = true;
        this.signUpForm.reset();
        this.responseMessage =response.message
        this._Router.navigate(['/login'])     
      }
      else{
        this.isMessageSuccess = false;
        this.failResponse = response.message
      }
    })    
  }

  ngOnInit(): void {
  }

}
