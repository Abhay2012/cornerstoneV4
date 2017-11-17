import { CustomLoader} from './customComponent/loader.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common'; 
import { GoogleChart } from './customComponent/chart.directive';
import { FormsModule , ReactiveFormsModule } from '@angular/forms';
@NgModule({
	imports : [CommonModule, FormsModule , ReactiveFormsModule],
 declarations : [CustomLoader , GoogleChart],
 exports : [CustomLoader, CommonModule , GoogleChart, FormsModule , ReactiveFormsModule]
})
export class SharedModule{

}