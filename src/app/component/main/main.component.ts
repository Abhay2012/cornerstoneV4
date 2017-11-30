import { Component, AfterViewInit, OnInit } from '@angular/core';
import { LoggedInGuard } from '../login/login.gaurd';
import { AppreciationComponent } from '../appreciation/appreciation.component';
import { AddSurveyComponent } from '../survey/add/add';
import { SurveyComponent } from '../survey/survey.component';
import { PollComponent } from '../poll/poll.component'
import { StudentRatingComponent } from '../studentRating/studentRating.component'
import { MessageComponent } from '../message/message.component';
import { AddEmployeeComponent } from '../addEmployee/addEmployee.component';
import { AddStudentComponent } from '../addStudent/addStudent.component';
// import { FoodmenuComponent } from '../foodmenu/foodmenu.component';
// import {EventComponent} from '../event/event.component';
import { SuggestionComponent } from '../suggestion/suggestion.component';
import { AccountComponent } from '../account/account.component';


declare let $: any;

@Component({
  selector: 'main',
  templateUrl: "./main.component.html",
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit, AfterViewInit {
  public  displayProfile: boolean = true;
  public  user: any;
  public  role:any;
  public  classTeacher:any;
  public  isLoggedIn: boolean = false;
  public  selectedIndex: any = 0;
  public  pages = [
    { title: 'Dashboard' , icon: 'assets/icons/dashboard.png', url: '/dashboard' },
    { title: 'Complaints', icon: 'assets/icons/complaint.png', url: '/complaint' },
    // { title: 'Suggestion', component: SuggestionComponent, icon: 'icons/suggestion.png', url: '/suggestion/for-me'} ,
    { title: 'Appreciation', icon: 'assets/icons/appreciation.png', url: '/appreciation' },
    { title: 'Messaging', icon: 'assets/icons/message.png', url: '/conversation'},
    { title: 'Events', icon: 'assets/icons/event.png', url: '/event'},
    { title: 'Poll', icon: 'assets/icons/poll.png', url: '/poll' },
    // { title: 'Survey', component: SurveyComponent, icon: 'assets/icons/survey.png', url: '/survey' },
    // { title: 'Food Menu', component: FoodmenuComponent, icon: 'assets/icons/food.png', url: '/foodmenu' },    
    { title: 'Circular', icon: 'assets/icons/circular.png', url: '/circular' },
    { title: 'Homework', icon: 'assets/icons/homework.png', url: '/homework' },
    { title: 'Student Rating', icon: 'assets/icons/rating.png', url: '/student-profile' },
    // { title: 'Time Table', icon : '/assets/icons/calendar.png', url:'/time-table' }
    //  { title: 'Add Employee', component: AddEmployeeComponent, icon: '', url:'/add-employee'},
    //  {title: 'Add Student', component: AddStudentComponent, icon: '', url: '/add-student'},
    
    // { title: 'Profile', component: AccountComponent, icon: 'assets/icons/profile.png', url: '/account'},      
    // { title: 'Message', component: MessageComponent, icon: 'icons/message.png', url: '/messaging'},
    
  ];

  constructor(public  log: LoggedInGuard) {

  }
  getSelectedLink(i: any) {
    this.selectedIndex = i;
  }
  ngOnInit() {
     jQuery.noConflict(); 
    if (this.log.isLoggedIn()) this.isLoggedIn = true;
    else this.isLoggedIn = false;
    // this.checkStudentRating();
this.role=this.log.getData('role');
    
  }

  ngAfterViewInit() {

    var alterClass = function() {
      var ww = document.body.clientWidth;
      if (ww >= 521) {
      $("#wrapper").toggleClass("toggled");
      } else if (ww < 520) {
        $('#wrapper').removeClass('toggled');
      };
    };

     var shiftLeft=function(){
        if($('#wrapper').hasClass('toggled')){
           $('#page-content-wrapper').addClass('shiftLeft');
        }
        else{
           $('#page-content-wrapper').removeClass('shiftLeft');
        }
    }

  $(window).resize(function(){
    alterClass();
    shiftLeft();
        
  });

  alterClass();
  shiftLeft();
  
  $("#menu-toggle").click(function (e: any) {
     $("#wrapper").toggleClass("toggled");
     shiftLeft();
  });
    
//   $("body").mouseup(function(e:any) 
// {
//     var container = $("#profile-card");

//     // if the target of the click isn't the container nor a descendant of the container
//     if (!container.is(e.target) && container.has(e.target).length === 0) 
//     {
//         container.hide();
//     }
// });

  }
   logout() {
    localStorage.clear();
  }



}