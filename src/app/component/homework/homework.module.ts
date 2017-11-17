import { NgModule } from '@angular/core';
import { HomeworkComponent } from './homework.component';
import { RouterModule } from '@angular/router';
import { SharedModule } from '../../shared.module';
import { CurrentHomework } from './current/homework';
import { PassedHomework } from './passed/homework';
import { HomeworkAddComponent } from './add/add';
import { HomeworkService } from "../../providers/homework.service";

@NgModule({
	imports: [SharedModule, RouterModule.forChild([
		{path : '' , redirectTo:'current-homework' , pathMatch:'full'},
		{
			path: '',
			component: HomeworkComponent,
			children: [
				{
					path: 'current-homework',
					component: CurrentHomework
				},
				{
					path: 'passed-homework',
					component: PassedHomework
				}
			]
		},
		{
			path : 'homework-add',
			component : HomeworkAddComponent
		}
		
	])],
	declarations : [ HomeworkAddComponent , HomeworkComponent,CurrentHomework,PassedHomework ],
	providers : [ HomeworkService ]
})
export class HomeworkModule {

}
