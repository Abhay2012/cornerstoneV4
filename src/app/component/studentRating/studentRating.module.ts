import { NgModule } from '@angular/core'; 
import { StudentRatingComponent } from './studentRating.component';
import { RouterModule } from '@angular/router';
import { SharedModule } from '../../shared.module';

import { StudentRatingService } from "../../providers/studentRating.service";
@NgModule({
	imports : [ SharedModule, RouterModule.forChild([
			{
				path : '',
				component : StudentRatingComponent
			}
			
		])],
	declarations : [ StudentRatingComponent ],
	providers : [ StudentRatingService ]
}) 
export class StudentRatingModule {
	
}
