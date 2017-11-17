import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators, FormArray } from '@angular/forms';
import { CommonService } from '../../../providers/common.service';
import { PollService } from '../../../providers/poll.service';
import { Router } from '@angular/router';
import { LoaderStop } from '../../../providers/loaderstop.service';

declare let $: any;

@Component({
  selector: 'closed-poll',
  templateUrl: './poll.html',
  styleUrls: ['./poll.css'],
})

export class ClosedPollComponent implements OnInit {

  public  noMore: boolean = false;
  public  emptyPolls: boolean = false;
  public  polls: any[];
  public  currentPage = 1;
  
  public  loader: boolean = false;

  constructor(public  ps: PollService,public  ls : LoaderStop, public  router: Router) {
  }

  ngOnInit() {
    this.getClosedPolls();
    this.ls.setLoader(false);
  }

  ngOnDestroy(){
      this.ls.setLoader(true);
  }
  
  public  getClosedPolls() {
    this.loader = true;
    this.ps.getClosedPolls(this.currentPage).subscribe(res => {
      if (res.status == 204) {
        this.polls = [];
        this.emptyPolls = true;
        this.loader = false;
        return;
      }
        this.loader = false;
      this.emptyPolls = false;
      if (this.currentPage == 1)
        this.polls = res;
      else
        this.polls = this.polls.concat(res);
      if (res.length < 6) this.noMore = true;
      else this.noMore = false;
    },
      err => {
        this.loader = false;
        this.router.navigate(['/error']);
      })
  }

  // public  changeDate(obj: any) {
  //   var day, mon, yr, date;
  //   day = (obj.expiredAt).slice(8, 10);
  //   mon = (obj.expiredAt + 1).slice(5, 7);
  //   yr = (obj.expiredAt + 1).slice(0, 4);
  //   date = day + '/' + mon + '/' + yr;
  //   return date;
  // }

  public  previousPoll() {
    delete this.polls;
    this.currentPage -= 1;
    this.getClosedPolls();
  }

  public  nextPoll() {
    // delete this.polls;
    this.currentPage += 1;
    this.getClosedPolls();
  }
}