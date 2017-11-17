import { NgModule } from '@angular/core'; 
import { AppreciationComponent } from './appreciation.component';
import { RouterModule } from '@angular/router';
import { SharedModule } from '../../shared.module';
import { ByMeComponent } from './by-me/byme';
import { ForMeComponent } from './for-me/forme';
import { AddAppreciation } from './add/add';
import { AppreciationService } from "../../providers/appreciation.service";
import { ComplaintService } from "../../providers/complaint.service";
import { FilterPipe } from "./filter.pipe";

@NgModule({
	imports : [ SharedModule, RouterModule.forChild([
		{path : '' , redirectTo:'for-me' , pathMatch:'full'},
			{
				path : '',
				component : AppreciationComponent,
				children : [
					{
						path : 'for-student',
						component : ByMeComponent
					},
					{
						path : 'for-me',
						component : ForMeComponent
					}
				]
			},
			{
				path : 'add-appreciation',
				component : AddAppreciation
			}
			
		])],
	declarations : [ AddAppreciation, ByMeComponent, FilterPipe , AppreciationComponent, ForMeComponent ],
	providers : [ AppreciationService,ComplaintService ]
}) 
export class AppreciationModule {
	
}
