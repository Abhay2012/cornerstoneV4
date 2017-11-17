import { NgModule } from '@angular/core'; 
import { AddEmployeeComponent } from './addEmployee.component';
import { RouterModule } from '@angular/router';
import { SharedModule } from '../../shared.module';
import { HomeworkService } from '../../providers/homework.service';

@NgModule({
	imports : [ SharedModule, RouterModule.forChild([
			{
				path : '',
				component : AddEmployeeComponent
			}
			
		])],
	declarations : [ AddEmployeeComponent ],
	providers : [ HomeworkService ]
}) 
export class AddEmployeeModule {
	
}
