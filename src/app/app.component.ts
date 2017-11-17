import { Component } from '@angular/core';
import { LoaderStop } from './providers/loaderstop.service';
declare let $: any;

@Component({
  selector: 'my-app',
  templateUrl : './app.component.html',
})
export class AppComponent  { name = 'Angular';
   loaderstop : any;
  constructor(ls : LoaderStop){
  	setInterval (()=>{this.loaderstop = ls.getLoader();},10)	
  }

}
