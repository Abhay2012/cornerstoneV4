import { Component, OnDestroy } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { ComplaintService } from '../../../providers/complaint.service';
import { ComplaintComponent } from '../../complaint/complaint.component';
import { LoaderStop } from '../../../providers/loaderstop.service';
@Component({
  selector: 'for-me',
 templateUrl: './forme.html',
  styleUrls:['./../../complaint/complaint.component.css']
})

export class SuggestionForMe extends ComplaintComponent implements OnDestroy{
  public  statusId:any;
  
  public  statusName:any[] = ["","New","Assigned","Inprogress","Closed","Reopen","Satisfied"];
  constructor(public  cs: ComplaintService,
    public  ls : LoaderStop,
    public  router: Router,
    public  route: ActivatedRoute) {
    super(cs,ls,router,route);
    if(this.url == "/suggestion/for-me") this.url = "/suggestion";
    if(this.complaintStatus) this.url = "/suggestion/status/" + this.complaintStatus;
    this.route.params.subscribe(param => {
      this.statusId = param['statusId'];
    });
  }  

  ngOnDestroy(){
    this.ls.setLoader(true);
  }
}
