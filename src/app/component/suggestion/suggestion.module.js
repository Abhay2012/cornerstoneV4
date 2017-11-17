"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var suggestion_component_1 = require("./suggestion.component");
var router_1 = require("@angular/router");
var shared_module_1 = require("../../shared.module");
var forstudent_1 = require("./for-student/forstudent");
var forme_1 = require("./for-me/forme");
var add_1 = require("./add/add");
var suggestion_service_1 = require("../../providers/suggestion.service");
var SuggestionModule = /** @class */ (function () {
    function SuggestionModule() {
    }
    SuggestionModule = __decorate([
        core_1.NgModule({
            imports: [shared_module_1.SharedModule, router_1.RouterModule.forChild([
                    {
                        path: '',
                        component: suggestion_component_1.SuggestionComponent,
                        children: [
                            {
                                path: 'for-student',
                                component: forstudent_1.SuggestionForStudent
                            },
                            {
                                path: 'for-me',
                                component: forme_1.SuggestionForMe
                            }
                        ]
                    },
                    {
                        path: 'add-suggestion',
                        component: add_1.SuggestionAddComponent
                    }
                ])],
            declarations: [add_1.SuggestionAddComponent, suggestion_component_1.SuggestionComponent, forstudent_1.SuggestionForStudent, forme_1.SuggestionForMe],
            providers: [suggestion_service_1.SuggestionService]
        })
    ], SuggestionModule);
    return SuggestionModule;
}());
exports.SuggestionModule = SuggestionModule;
//# sourceMappingURL=suggestion.module.js.map