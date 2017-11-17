import {Component} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../providers/auth.service';
import { Router } from '@angular/router';
import { CommonService } from "../../providers/common.service";
import { Configuration } from "../../providers/app.constant";
import { CustomHttpService } from "../../providers/default.header.service";
declare let $: any;

@Component({
  selector:'login',
  templateUrl:'./login.component.html',
  styleUrls:['./login.component.css'],
  providers : [CommonService, Configuration , CustomHttpService, AuthService ]
})

export class LoginComponent{
  loginForm: FormGroup;
  error:boolean = false;
  loginStart:boolean = false;

  public  loader:boolean=false;
  constructor(public  formBuilder: FormBuilder,
              public  appService: AuthService,
              public  router: Router){
              if(appService.isLoggedIn()){ 
                $.noConflict();               
                router.navigate(['/']);
              }
  }
  ngOnInit() {
    this.loginForm = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', [Validators.required]]
    });
  }
  loaderOn(){
    let url = document.URL;
    if(url.indexOf('dashboard')){
      return true;
    }
    else false;
  }
  onSubmit(){
    this.loader=true;
    this.appService.verifyUser(this.loginForm.value).subscribe((res) => {
      
      this.verifySuccessfully(res);
    }, (err) => {
      this.loader=false;      
      this.verifyFailed(err);
    });
  }

  public  verifySuccessfully(res:any) {
    localStorage.setItem("access_token", res.access_token);
    this.getUserInfo();

  }

  public  verifyFailed(err:any) {
    this.error = true;
    this.router.navigate(['/error']);
  }

  public  getUserInfo() {
    this.appService.getUserInfo().subscribe((res) => {
      this.loggedInSuccesfully(res);
    }, (err) => {
       this.router.navigate(['/error']);
    });
  }

  public  loggedInSuccesfully(res:any) {
    this.appService.storeData(res);
    this.loader=false;
    this.router.navigate(['/']);
  }    
}