import {Injectable} from '@angular/core';
import {Http,Headers,RequestOptions,Response} from '@angular/http';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';
import { Configuration } from './app.constant';
import { CustomHttpService } from './default.header.service';

@Injectable()
export class AppreciationService{
public  serveUrl:string="";
constructor(
  public con:Configuration,
  public http:Http)
{
  this.serveUrl=con.Server;
}

public  postAppreciation(data:any){
   return this.http.post(this.serveUrl +'/appreciation/for-student',data)
                    .map(this.extractData)
                    .catch(this.handleError);
}

  public  getStandards() {
    return this.http.get(this.serveUrl + '/homework/standard')
                    .map(this.extractData)
                    .catch(this.handleError);
  }
  public  getStudents(stan:any) {
    return this.http.get(this.serveUrl + '/appreciation/for-student/standard/'+stan+'/student')
                    .map(this.extractData)
                    .catch(this.handleError);
  }
public extractData(res:Response){
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
