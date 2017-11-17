import {Injectable} from '@angular/core';
import {Observable} from 'rxjs/Observable';
import {Response,Http,Headers,RequestOptions} from '@angular/http';

import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

import {Configuration} from './app.constant';
import {CustomHttpService} from './default.header.service';

@Injectable()
export class FoodmenuService{
public  serveUrl:string="";
  constructor(
    public http:Http,
    public htttp:CustomHttpService,
    public con:Configuration
  ){
    this.serveUrl=this.con.Server;
    this.id=localStorage.getItem('id');
  }
  //   GetEvent(pageNo){
  //   return this.http.get(this.serveUrl + '/planner/page/' +pageNo)
  //   .map(this.extractData)
  //   .catch(this.handleError);
  // }
  public  id:any;


    getMenu(month:any){
        return this.http.get(this.serveUrl +'/food-menu/month/'+ month)
        .map(this.extractData)
        .catch(this.handleError);
    }

    postItem(data:any){
        console.log("i am in service ",data)
        return this.http.post(this.serveUrl +'/food-menu/food',data)
        .map(this.extractData)
        .catch(this.handleError);
    }

    getItem(){
        return this.http.get(this.serveUrl + '/food-menu/food')
        .map(this.extractData)
        .catch(this.handleError)
    }

    deleteItem(id:any){
        return this.http.delete(this.serveUrl + '/food-menu/food/' + id)
        .map(this.extractData)
        .catch(this.handleError)
    }

    postMenu(data:any){
      return this.http.post(this.serveUrl + '/food-menu',data)
      .map(this.extractData)
      .catch(this.handleError)
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