import { NgModule } from '@angular/core'; 
import { SurveyComponent } from './survey.component';
import { RouterModule } from '@angular/router';
import { SharedModule } from '../../shared.module';
import { CurrentSurveyComponent } from './current/survey';
import { ClosedSurveyComponent } from './closed/survey';
import { AddSurveyComponent } from './add/add';
import { SurveyService } from "../../providers/survey.service";


@NgModule({
	imports : [ SharedModule, RouterModule.forChild([
			{
				path : '',
				component : SurveyComponent,
				children : [
					{
						path : 'current-survey',
						component : CurrentSurveyComponent
					},
					{
						path : 'closed-survey',
						component : ClosedSurveyComponent
					}
				]
			},
			{
				path : 'add-survey',
				component : AddSurveyComponent
			}
			
		])],
	declarations : [ AddSurveyComponent, SurveyComponent, CurrentSurveyComponent, ClosedSurveyComponent ],
	providers : [ SurveyService ]
}) 
export class SurveyModule {
	
}
