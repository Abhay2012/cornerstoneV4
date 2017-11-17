"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var survey_component_1 = require("./survey.component");
var router_1 = require("@angular/router");
var shared_module_1 = require("../../shared.module");
var survey_1 = require("./current/survey");
var survey_2 = require("./closed/survey");
var add_1 = require("./add/add");
var survey_service_1 = require("../../providers/survey.service");
var SurveyModule = /** @class */ (function () {
    function SurveyModule() {
    }
    SurveyModule = __decorate([
        core_1.NgModule({
            imports: [shared_module_1.SharedModule, router_1.RouterModule.forChild([
                    {
                        path: '',
                        component: survey_component_1.SurveyComponent,
                        children: [
                            {
                                path: 'current-survey',
                                component: survey_1.CurrentSurveyComponent
                            },
                            {
                                path: 'closed-survey',
                                component: survey_2.ClosedSurveyComponent
                            }
                        ]
                    },
                    {
                        path: 'add-survey',
                        component: add_1.AddSurveyComponent
                    }
                ])],
            declarations: [add_1.AddSurveyComponent, survey_component_1.SurveyComponent, survey_1.CurrentSurveyComponent, survey_2.ClosedSurveyComponent],
            providers: [survey_service_1.SurveyService]
        })
    ], SurveyModule);
    return SurveyModule;
}());
exports.SurveyModule = SurveyModule;
//# sourceMappingURL=survey.module.js.map