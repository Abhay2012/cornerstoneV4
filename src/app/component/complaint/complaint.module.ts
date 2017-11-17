import { NgModule } from '@angular/core'; 
import { ComplaintComponent } from './complaint.component';
import { RouterModule } from '@angular/router';
import { SharedModule } from '../../shared.module';
import { ComplaintService } from "../../providers/complaint.service";

@NgModule({
	imports : [ SharedModule, RouterModule.forChild([
			{
				path : '',
				component : ComplaintComponent
			},
			{
				path : 'status/:statusId',
				component : ComplaintComponent
			},
			{
				path : 'category-status/category/:categoryId',
				component : ComplaintComponent
			},
			{
				path : 'category-status/:categoryId/:statusId',
				component : ComplaintComponent
			}
			
		])],
	declarations : [ ComplaintComponent ],
	providers : [ ComplaintService ]
}) 
export class ComplaintModule {
	
}
