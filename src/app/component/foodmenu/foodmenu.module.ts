import { NgModule } from '@angular/core'; 
import { FoodmenuComponent } from './foodmenu.component';
import { RouterModule } from '@angular/router';
import { SharedModule } from '../../shared.module';
import { FoodmenuService } from "../../providers/foodmenu.service";
import { Ng2DragDropModule } from 'ng2-drag-drop';
import { CalendarModule } from 'ap-angular2-fullcalendar/angular2-fullcalendar';
// import { CalendarModule } from
@NgModule({
	imports : [ CalendarModule,SharedModule,Ng2DragDropModule.forRoot() ,RouterModule.forChild([
			{
				path : '',
				component : FoodmenuComponent
			}
			
		])],
	declarations : [ FoodmenuComponent ],
	providers : [ FoodmenuService ]
}) 
export class FoodmenuModule {
	
}
