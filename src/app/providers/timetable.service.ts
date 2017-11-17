import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Response, Http, RequestOptions, Headers } from '@angular/http';

import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw'; 

import { Configuration } from './app.constant';
import { CustomHttpService } from './default.header.service';

@Injectable()
export class TimeTableService{

   public  serverUrl: string;

   constructor(public http: CustomHttpService,
    public htttp: Http,
    public con: Configuration) {
  }



  public  getSubject(selectedstandard : any){
    return this.http.get(this.con.Server + '/time-table/subject')
                    .map(this.extractData)
                    .catch(this.handleError);
  }
	public  getStandards() {
    return this.http.get(this.con.Server + '/time-table/standard')
                    .map(this.extractData)
                    .catch(this.handleError);
  }

  public  onSubmit(timetableid : any , subId: any){
    return this.http.put(this.con.Server + '/time-table/'+timetableid,{ subjectId : subId })
                    .map(this.extractData)
                    .catch(this.handleError);
  }

	public  gettimeTable(selectedstandard : any){
	return this.http.get(this.con.Server + '/time-table/standard/'+selectedstandard)
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