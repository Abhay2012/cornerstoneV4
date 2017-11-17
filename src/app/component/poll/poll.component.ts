import {Component} from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';

@Component({
selector:'poll',
templateUrl:'./poll.component.html',
styleUrls:['./poll.component.css'],
})

export class PollComponent {
    constructor(public router:Router){
         
        //  this.router.navigate(["/poll/current-poll"]);
    }

}

