import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { SurveyService } from '../../../providers/survey.service';
import { Location } from '@angular/common';

@Component({
  selector: 'view-survey',
  templateUrl: './survey.html',
  styleUrls: ['./survey.css']

})

export class ViewSurveyComponent implements OnInit {

  public  selectedSurvey: any;
  public  id: any;
  public  loader: boolean = false;
  public  emptySurvey: boolean = false;

  constructor(public ss: SurveyService,
    public _location: Location,
    public  route: ActivatedRoute,
    public  router: Router) { }

  ngOnInit() {
    this.loader = true;
    this.route.params.subscribe(params => {
      this.id = params['id'];
    });
    this.selectToExpand();
  }

  public  selectToExpand() {
    this.loader = true;
    this.ss.getSurvey(this.id).subscribe(res => {
      if (res.status === 204) {
        this.emptySurvey = true;
        this.selectedSurvey = null;
        this.loader = false;
        return;
      }
      this.selectedSurvey = res;
      this.loader = false;
    },
      err => {
        this.loader = false;
        this.router.navigate(['/error']);
      })
  }





}

