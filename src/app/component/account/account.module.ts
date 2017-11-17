import { NgModule } from '@angular/core';
import { AccountComponent } from './account.component';
import { RouterModule } from '@angular/router'; 
import { SharedModule } from '../../shared.module'; 
@NgModule({
	imports : [ SharedModule, RouterModule.forChild([
 				{ 
 					path:'',
 					component : AccountComponent
 				}
		]) ],
	declarations : [ AccountComponent]
})
export class AccountModule{}
