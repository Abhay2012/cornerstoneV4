import { Injectable } from '@angular/core';
import 'rxjs/add/operator/toPromise';
import { Headers, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class Configuration {
  // public  url: string = " http://cornerstone-testing.njs.jelastic.vps-host.net";
  // public  baseUrl: string = " http://cornerstone-testing.njs.jelastic.vps-host.net/";
  // public  Server: string = " http://cornerstone-testing.njs.jelastic.vps-host.net/";

  public  url: string = " http://cornerstone.njs.jelastic.vps-host.net";
  public  baseUrl: string = " http://cornerstone.njs.jelastic.vps-host.net/";
  public  Server: string = " http://cornerstone.njs.jelastic.vps-host.net/";

  // public  url: string = " https://cornerstone.ind-cloud.everdata.com";
  // public  baseUrl: string = " https://cornerstone.ind-cloud.everdata.com/";
  // public  Server: string = " https://cornerstone.ind-cloud.everdata.com/";
    
  // public  url: string = "http://nxtlife-testing.ind-cloud.everdata.com";
  // public  baseUrl: string = "http://nxtlife-testing.ind-cloud.everdata.com/";
  // public  Server: string = "http://nxtlife-testing.ind-cloud.everdata.com/";

  
  // public  url: string = "http://yugma.ind-cloud.everdata.com";
  // public  baseUrl: string = "http://yugma.ind-cloud.everdata.com/";
  // public  Server: string = "http://yugma.ind-cloud.everdata.com/";

  userId: any;
  access_token: string;
  role: string;
  headers: any;
  options: any;


  constructor() {
  this.setAccessToken()
  }

  // set access_token after user login
  setAccessToken() {
    this.getRole();
  }

  getRole() {
    this.role = localStorage.getItem("role");
    this.getUserId();

    return this.role;
  }

  getUserId() {
    this.userId = localStorage.getItem("id");
    this.Server = this.baseUrl + this.role + "/" + this.userId;
    console.log(this.Server);
    return this.userId;
  }
}
