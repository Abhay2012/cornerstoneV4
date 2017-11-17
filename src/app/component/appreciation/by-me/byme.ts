import {Component , OnDestroy, OnInit} from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { ComplaintService } from '../../../providers/complaint.service';
import { ComplaintComponent } from '../../complaint/complaint.component';
// import {AppreciationService} from './../../../providers/appreciation.service';
import { LoaderStop } from '../../../providers/loaderstop.service';

@Component({
  selector:'for-student',
  templateUrl:'./byme.html'
})

export class ByMeComponent extends ComplaintComponent implements OnDestroy, OnInit{
  

  constructor(public  cs: ComplaintService,
    public  router: Router,
    public  ls : LoaderStop,
    public  route: ActivatedRoute) {
    super(cs,ls,router,route);
  }  

  ngOnInit(){
  	   this.ls.setLoader(false);
  }

  ngOnDestroy(){
     this.ls.setLoader(true); 
    }
  
}