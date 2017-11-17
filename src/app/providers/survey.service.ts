import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Response, Http, RequestOptions, Headers } from '@angular/http';

import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';

import { Configuration } from './app.constant';
import { CustomHttpService } from './default.header.service';

@Injectable()

export class SurveyService {

  public  serverUrl: string = "";

  constructor(public  con: Configuration,
    public  http: CustomHttpService) {
    this.getUrl();
  }

  getUrl() {
    this.serverUrl = this.con.Server;
  }

  getSurveys(pageNo: any) {
    return this.http.get(this.serverUrl + "/survey/page/" + pageNo)
      .map(this.extractData)
      .catch(this.handleError);
  }

   getClosedSurveys(pageNo: any) {
    return this.http.get(this.serverUrl + "/survey/old/page/" + pageNo)
      .map(this.extractData)
      .catch(this.handleError);
  }

  getSurvey(id: any) {
    return this.http.get(this.serverUrl + "/survey/" + id)
      .map(this.extractData)
      .catch(this.handleError);
  }

  saveSurvey(data: any) {
    return this.http.post(this.serverUrl + "/survey/", data)
      .map(this.extractData)
      .catch(this.handleError);
  }

  public extractData(res: Response) {
    if (res.status === 204) { return res; }
    let body = res.json();
    return body || {};
  }

  public handleError(error: Response | any) {
    let errMsg: string;
    if (error instanceof Response) {
      errMsg = `${error.status} - ${error.ok || ''}`;
      if (error.status === 0) {
        errMsg = `${error.status} - "No Internet"`;
      }
    } else {
      errMsg = error.message ? error.message : error.toString();
    }
    return Observable.throw(errMsg);
  }


}