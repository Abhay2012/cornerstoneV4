import {Component} from '@angular/core';
import {Location} from '@angular/common'

import { LoaderStop } from "../../providers/loaderstop.service";

@Component({
  selector:'error',
  templateUrl:'./error.component.html',
  styleUrls: ['./error.component.css']
})

export class ErrorComponent{
  constructor(
    public _location:Location,
    public ls : LoaderStop
  ){
  	ls.setLoader(false);
  }

  refresh(){
    localStorage.clear();
  }
}