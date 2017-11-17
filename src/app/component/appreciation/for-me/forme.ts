import {Component} from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { ComplaintService } from '../../../providers/complaint.service';
import { ComplaintComponent } from '../../complaint/complaint.component';
import { LoaderStop } from '../../../providers/loaderstop.service';

@Component({
  selector:'for-me',
  templateUrl:'./forme.html',
  styleUrls:['./../appreciation.component.css']
  
})

export class ForMeComponent extends ComplaintComponent{

  constructor(public  cs: ComplaintService,
  	public  ls : LoaderStop,
    public  router: Router,
    public  route: ActivatedRoute) {
    super(cs,ls,router,route);
    if(this.url == "/appreciation/for-me") this.url = "/appreciation";
    this.ls.setLoader(false);
  }  
}