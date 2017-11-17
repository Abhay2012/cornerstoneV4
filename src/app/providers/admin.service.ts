import { Injectable, EventEmitter } from '@angular/core';
import { Http, Headers, RequestOptions, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';
import { CustomHttpService } from './default.header.service';
import { Configuration } from './app.constant';


@Injectable()
export class AdminService {
  public  id:any;
  public baseUrl: string = "";

  constructor(public http: CustomHttpService,
    public  htttp: Http,
    public con: Configuration,
  ) {
    this.baseUrl = this.con.baseUrl;
    this.id=localStorage.getItem('id');
  }

  getSubjects() {
    return this.http.get(this.baseUrl + "subject")
      .map(this.extractData)
      .catch(this.handleError);
  }

  getStandards() {
    return this.http.get(this.baseUrl + "admin/" +this.id +"/homework/standard")
      .map(this.extractData)
      .catch(this.handleError);
  }

  // getParents() {
  //   return this.http.get("https://cornerstone.ind-cloud.everdata.com/admin/parent")
  //     .map(this.extractData)
  //     .catch(this.handleError);
  // }

  getStudents(stdId:any) {
    return this.http.get(this.baseUrl + "admin/student-by-standard/" +stdId)
      .map(this.extractData)
      .catch(this.handleError);
  }

  addEmployee(data: any) {
    return this.http.post(this.baseUrl + "admin/employee", data)
      .map(this.extractData)
      .catch(this.handleError);
  }

  addStudent(data: any) {
    var option = new RequestOptions({
      headers: new Headers({
        'Authorization': 'Bearer ' + localStorage.getItem('access_token'),
      })
    });
    return this.http.post(this.baseUrl + "admin/student", data, option)
      .map(this.extractData)
      
  }

  public  getAllStudents(stdId:any){
    return this.http.get(this.baseUrl + "admin/student/" + stdId + "/parent-sibling")
    .map(this.extractData)
    .catch(this.handleError);

  }

  public  uploadParentImage(id: any, data: any, ) {
    var option = new RequestOptions({
      headers: new Headers({
        'Authorization': 'Bearer ' + localStorage.getItem('access_token'),
      })
    });

    return this.htttp.post(this.con.baseUrl + "admin/parent/" + id + "/picture", data, option)
      .map(this.extractData)
      .catch(this.handleError);
  }

  public  uploadStudentImage(id: any, data: any, ) {
    var option = new RequestOptions({
      headers: new Headers({
        'Authorization': 'Bearer ' + localStorage.getItem('access_token'),
      })
    });

    return this.htttp.post(this.con.baseUrl + "admin/student/" + id + "/picture", data, option)
      .map(this.extractData)
      .catch(this.handleError);
  }

 public  uploadImage(data: any, id:any) {
    var option = new RequestOptions({
      headers: new Headers({
        'Authorization': 'Bearer ' + localStorage.getItem('access_token'),
      })
    });
    return this.htttp.post(this.con.baseUrl + "management/" + id + "/picture", data, option)
      .map(this.extractData)
      .catch(this.handleError);
  }


  public  addSibling(id: any, data: any) {
    return this.http.post(this.baseUrl + "admin/student/" + id + "/sibling", data)
      .map(this.extractData)
      .catch(this.handleError);
  }

  public  addParent(id: any, data: any) {
    return this.http.post(this.baseUrl + "admin/student/" + id + "/parent", data)
      .map(this.extractData)
      .catch(this.handleError);
  }

  getStudentDetails(id: any) {
    return this.http.get(this.baseUrl + "admin/student/" + id)
      .map(this.extractData)
      .catch(this.handleError);

  }

  updateStudent(id: any, object: any) {
    return this.http.put(this.baseUrl + "admin/student/" + id, object)
      .map(this.extractData)
      .catch(this.handleError);
  }


  updateParent(id: any, object: any) {
    return this.http.put(this.baseUrl + "admin/parent/" + id, object)
      .map(this.extractData)
      .catch(this.handleError);
  }


  // addStudentWithExistingUser(data: any) {
  //   return this.http.post("https://cornerstone.ind-cloud.everdata.com/admin/students", data)
  //     .map(this.extractData)
  //     .catch(this.handleError);
  // }

  // deleteStudent(id: any) {
  //   return this.http.delete("https://cornerstone.ind-cloud.everdata.com/admin/student/" + id)
  //     .map(this.extractData)
  //     .catch(this.handleError);
  // }



  public extractData(res: Response) {
    if (res.status === 204) { return res; }
    let body = res.json();
    return body || {};
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