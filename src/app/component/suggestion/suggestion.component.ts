import {Component} from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
@Component({
  selector:'suggestion',
  templateUrl:'./suggestion.component.html',
  styleUrls:['./suggestion.component.css']
})
export class SuggestionComponent{
  public  suggestionStatus:any;
  public  status: string = "";
  public  url:string ="";
  public  tab:boolean = false;
  constructor(public route: ActivatedRoute,public router:Router){
     
    this.url = this.router.url;
    if(this.url == "/suggestion/for-me" || this.url == "/suggestion/for-student")
      this.tab = true;
    else 
      this.tab = false;
    // this.router.navigate(["/suggestion/for-me"]);
  }
}
