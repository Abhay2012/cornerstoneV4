import { NgModule } from '@angular/core'; 
import { EventComponent } from './event.component';
import { RouterModule } from '@angular/router';
import { SharedModule } from '../../shared.module';
import {CalendarModule} from "ap-angular2-fullcalendar";

@NgModule({
	imports : [ CalendarModule, SharedModule, RouterModule.forChild([
			{
				path : '',
				component : EventComponent
			}
			
		])],
	declarations : [ EventComponent ]
}) 
export class EventModule {
	
}
