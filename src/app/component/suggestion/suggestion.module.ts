import { NgModule } from '@angular/core'; 
import { SuggestionComponent } from './suggestion.component';
import { RouterModule } from '@angular/router';
import { SharedModule } from '../../shared.module';
import { SuggestionForStudent } from './for-student/forstudent';
import { SuggestionForMe } from './for-me/forme';
import { SuggestionAddComponent } from './add/add';
import { SuggestionService } from "../../providers/suggestion.service";

@NgModule({
	imports : [ SharedModule, RouterModule.forChild([
			{
				path : '',
				component : SuggestionComponent,
				children : [
					{
						path : 'for-student',
						component : SuggestionForStudent
					},
					{
						path : 'for-me',
						component : SuggestionForMe
					}
				]
			},
			{
				path : 'add-suggestion',
				component : SuggestionAddComponent
			}
			
		])],
	declarations : [ SuggestionAddComponent, SuggestionComponent, SuggestionForStudent, SuggestionForMe ],
	providers : [SuggestionService]
}) 
export class SuggestionModule {
	
}
