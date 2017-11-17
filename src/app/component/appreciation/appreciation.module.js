"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var appreciation_component_1 = require("./appreciation.component");
var router_1 = require("@angular/router");
var shared_module_1 = require("../../shared.module");
var byme_1 = require("./by-me/byme");
var forme_1 = require("./for-me/forme");
var add_1 = require("./add/add");
var appreciation_service_1 = require("../../providers/appreciation.service");
var complaint_service_1 = require("../../providers/complaint.service");
var filter_pipe_1 = require("./filter.pipe");
var AppreciationModule = /** @class */ (function () {
    function AppreciationModule() {
    }
    AppreciationModule = __decorate([
        core_1.NgModule({
            imports: [shared_module_1.SharedModule, router_1.RouterModule.forChild([
                    { path: '', redirectTo: 'for-me', pathMatch: 'full' },
                    {
                        path: '',
                        component: appreciation_component_1.AppreciationComponent,
                        children: [
                            {
                                path: 'for-student',
                                component: byme_1.ByMeComponent
                            },
                            {
                                path: 'for-me',
                                component: forme_1.ForMeComponent
                            }
                        ]
                    },
                    {
                        path: 'add-appreciation',
                        component: add_1.AddAppreciation
                    }
                ])],
            declarations: [add_1.AddAppreciation, byme_1.ByMeComponent, filter_pipe_1.FilterPipe, appreciation_component_1.AppreciationComponent, forme_1.ForMeComponent],
            providers: [appreciation_service_1.AppreciationService, complaint_service_1.ComplaintService]
        })
    ], AppreciationModule);
    return AppreciationModule;
}());
exports.AppreciationModule = AppreciationModule;
//# sourceMappingURL=appreciation.module.js.map