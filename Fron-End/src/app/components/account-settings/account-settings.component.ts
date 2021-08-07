import { Component, OnInit } from '@angular/core';
import { AccountService } from 'src/app/services/account.service';
import jwt_decode from "jwt-decode";
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-account-settings',
  templateUrl: './account-settings.component.html',
  styleUrls: ['./account-settings.component.css']
})
export class AccountSettingsComponent implements OnInit {
  bioInput=false;
  emailInput=false;
  passwordInput=false;
  accountUpdated = false;
  passUpdated = false
  imageDeleted = false
  token:any;
  decoded:any;
  user = {
    email:"",
    fname:"",
    lname:"",
    password:"",
    bio:"",
    image:""
  }
  images:any;
  imagePrefix = 'http://localhost:3000/';

  constructor(private _AccountService:AccountService, private _Router:Router) {

    try {
      this.token = localStorage.getItem("TOKEN");
      
      this.decoded = jwt_decode(this.token);
      console.log(this.decoded);
      
    } catch (error) {
      localStorage.clear();
    }
    this.accountData()
   }

  ngOnInit(): void {
  }
  bioInputFun(){
    this.bioInput = true;
  }
  emailInputFun(){
    this.emailInput = true;
  }
  passInputFun(){

    this.passwordInput = true;
  }

  accountData(){
  
    this._AccountService.displayAcoountSettings(this.decoded.user_id).subscribe(response =>{
      this.user = response.user      
      
    })
  }
  uploadImage(event:any){
    if(event.target.files.length > 0){
      const file = <File>event.target.files[0];
      this.images = file;
    }
  }
  accountDataForm = new FormGroup({
    fname:new FormControl('',[Validators.required,Validators.pattern(/^([a-zA-Z]+[,.]?[ ]?|[a-z]+['-]?)+$/)]),
    lname:new FormControl('',[Validators.required,Validators.pattern(/^([a-zA-Z]+[,.]?[ ]?|[a-z]+['-]?)+$/)]),
    email:new FormControl('',[Validators.required,Validators.email]),
    bio:new FormControl(''),
    image:new FormControl(''),

  })
  updateAccount()
  {
    
    const formData = new FormData();

    if(this.accountDataForm.controls.email.value == ""){
      formData.append('fname', this.accountDataForm.value.fname);
      formData.append('lname', this.accountDataForm.value.lname);
      formData.append('email', this.accountDataForm.value.email);
      formData.append('bio', this.accountDataForm.value.bio);
      formData.append('image', this.images);
    }else{
      formData.append('fname', this.accountDataForm.value.fname);
      formData.append('lname', this.accountDataForm.value.lname);
      formData.append('email', this.user.email);
      formData.append('bio', this.accountDataForm.value.bio);
      formData.append('image', this.images);
    }

  
    
    this._AccountService.updataAccount(formData, this.decoded.user_id).subscribe(response =>{

      if(response.messages == 'account updated'){
        this.bioInput=false;
        this.emailInput=false;
        this.passwordInput=false;
        this.accountUpdated = true

      }else if(response.messages == 'account updated pls confirm your email'){
        localStorage.clear();
        this._Router.navigate(['/login'])

      }      
    })
    
  }
  accountPassword = new FormGroup({
    oldPass:new FormControl(''),
    newPass:new FormControl('',[Validators.required,Validators.pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&#])[A-Za-z\d@$!%*?&#]{8,10}$/)]),
    reNewPass:new FormControl('',Validators.required),
  })
  updatePassword(){
    this._AccountService.updatePassword(this.accountPassword.value).subscribe(response =>{
      if(response.message == "update pass"){
        this.accountPassword.reset();
        this.passwordInput = false;
        this.passUpdated = true
      }      
    })
    
  }
  deleteImage(){
    this._AccountService.deleteImage().subscribe(response =>{
      if(response.message == "image deleted"){
        this.imageDeleted = true
      }      
    })
  }
}
