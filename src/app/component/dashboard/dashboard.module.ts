import { NgModule } from '@angular/core'; 
import { DashboardComponent } from './dashboard.component';
import { RouterModule } from '@angular/router';
import { SharedModule } from '../../shared.module';

@NgModule({
	imports : [ SharedModule, RouterModule.forChild([
			{
				path : '',
				component : DashboardComponent
			}
		])],
	declarations : [ DashboardComponent ]
}) 
export class DashboardModule {
	
}
