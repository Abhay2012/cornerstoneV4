import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Response, Http, Headers, RequestOptions } from '@angular/http';


import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';

import { Configuration } from './app.constant';
import { CustomHttpService } from './default.header.service';

@Injectable()
export class SuggestionService{
  public  serveUrl:string;

  constructor(
    public http:CustomHttpService,
    public con:Configuration
  ){
    this.getUrl();
  }

  getUrl(){
  this.serveUrl=this.con.Server;
}


  public  postSuggestion(data:any){
    //     var options = new RequestOptions({
    //   headers: new Headers({
    //     'Authorization': 'Bearer ' + localStorage.getItem('access_token')
    //   })
    // });
    return this.http.post(this.serveUrl + '/suggestion/for-student', data)
                    .map(this.extractData)
                    .catch(this.handleError);
  }
  public  getStandards() {
    return this.http.get(this.serveUrl + '/suggestion/for-student/standard')
                    .map(this.extractData)
                    .catch(this.handleError);
  }
  public  getStudents(stan:any) {
    return this.http.get(this.serveUrl + '/suggestion/for-student/standard/'+stan+'/student')
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


