import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { XHRBackend, RequestOptions, HttpModule } from '@angular/http';

import { MainComponent } from "./main.component";
// import { EventComponent } from "../event/event.component";
// import { FoodmenuComponent } from "../foodmenu/foodmenu.component"; 
import { ViewSurveyComponent } from "../survey/view/survey";
// import { CalendarComponent } from "../../angular2-fullcalendar/src/calendar/calendar";
import { SharedModule } from '../../shared.module';

import { LoggedInGuard } from "../login/login.gaurd";
import { Configuration } from "../../providers/app.constant";
import { CommonService } from "../../providers/common.service";
import { CustomHttpService } from "../../providers/default.header.service";
import { AuthService } from "../../providers/auth.service";
import { ChartService } from "../../providers/chart.service";
import { ValidationService } from "../../providers/formValidation.service";
import { AdminService } from "../../providers/admin.service";
import { EventService } from "../../providers/event.service";
import { FoodmenuService } from "../../providers/foodmenu.service";

import { ErrorComponent } from "../error/error.component";
import { Error404Component } from "../error/error404";
const rootRouterConfig:Routes = [
{path : '' , redirectTo:'dashboard' , pathMatch:'full'},
  { path: '', component: MainComponent,
  children:[
    { path: 'dashboard', loadChildren: 'app/component/dashboard/dashboard.module#DashboardModule' },
    { path: 'complaint', loadChildren : 'app/component/complaint/complaint.module#ComplaintModule' },
    { path: 'circular', loadChildren: 'app/component/circular/circular.module#CircularModule' },
    { path: 'time-table', loadChildren: 'app/component/timetable/timetable.module#TimeTable' },
    { path: 'homework', loadChildren: 'app/component/homework/homework.module#HomeworkModule',},
    { path: 'account', loadChildren : 'app/component/account/account.module#AccountModule' },
    { path: 'add-employee', loadChildren : 'app/component/addEmployee/addEmployee.module#AddEmployeeModule' },
    { path: 'add-student', loadChildren: 'app/component/addStudent/addStudent.module#AddStudentModule' },
    { path: 'appreciation', loadChildren: 'app/component/appreciation/appreciation.module#AppreciationModule'},
    { path: 'poll', loadChildren: 'app/component/poll/poll.module#PollModule' },
    { path: 'conversation', loadChildren: 'app/component/message/message.module#MessageModule', },
    { path: 'event', loadChildren: 'app/component/event/event.module#EventModule' },
    // { path: 'foodmenu', component: FoodmenuComponent },    
    { path: 'survey', loadChildren: 'app/component/survey/survey.module#SurveyModule' },    
    { path: 'student-profile', loadChildren: 'app/component/studentRating/studentRating.module#StudentRatingModule' },
    { path: 'view-survey/:id', component: ViewSurveyComponent },
    { path: 'suggestion', loadChildren: 'app/component/suggestion/suggestion.module#SuggestionModule' },
    { path: 'foodmenu', loadChildren: 'app/component/foodmenu/foodmenu.module#FoodmenuModule' },    
  ]},
  { path: 'error', component: ErrorComponent },
  { path: 'error404', component: Error404Component },
 { path: '**', redirectTo: '/error404' },
];


@NgModule({
imports: [
  SharedModule,
  HttpModule,
  RouterModule.forChild(rootRouterConfig),
  ],
  declarations: [
    MainComponent,
    // CalendarComponent,
    // EventComponent,
    // FoodmenuComponent,
    ViewSurveyComponent,
    ErrorComponent,
    Error404Component,
    ],
  providers: [
    LoggedInGuard,
    Configuration,
    CommonService,
    CustomHttpService,
    AuthService,
    ChartService,
    ValidationService,
    AdminService,
    EventService,
    FoodmenuService,
    {
      provide: CustomHttpService,
      useFactory: (backend: XHRBackend, defaultOptions: RequestOptions) => {
        return new CustomHttpService(backend, defaultOptions);
      },
      deps: [XHRBackend, RequestOptions]
    }
   ],
})
export class MainModule{ }