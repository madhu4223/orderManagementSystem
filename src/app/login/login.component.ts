import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { DataService } from './../shared/data.service';
import { stringify } from '@angular/compiler/src/util';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  email:string;
  password:String;
  rememberMe:boolean;

  constructor(
    private toaster: ToastrService,
    private http: HttpClient,
    private router:Router,
    private dataService:DataService
  ) { }

  ngOnInit() {
   
  }
  onSubmit(){
    let mailFormat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    if(this.email != undefined && this.email.length>0){
      if(this.email.match(mailFormat)){
        if(this.password != undefined && this.password.length>0){
          let params = {
            'email':this.email,
            'password':this.password,
            
          }
            this.dataService.post('api/login',params).subscribe((response)=>{
            console.log('response ',response) 
            if(response['status_code'] == 200){
              this.toaster.success('successfully loggedin');
              let token  = this.generateToken();
              if(this.rememberMe){
                  localStorage.setItem('access_token',token);
              }else{
                  sessionStorage.setItem('access_token',token);
              }
              this.router.navigate(['/orders']);
              }else{
                this.toaster.error(response['message'])
              }
            })
        }else{
          this.toaster.error('Please Enter Password')
        }
      }else{
        this.toaster.error('Please Enter Valid Email')
      }
    }else{
      this.toaster.error('Please Enter Email')
    }
  }
 onCheckBox(event){
    // console.log('check box', event)
    this.rememberMe = event.target.checked;
 }
 generateToken() {
   length = 15;
  var text = "";
  var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

  for (var i = 0; i < length; i++)
    text += possible.charAt(Math.floor(Math.random() * possible.length));

  return text;
}
  
}
