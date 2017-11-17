import {Injectable} from '@angular/core';
import {Observable} from 'rxjs/Observable';
import {Response,Http,Headers,RequestOptions} from '@angular/http';

import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

import {Configuration} from './app.constant';
import {CustomHttpService} from './default.header.service';

@Injectable()
export class EventService{
public  serveUrl:string="";
  constructor(
    public http:Http,
    public htttp:CustomHttpService,
    public con:Configuration
  ){
    this.serveUrl=this.con.Server;
  }
  //   GetEvent(pageNo){
  //   return this.http.get(this.serveUrl + '/planner/page/' +pageNo)
  //   .map(this.extractData)
  //   .catch(this.handleError);
  // }

  GetEvents(eventMonth:any){
    return this.http.get(this.serveUrl + '/planner/month/' +eventMonth)
    // return this.http.get(this.serveUrl + '/planner/month/2017-07')   
    .map(this.extractData)
    .catch(this.handleError);
  }
  GetEventById(id:any){
      return this.http.get(this.serveUrl + '/planner/' + id)
    .map(this.extractData)
    .catch(this.handleError);
  }
  GetPlanner(){
    return this.http.get(this.serveUrl+'/planner/type/')
    .map(this.extractData)
    .catch(this.handleError);
  }
  postEvent(data:any){

    var options = new RequestOptions({
      headers: new Headers({
      'Authorization': 'Bearer ' + localStorage.getItem('access_token')
    })
   });

    return this.http.post(this.serveUrl +'/planner',data,options)
    .map(this.extractData)
    .catch(this.handleError)
  }

  deleteEvent(id:any){
    return this.http.delete(this.serveUrl +'/planner/'+id)
    .map(this.extractData)
    .catch(this.handleError)
  }

  addimages(id : any, files : any){

    var options = new RequestOptions({
      headers: new Headers({
      'Authorization': 'Bearer ' + localStorage.getItem('access_token')
    })
   });
    return this.http.post(this.serveUrl + '/planner/' +id + '/file', files, options)
    .map(this.extractData)
    .catch(this.handleError)    
  }

  removeimage(id : any, file : any){

    var options = new RequestOptions({
      headers: new Headers({
      'Authorization': 'Bearer ' + localStorage.getItem('access_token'),
      'fileTimestamp' : file
    })
   });
    return this.http.delete(this.serveUrl + '/planner/' +id + '/file', options)
    .map(this.extractData)
    .catch(this.handleError)    
  }

  updateEvent(id:any,event:any){
    
   // var options = new RequestOptions({
   //    headers: new Headers({
   //    'Authorization': 'Bearer ' + localStorage.getItem('access_token')
   //  })
   // });

    return this.http.put(this.serveUrl +'/planner/' +id, event)
    .map(this.extractData)
    .catch(this.handleError)
  }

  getStandards(){
        return this.http.get(this.serveUrl + '/homework/standard')
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