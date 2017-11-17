import { NgModule } from '@angular/core';
import { LoginComponent } from './login.component';
import { ForgotPassword } from './forgot.password';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule,FormsModule } from '@angular/forms';
import { CommonModule } from  '@angular/common';
import { HttpModule } from '@angular/http';

@NgModule({
 imports : [ CommonModule , FormsModule ,ReactiveFormsModule, HttpModule ,RouterModule.forChild([
 		{
 			path : '',
			component : LoginComponent
 		},
 		{
 			path : 'forgot-password',
 			component : ForgotPassword
 		}
 	])],
 declarations : [ LoginComponent, ForgotPassword]

})
export class LoginModule { } 