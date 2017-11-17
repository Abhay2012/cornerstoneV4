import { NgModule } from '@angular/core'; 
import { PollComponent } from './poll.component';
import { RouterModule } from '@angular/router';
import { SharedModule } from '../../shared.module';
import { CurrentPollComponent } from './current/poll';
import { ClosedPollComponent } from './closed/poll';
import { AddPollComponent } from './add/add';
import { PollService } from "../../providers/poll.service";

@NgModule({
	imports : [ SharedModule, RouterModule.forChild([
			{path:'', redirectTo:'current-poll', pathMatch:'full'},
			{
				path : '',
				component : PollComponent,
				children : [
					{
						path : 'current-poll',
						component : CurrentPollComponent
					},
					{
						path : 'closed-poll',
						component : ClosedPollComponent
					}
				]
			},
			{
				path : 'add-poll',
				component : AddPollComponent
			}
			
		])],
	declarations : [ AddPollComponent, PollComponent, CurrentPollComponent, ClosedPollComponent ],
	providers : [ PollService ]
}) 
export class PollModule {
	
}
