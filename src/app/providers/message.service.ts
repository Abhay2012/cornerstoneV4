import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Response, Http, Headers, RequestOptions } from '@angular/http';

import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';

import { Configuration } from './app.constant';
import { CustomHttpService } from './default.header.service';

@Injectable()

export class MessageService {

  public  serverUrl: string;

  constructor(public http: CustomHttpService,
    public htttp: Http,
    public con: Configuration) {
    this.getUrl();
  }

  getUrl() {
    this.serverUrl = this.con.Server;
  }

  public  getAllMessages(pageNo: any) {
    this.getUrl();
    return this.http.get(this.serverUrl + "/conversation/page/" + pageNo)
      .map(this.extractData)
      .catch(this.handleError);
  }

  public  getStandards(){
    return this.http.get(this.serverUrl + "/homework/standard")
      .map(this.extractData)
      .catch(this.handleError);
  }
    

  public  getMessage(id: any, pageNo: any) {

    var options = new RequestOptions({
      headers: new Headers({
        'Authorization': 'Bearer ' + localStorage.getItem('access_token')
      })
    });
    return this.http.get(this.serverUrl + "/conversation/" + id + "/page/" + pageNo, options)
      .map(this.extractData)
      .catch(this.handleError);
  }

  public  conversationComment(id: any, data: any, ) {
    var options = new RequestOptions({
      headers: new Headers({
        'Authorization': 'Bearer ' + localStorage.getItem('access_token')
      })
    });
    return this.http.post(this.serverUrl + "/conversation/" + id, data, options)
      .map(this.extractData)
      .catch(this.handleError);

  }

  public  conversationCommentWithPicture(id: any, data: any, ) {
    var options = new RequestOptions({
      headers: new Headers({
        'Authorization': 'Bearer ' + localStorage.getItem('access_token')
      })
    });
    return this.htttp.post(this.serverUrl + "/conversation/" + id + "/picture", data, options)
      .map(this.extractData)
      .catch(this.handleError);
  }

  public  newConversation(data: any) {
    var options = new RequestOptions({
      headers: new Headers({
        'Authorization': 'Bearer ' + localStorage.getItem('access_token')
      })
    });
    return this.http.post(this.serverUrl + "/conversation/", data, options)
      .map(this.extractData)
      .catch(this.handleError);


  }

  public  getMessageCategory(standardId: any) {
    return this.http.get(this.serverUrl + "/conversation/category-and-student/" + standardId)
      .map(this.extractData)
      .catch(this.handleError);
  }

  public  closeConversation(id: any) {
    return this.http.put(this.serverUrl + "/conversation/" + id, {})
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