"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var homework_component_1 = require("./homework.component");
var router_1 = require("@angular/router");
var shared_module_1 = require("../../shared.module");
var homework_1 = require("./current/homework");
var homework_2 = require("./passed/homework");
var add_1 = require("./add/add");
var homework_service_1 = require("../../providers/homework.service");
var HomeworkModule = /** @class */ (function () {
    function HomeworkModule() {
    }
    HomeworkModule = __decorate([
        core_1.NgModule({
            imports: [shared_module_1.SharedModule, router_1.RouterModule.forChild([
                    { path: '', redirectTo: 'current-homework', pathMatch: 'full' },
                    {
                        path: '',
                        component: homework_component_1.HomeworkComponent,
                        children: [
                            {
                                path: 'current-homework',
                                component: homework_1.CurrentHomework
                            },
                            {
                                path: 'passed-homework',
                                component: homework_2.PassedHomework
                            }
                        ]
                    },
                    {
                        path: 'homework-add',
                        component: add_1.HomeworkAddComponent
                    }
                ])],
            declarations: [add_1.HomeworkAddComponent, homework_component_1.HomeworkComponent, homework_1.CurrentHomework, homework_2.PassedHomework],
            providers: [homework_service_1.HomeworkService]
        })
    ], HomeworkModule);
    return HomeworkModule;
}());
exports.HomeworkModule = HomeworkModule;
//# sourceMappingURL=homework.module.js.map