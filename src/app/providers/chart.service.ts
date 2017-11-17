import { Injectable, EventEmitter } from '@angular/core';
import { Http, Headers, RequestOptions, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';
import { Configuration } from './app.constant';
import { CustomHttpService } from './default.header.service';


@Injectable()
export class ChartService {
  public baseUrl: string = "";
  constructor(public  con: Configuration,
    public  http: CustomHttpService) {
    this.baseUrl = con.Server;
  }

  public  getComplaintByStatus() {
    // console.log("sx");
    // console.log(this.con.Server);
    console.log(this.baseUrl);
    return this.http.get(this.con.Server + "/complaint/status")
    .map(this.extractData)
    .catch(this.handleError);
  }

  public  getComplaintByCategoryAndStatus() {
    return this.http.get(this.con.Server + "/complaint/category-status")
    .map(this.extractData)
    .catch(this.handleError);
  }  

  public  getSuggestionByStatus() {
    return this.http.get(this.con.Server + "/suggestion/status")
      .map(this.extractData)
      .catch(this.handleError);
  }  
  
  public extractData(res: Response) {
    if (res.status === 204) { return res; }
    let body = res.json();
    return body || { };
  }

  public handleError(error: Response | any) {
    let errMsg: string;
    if (error instanceof Response) {
      errMsg = `${error.status} - ${error.ok || 'Bad Request'}`;
      if (error.status === 0) {
        errMsg = `${error.status} - "No Internet"`;
      }
    } else {
      errMsg = error.message ? error.message : error.toString();
    }
    return Observable.throw(errMsg);
  } 
}