import { Injectable } from '@angular/core';

@Injectable()
export class LoaderStop {
	public loaderstop = true;
	getLoader (){
		return this.loaderstop;
	}
	setLoader (ld:boolean){
		this.loaderstop = ld;
	}

}