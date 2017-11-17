import { NgModule } from '@angular/core'; 
import { AddStudentComponent } from './addStudent.component';
import { RouterModule } from '@angular/router';
import { SharedModule } from '../../shared.module';
import { ExistingStudentComponent } from './existingStudent/existingStudent.component';
import { NewStudentComponent } from './newStudent/newStudent.component';

@NgModule({
	imports : [ SharedModule, RouterModule.forChild([
			{ path:'', redirectTo:'new-student', pathMatch:'full'},
			{
				path : '',
				component : AddStudentComponent,
				children : [
				{
					path : 'existing-student',
					component : ExistingStudentComponent
				},
				{
					path : 'existing-student/:standardId/:studentId',
					component : ExistingStudentComponent
				},
				{
					path : 'new-student',
					component : NewStudentComponent
				}
				]
			}
			
		])],
	declarations : [ AddStudentComponent,ExistingStudentComponent,NewStudentComponent ]
}) 
export class AddStudentModule {
	
}
