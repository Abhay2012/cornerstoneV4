import { NgModule } from '@angular/core'; 
import { MessageComponent } from './message.component';
import { RouterModule } from '@angular/router';
import { SharedModule } from '../../shared.module';
import { MessageService } from "../../providers/message.service";
@NgModule({
	imports : [ SharedModule, RouterModule.forChild([
			{
				path : '',
				component : MessageComponent
			}
			
		])],
	declarations : [ MessageComponent ],
	providers : [ MessageService ]
}) 
export class MessageModule {
	
}
