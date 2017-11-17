import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Response, Http, RequestOptions, Headers } from '@angular/http';

import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';

import { Configuration } from './app.constant';
import { CustomHttpService } from './default.header.service';

@Injectable()

export class PollService {

  public  serverUrl: string;
  public  baseUrl:string;

  constructor(public http: CustomHttpService,
    public htttp: Http,
    public con: Configuration) {
    this.getUrl();
  }

  getUrl() {
    this.serverUrl = this.con.Server;
    console.log(this.serverUrl);
    // this.baseUrl = this.con.baseUrl;
  }

  public  getStandards() {
    return this.http.get(this.serverUrl + '/homework/standard')
                    .map(this.extractData)
                    .catch(this.handleError);
  }

  public  getPolls(pageNo: any) {
		return this.http.get(this.serverUrl + '/poll/page/' + pageNo)
    .map(this.extractData)
    .catch(this.handleError);
	}

   public  getTomorrow() {
    var currentDate = new Date(new Date().getTime() + 24 * 60 * 60 * 1000);
    var day = ("0" + (currentDate.getDate() + 1)).slice(-2)
    var month = ("0" + (currentDate.getMonth() + 1)).slice(-2)
    var year = currentDate.getFullYear()
    let tomorrow = year + '/' + month + '/' + day;
    return tomorrow;
  }

  
   public  getClosedPolls(pageNo: any) {
		return this.http.get(this.serverUrl + '/poll/old/page/' + pageNo)
    .map(this.extractData)
    .catch(this.handleError);
	}

  public  getPoll(id:any) {
    return this.http.get(this.serverUrl + '/poll/' + id)
    .map(this.extractData)
    .catch(this.handleError);
  }

  public  createPoll(data:any){
    return this.htttp.post(this.serverUrl + '/poll', data)
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