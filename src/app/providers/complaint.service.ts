import { Injectable, EventEmitter } from '@angular/core';
import { Http, Headers, RequestOptions, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';
import { Configuration } from './app.constant';
import { CustomHttpService } from './default.header.service';
declare const SockJS : any;
declare const Stomp : any;


@Injectable()
export class ComplaintService {
  public baseUrl: string = "";
  constructor(public  con: Configuration,
    public  http: CustomHttpService) {
    this.baseUrl = con.Server;
  }
  getComplaint(url:any, pageNo:any) {
    this.baseUrl = this.con.Server;
    return this.http.get(this.baseUrl + url + "/page/" + pageNo)
      .map(this.extractData)
      .catch(this.handleError);
  }

  getComplaintById(url:any, id:any) {
    return this.http.get(this.baseUrl + "/" + url + id)
      .map(this.extractData)
      .catch(this.handleError);
  }

  getComplaintCommentById(url:any, complaintId:any) {
    // return this.http.get(this.baseUrl + "/complaint" + "/" + complaintId + "/comment")
    return this.http.get(this.baseUrl + "/"+ url + "/" + complaintId + "/comment") 
      .map(this.extractData)
      .catch(this.handleError);
  }

  postComplaintComment(complaintId:any, comment:any,url:any) {
    return this.http.post(this.baseUrl + "/" + url +"/"+ complaintId + "/comment", comment)
      .map(this.extractData)
      .catch(this.handleError);
  }

  updateComplaint(complaintId:any, complaint:any,url:any) {
    return this.http.put(this.baseUrl + "/" + url +"/"+ complaintId, complaint)
      .map(this.extractData)
      .catch(this.handleError);
  }

  closeComplaint(complaintId:any, complaint:any,url:any) {
    return this.http.put(this.baseUrl + "/" + url +"/"+ complaintId + "/close", complaint)
      .map(this.extractData)
      .catch(this.handleError);
  }

  public  searchComplaints(pageNo:any, key:any){
    return this.http.post(this.baseUrl + "/complaint/search/page/" + pageNo,key)
      .map(this.extractData)
      .catch(this.handleError);
  }

  editInfo() {
    return this.http.get(this.baseUrl + "/complaint/edit-info")
      .map(this.extractData)
      .catch(this.handleError);
  }

  showToast(msg:any) {
  }

  getUserId() {
    return this.con.getUserId();
  }

  public extractData(res: Response) {
    if (res.status === 204) { return res; }
    let body = res.json();
    return body || {};
  }

  getSockJs() {
    let access_token = localStorage.getItem('access_token');
    let url = this.con.url + '/management/nxtlife-websocket?access_token=' + access_token;
    var socket = new SockJS(url);
    return Stomp.over(socket);
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