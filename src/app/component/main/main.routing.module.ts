import { NgModule }            from '@angular/core';
import { RouterModule }        from '@angular/router';
import { MainComponent } from "./main.component";
import { LoggedInGuard } from "../login/login.gaurd";
import { ForgotPassword } from "../login/forgot.password";
import { DashboardComponent } from "../dashboard/dashboard.component";
import { ComplaintComponent } from "../complaint/complaint.component";
import { CircularComponent } from "../circular/circular.component";
import { AddCircular } from "../circular/add/add";
import { HomeworkComponent } from "../homework/homework.component";
import { CurrentHomework } from "../homework/current/homework";
import { PassedHomework } from "../homework/passed/homework";
import { HomeworkAddComponent } from "../homework/add/add";
import { AccountComponent } from "../account/account.component";
import { AddEmployeeComponent } from "../addEmployee/addEmployee.component";
import { AddStudentComponent } from "../addStudent/addStudent.component";
import { NewStudentComponent } from "../addStudent/newStudent/newStudent.component";
import { ExistingStudentComponent } from "../addStudent/existingStudent/existingStudent.component";
import { AppreciationComponent } from "../appreciation/appreciation.component";
import { ForMeComponent } from "../appreciation/for-me/forme";
import { ByMeComponent } from "../appreciation/by-me/byme";
import { AddAppreciation } from "../appreciation/add/add";
import { PollComponent } from "../poll/poll.component";
import { ClosedPollComponent } from "../poll/closed/poll";
import { CurrentPollComponent } from "../poll/current/poll";
import { AddPollComponent } from "../poll/add/add";
import { MessageComponent } from "../message/message.component";
// import { EventComponent } from "../event/event.component";
import { SurveyComponent } from "../survey/survey.component";
import { CurrentSurveyComponent } from "../survey/current/survey";
import { ClosedSurveyComponent } from "../survey/closed/survey";
import { AddSurveyComponent } from "../survey/add/add";
import { StudentRatingComponent } from "../studentRating/studentRating.component";
import { ViewSurveyComponent } from "../survey/view/survey";
import { SuggestionComponent } from "../suggestion/suggestion.component";
import { SuggestionForMe } from "../suggestion/for-me/forme";
import { SuggestionForStudent } from "../suggestion/for-student/forstudent";
import { SuggestionAddComponent } from "../suggestion/add/add";
// import { FoodmenuComponent } from "../foodmenu/foodmenu.component";

@NgModule({
  imports: [RouterModule.forChild([
    { path: '', component: MainComponent,
    children:[
      { path: 'forgot-password', component: ForgotPassword },
      { path: 'dashboard', component: DashboardComponent, canActivate: [LoggedInGuard] },
      { path: 'complaint', component: ComplaintComponent, canActivate: [LoggedInGuard] },
      { path: 'complaint/status/:statusId', component: ComplaintComponent, canActivate: [LoggedInGuard] },
      { path: 'complaint/category-status/category/:categoryId', component: ComplaintComponent, canActivate: [LoggedInGuard] },
      { path: 'complaint/category-status/:categoryId/:statusId', component: ComplaintComponent, canActivate: [LoggedInGuard] },
      { path: 'circular', component: CircularComponent, canActivate: [LoggedInGuard] },
      { path: 'add-circular', component: AddCircular, canActivate: [LoggedInGuard] },
      {
        path: 'homework', component: HomeworkComponent, canActivate: [LoggedInGuard],
        children: [
          { path: 'current-homework', component: CurrentHomework, canActivate: [LoggedInGuard] },
          { path: 'passed-homework', component: PassedHomework, canActivate: [LoggedInGuard] }
        ]
      },
      { path: 'homework-add', component: HomeworkAddComponent, canActivate: [LoggedInGuard] },
      { path: 'account', component: AccountComponent },
      { path: 'add-employee', component: AddEmployeeComponent, canActivate: [LoggedInGuard] },
      {
        path: 'add-student', component: AddStudentComponent, canActivate: [LoggedInGuard],
        children: [
          { path: 'new-student', component: NewStudentComponent, canActivate: [LoggedInGuard] },
          { path: 'existing-student', component: ExistingStudentComponent, canActivate: [LoggedInGuard] },

        ]
      },
      {
        path: 'appreciation', component: AppreciationComponent, canActivate: [LoggedInGuard],
        children: [
          { path: 'for-me', component: ForMeComponent, canActivate: [LoggedInGuard] },
          { path: 'for-student', component: ByMeComponent, canActivate: [LoggedInGuard] }
        ]
      },
      { path: 'add-appreciation', component: AddAppreciation, canActivate: [LoggedInGuard] },
      {
        path: 'poll', component: PollComponent, canActivate: [LoggedInGuard],
        children: [
          { path: 'current-poll', component: CurrentPollComponent, canActivate: [LoggedInGuard] },
          { path: 'closed-poll', component: ClosedPollComponent, canActivate: [LoggedInGuard] }
        ]
      },
      { path: 'add-poll', component: AddPollComponent, canActivate: [LoggedInGuard] },
      { path: 'conversation', component: MessageComponent, canActivate: [LoggedInGuard], },
      // { path: 'event', component: EventComponent, canActivate: [LoggedInGuard] },
      {
        path: 'survey', component: SurveyComponent, canActivate: [LoggedInGuard],
        children: [
          {
            path: 'current-survey', component: CurrentSurveyComponent, canActivate: [LoggedInGuard],
            // children: [

            //   { path: 'view-survey', component: ViewSurveyComponent, canActivate: [LoggedInGuard] }
            // ]

          },
          { path: 'closed-survey', component: ClosedSurveyComponent, canActivate: [LoggedInGuard] },

        ]
      },
      { path: 'add-survey', component: AddSurveyComponent, canActivate: [LoggedInGuard] },
      {
        path: 'poll', component: PollComponent, canActivate: [LoggedInGuard],
        children: [
          { path: 'current-poll', component: CurrentPollComponent, canActivate: [LoggedInGuard] },
          { path: 'closed-poll', component: ClosedPollComponent, canActivate: [LoggedInGuard] }
        ]
      },
      { path: 'add-poll', component: AddPollComponent, canActivate: [LoggedInGuard] },
      { path: 'add-employee', component: AddEmployeeComponent, canActivate: [LoggedInGuard] },
      { path: 'student-profile', component: StudentRatingComponent, canActivate: [LoggedInGuard] },
      { path: 'view-survey/:id', component: ViewSurveyComponent, canActivate: [LoggedInGuard] },
      {
        path: 'suggestion', component: SuggestionComponent,
        children: [
          { path: 'for-me', component: SuggestionForMe, canActivate: [LoggedInGuard] },
          { path: 'for-student', component: SuggestionForStudent, canActivate: [LoggedInGuard] }
        ]
      },
      { path: 'suggestion-add', component: SuggestionAddComponent, canActivate: [LoggedInGuard] },
      // { path: 'foodmenu', component: FoodmenuComponent, canActivate: [LoggedInGuard] },      
    ]
      
    }
  ])],
  exports: [RouterModule]
})
export class MainRoutingModule {}