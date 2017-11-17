import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
	name : 'filter'
})
export class FilterPipe implements PipeTransform{
	transform(value:string, substr:string){
		let a: any;
		console.log(value);
		let val = value.toUpperCase();
		let sub = substr.toUpperCase();
		a = val.indexOf(sub);

		if(a<0){
			return null;
		}
		else 
			return value;
	}
}