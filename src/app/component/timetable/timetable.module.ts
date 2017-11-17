import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { TimetableComponent } from './timetable.component';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { TimeTableService } from '../../providers/timetable.service';
import { SharedModule } from '../../shared.module';


@NgModule({
	imports : [ SharedModule ,CommonModule, FormsModule, RouterModule.forChild([
			{
				path : '',
				component : TimetableComponent
			}
		])],
	declarations : [TimetableComponent ],
	providers : [TimeTableService]

})
export class TimeTable{

}