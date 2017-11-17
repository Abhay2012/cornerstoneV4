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
var main_component_1 = require("./main.component");
var login_gaurd_1 = require("../login/login.gaurd");
var forgot_password_1 = require("../login/forgot.password");
var dashboard_component_1 = require("../dashboard/dashboard.component");
var complaint_component_1 = require("../complaint/complaint.component");
var circular_component_1 = require("../circular/circular.component");
var add_1 = require("../circular/add/add");
var homework_component_1 = require("../homework/homework.component");
var homework_1 = require("../homework/current/homework");
var homework_2 = require("../homework/passed/homework");
var add_2 = require("../homework/add/add");
var account_component_1 = require("../account/account.component");
var addEmployee_component_1 = require("../addEmployee/addEmployee.component");
var addStudent_component_1 = require("../addStudent/addStudent.component");
var newStudent_component_1 = require("../addStudent/newStudent/newStudent.component");
var existingStudent_component_1 = require("../addStudent/existingStudent/existingStudent.component");
var appreciation_component_1 = require("../appreciation/appreciation.component");
var forme_1 = require("../appreciation/for-me/forme");
var byme_1 = require("../appreciation/by-me/byme");
var add_3 = require("../appreciation/add/add");
var poll_component_1 = require("../poll/poll.component");
var poll_1 = require("../poll/closed/poll");
var poll_2 = require("../poll/current/poll");
var add_4 = require("../poll/add/add");
var message_component_1 = require("../message/message.component");
// import { EventComponent } from "../event/event.component";
var survey_component_1 = require("../survey/survey.component");
var survey_1 = require("../survey/current/survey");
var survey_2 = require("../survey/closed/survey");
var add_5 = require("../survey/add/add");
var studentRating_component_1 = require("../studentRating/studentRating.component");
var survey_3 = require("../survey/view/survey");
var suggestion_component_1 = require("../suggestion/suggestion.component");
var forme_2 = require("../suggestion/for-me/forme");
var forstudent_1 = require("../suggestion/for-student/forstudent");
var add_6 = require("../suggestion/add/add");
// import { FoodmenuComponent } from "../foodmenu/foodmenu.component";
var MainRoutingModule = /** @class */ (function () {
    function MainRoutingModule() {
    }
    MainRoutingModule = __decorate([
        core_1.NgModule({
            imports: [router_1.RouterModule.forChild([
                    { path: '', component: main_component_1.MainComponent,
                        children: [
                            { path: 'forgot-password', component: forgot_password_1.ForgotPassword },
                            { path: 'dashboard', component: dashboard_component_1.DashboardComponent, canActivate: [login_gaurd_1.LoggedInGuard] },
                            { path: 'complaint', component: complaint_component_1.ComplaintComponent, canActivate: [login_gaurd_1.LoggedInGuard] },
                            { path: 'complaint/status/:statusId', component: complaint_component_1.ComplaintComponent, canActivate: [login_gaurd_1.LoggedInGuard] },
                            { path: 'complaint/category-status/category/:categoryId', component: complaint_component_1.ComplaintComponent, canActivate: [login_gaurd_1.LoggedInGuard] },
                            { path: 'complaint/category-status/:categoryId/:statusId', component: complaint_component_1.ComplaintComponent, canActivate: [login_gaurd_1.LoggedInGuard] },
                            { path: 'circular', component: circular_component_1.CircularComponent, canActivate: [login_gaurd_1.LoggedInGuard] },
                            { path: 'add-circular', component: add_1.AddCircular, canActivate: [login_gaurd_1.LoggedInGuard] },
                            {
                                path: 'homework', component: homework_component_1.HomeworkComponent, canActivate: [login_gaurd_1.LoggedInGuard],
                                children: [
                                    { path: 'current-homework', component: homework_1.CurrentHomework, canActivate: [login_gaurd_1.LoggedInGuard] },
                                    { path: 'passed-homework', component: homework_2.PassedHomework, canActivate: [login_gaurd_1.LoggedInGuard] }
                                ]
                            },
                            { path: 'homework-add', component: add_2.HomeworkAddComponent, canActivate: [login_gaurd_1.LoggedInGuard] },
                            { path: 'account', component: account_component_1.AccountComponent },
                            { path: 'add-employee', component: addEmployee_component_1.AddEmployeeComponent, canActivate: [login_gaurd_1.LoggedInGuard] },
                            {
                                path: 'add-student', component: addStudent_component_1.AddStudentComponent, canActivate: [login_gaurd_1.LoggedInGuard],
                                children: [
                                    { path: 'new-student', component: newStudent_component_1.NewStudentComponent, canActivate: [login_gaurd_1.LoggedInGuard] },
                                    { path: 'existing-student', component: existingStudent_component_1.ExistingStudentComponent, canActivate: [login_gaurd_1.LoggedInGuard] },
                                ]
                            },
                            {
                                path: 'appreciation', component: appreciation_component_1.AppreciationComponent, canActivate: [login_gaurd_1.LoggedInGuard],
                                children: [
                                    { path: 'for-me', component: forme_1.ForMeComponent, canActivate: [login_gaurd_1.LoggedInGuard] },
                                    { path: 'for-student', component: byme_1.ByMeComponent, canActivate: [login_gaurd_1.LoggedInGuard] }
                                ]
                            },
                            { path: 'add-appreciation', component: add_3.AddAppreciation, canActivate: [login_gaurd_1.LoggedInGuard] },
                            {
                                path: 'poll', component: poll_component_1.PollComponent, canActivate: [login_gaurd_1.LoggedInGuard],
                                children: [
                                    { path: 'current-poll', component: poll_2.CurrentPollComponent, canActivate: [login_gaurd_1.LoggedInGuard] },
                                    { path: 'closed-poll', component: poll_1.ClosedPollComponent, canActivate: [login_gaurd_1.LoggedInGuard] }
                                ]
                            },
                            { path: 'add-poll', component: add_4.AddPollComponent, canActivate: [login_gaurd_1.LoggedInGuard] },
                            { path: 'conversation', component: message_component_1.MessageComponent, canActivate: [login_gaurd_1.LoggedInGuard], },
                            // { path: 'event', component: EventComponent, canActivate: [LoggedInGuard] },
                            {
                                path: 'survey', component: survey_component_1.SurveyComponent, canActivate: [login_gaurd_1.LoggedInGuard],
                                children: [
                                    {
                                        path: 'current-survey', component: survey_1.CurrentSurveyComponent, canActivate: [login_gaurd_1.LoggedInGuard],
                                    },
                                    { path: 'closed-survey', component: survey_2.ClosedSurveyComponent, canActivate: [login_gaurd_1.LoggedInGuard] },
                                ]
                            },
                            { path: 'add-survey', component: add_5.AddSurveyComponent, canActivate: [login_gaurd_1.LoggedInGuard] },
                            {
                                path: 'poll', component: poll_component_1.PollComponent, canActivate: [login_gaurd_1.LoggedInGuard],
                                children: [
                                    { path: 'current-poll', component: poll_2.CurrentPollComponent, canActivate: [login_gaurd_1.LoggedInGuard] },
                                    { path: 'closed-poll', component: poll_1.ClosedPollComponent, canActivate: [login_gaurd_1.LoggedInGuard] }
                                ]
                            },
                            { path: 'add-poll', component: add_4.AddPollComponent, canActivate: [login_gaurd_1.LoggedInGuard] },
                            { path: 'add-employee', component: addEmployee_component_1.AddEmployeeComponent, canActivate: [login_gaurd_1.LoggedInGuard] },
                            { path: 'student-profile', component: studentRating_component_1.StudentRatingComponent, canActivate: [login_gaurd_1.LoggedInGuard] },
                            { path: 'view-survey/:id', component: survey_3.ViewSurveyComponent, canActivate: [login_gaurd_1.LoggedInGuard] },
                            {
                                path: 'suggestion', component: suggestion_component_1.SuggestionComponent,
                                children: [
                                    { path: 'for-me', component: forme_2.SuggestionForMe, canActivate: [login_gaurd_1.LoggedInGuard] },
                                    { path: 'for-student', component: forstudent_1.SuggestionForStudent, canActivate: [login_gaurd_1.LoggedInGuard] }
                                ]
                            },
                            { path: 'suggestion-add', component: add_6.SuggestionAddComponent, canActivate: [login_gaurd_1.LoggedInGuard] },
                        ]
                    }
                ])],
            exports: [router_1.RouterModule]
        })
    ], MainRoutingModule);
    return MainRoutingModule;
}());
exports.MainRoutingModule = MainRoutingModule;
//# sourceMappingURL=main.routing.module.js.map