import { Injectable } from '@angular/core';
import { CanLoad, Router, Route } from '@angular/router';
@Injectable()
export class AuthGuard implements CanLoad {

  constructor(public router: Router) {

  }

  canLoad( route : Route) {
    if (localStorage.getItem('access_token')) {      
            return true;
        } 
        this.router.navigate(['/login']);
        return false;
  }

}