import {Component} from '@angular/core';
import { AuthService } from '../../providers/auth.service';
import { FormGroup,FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { CustomHttpService } from "../../providers/default.header.service";
import { Configuration } from "../../providers/app.constant";
import { CommonService } from "../../providers/common.service";
@Component({
  selector:'forgot-password',
  templateUrl:'./forgot.password.html',
  styleUrls:['./forgot.password.css'],
  providers : [CommonService, Configuration , CustomHttpService, AuthService ]
})
export class ForgotPassword{
router : Router;
loginStart:boolean = false;

public  forgotform:any=new FormGroup({
       username : new FormControl('')
    });


// public  initForm()
// {
//   return new FormGroup({
//        username : new FormControl('')
//     })
// }
  constructor(public authService : AuthService){   
    // this.forgotform=this.initForm()
  }
  onSubmit(){
  	this.authService.forgotPassword(this.forgotform.value)
    .subscribe(response => {

    },err => {
    })
  }
  gotologin(){
  	this.router.navigate(['/login']);
  }
}