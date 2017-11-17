"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var router_1 = require("@angular/router");
var http_1 = require("@angular/http");
var main_component_1 = require("./main.component");
// import { EventComponent } from "../event/event.component";
// import { FoodmenuComponent } from "../foodmenu/foodmenu.component"; 
var survey_1 = require("../survey/view/survey");
// import { CalendarComponent } from "../../angular2-fullcalendar/src/calendar/calendar";
var shared_module_1 = require("../../shared.module");
var login_gaurd_1 = require("../login/login.gaurd");
var app_constant_1 = require("../../providers/app.constant");
var common_service_1 = require("../../providers/common.service");
var default_header_service_1 = require("../../providers/default.header.service");
var auth_service_1 = require("../../providers/auth.service");
var chart_service_1 = require("../../providers/chart.service");
var formValidation_service_1 = require("../../providers/formValidation.service");
var admin_service_1 = require("../../providers/admin.service");
var event_service_1 = require("../../providers/event.service");
var foodmenu_service_1 = require("../../providers/foodmenu.service");
var error_component_1 = require("../error/error.component");
var error404_1 = require("../error/error404");
var rootRouterConfig = [
    { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
    { path: '', component: main_component_1.MainComponent,
        children: [
            { path: 'dashboard', loadChildren: 'app/component/dashboard/dashboard.module#DashboardModule' },
            { path: 'complaint', loadChildren: 'app/component/complaint/complaint.module#ComplaintModule' },
            { path: 'circular', loadChildren: 'app/component/circular/circular.module#CircularModule' },
            { path: 'time-table', loadChildren: 'app/component/timetable/timetable.module#TimeTable' },
            { path: 'homework', loadChildren: 'app/component/homework/homework.module#HomeworkModule', },
            { path: 'account', loadChildren: 'app/component/account/account.module#AccountModule' },
            { path: 'add-employee', loadChildren: 'app/component/addEmployee/addEmployee.module#AddEmployeeModule' },
            { path: 'add-student', loadChildren: 'app/component/addStudent/addStudent.module#AddStudentModule' },
            { path: 'appreciation', loadChildren: 'app/component/appreciation/appreciation.module#AppreciationModule' },
            { path: 'poll', loadChildren: 'app/component/poll/poll.module#PollModule' },
            { path: 'conversation', loadChildren: 'app/component/message/message.module#MessageModule', },
            { path: 'event', loadChildren: 'app/component/event/event.module#EventModule' },
            // { path: 'foodmenu', component: FoodmenuComponent },    
            { path: 'survey', loadChildren: 'app/component/survey/survey.module#SurveyModule' },
            { path: 'student-profile', loadChildren: 'app/component/studentRating/studentRating.module#StudentRatingModule' },
            { path: 'view-survey/:id', component: survey_1.ViewSurveyComponent },
            { path: 'suggestion', loadChildren: 'app/component/suggestion/suggestion.module#SuggestionModule' },
            { path: 'foodmenu', loadChildren: 'app/component/foodmenu/foodmenu.module#FoodmenuModule' },
        ] },
    { path: 'error', component: error_component_1.ErrorComponent },
    { path: 'error404', component: error404_1.Error404Component },
    { path: '**', redirectTo: '/error404' },
];
var MainModule = /** @class */ (function () {
    function MainModule() {
    }
    MainModule = __decorate([
        core_1.NgModule({
            imports: [
                shared_module_1.SharedModule,
                http_1.HttpModule,
                router_1.RouterModule.forChild(rootRouterConfig),
            ],
            declarations: [
                main_component_1.MainComponent,
                // CalendarComponent,
                // EventComponent,
                // FoodmenuComponent,
                survey_1.ViewSurveyComponent,
                error_component_1.ErrorComponent,
                error404_1.Error404Component,
            ],
            providers: [
                login_gaurd_1.LoggedInGuard,
                app_constant_1.Configuration,
                common_service_1.CommonService,
                default_header_service_1.CustomHttpService,
                auth_service_1.AuthService,
                chart_service_1.ChartService,
                formValidation_service_1.ValidationService,
                admin_service_1.AdminService,
                event_service_1.EventService,
                foodmenu_service_1.FoodmenuService,
                {
                    provide: default_header_service_1.CustomHttpService,
                    useFactory: function (backend, defaultOptions) {
                        return new default_header_service_1.CustomHttpService(backend, defaultOptions);
                    },
                    deps: [http_1.XHRBackend, http_1.RequestOptions]
                }
            ],
        })
    ], MainModule);
    return MainModule;
}());
exports.MainModule = MainModule;
//# sourceMappingURL=main.module.js.map