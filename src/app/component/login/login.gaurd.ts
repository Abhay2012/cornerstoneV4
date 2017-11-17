import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { Configuration } from '../../providers/app.constant';
@Injectable()
export class LoggedInGuard implements CanActivate {

  constructor(public router: Router,
              public con: Configuration) {
  }

  canActivate() {
    if (localStorage.getItem('username')) {
            this.con.setAccessToken();            
            return true;
        } 
        this.router.navigate(['/login']);
        return false;
  }

  public  isLoggedIn(){
    return this.canActivate();
  }

  getData(key:any){
    return localStorage.getItem(key);
  }

}