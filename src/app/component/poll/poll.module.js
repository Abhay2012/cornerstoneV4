"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var poll_component_1 = require("./poll.component");
var router_1 = require("@angular/router");
var shared_module_1 = require("../../shared.module");
var poll_1 = require("./current/poll");
var poll_2 = require("./closed/poll");
var add_1 = require("./add/add");
var poll_service_1 = require("../../providers/poll.service");
var PollModule = /** @class */ (function () {
    function PollModule() {
    }
    PollModule = __decorate([
        core_1.NgModule({
            imports: [shared_module_1.SharedModule, router_1.RouterModule.forChild([
                    { path: '', redirectTo: 'current-poll', pathMatch: 'full' },
                    {
                        path: '',
                        component: poll_component_1.PollComponent,
                        children: [
                            {
                                path: 'current-poll',
                                component: poll_1.CurrentPollComponent
                            },
                            {
                                path: 'closed-poll',
                                component: poll_2.ClosedPollComponent
                            }
                        ]
                    },
                    {
                        path: 'add-poll',
                        component: add_1.AddPollComponent
                    }
                ])],
            declarations: [add_1.AddPollComponent, poll_component_1.PollComponent, poll_1.CurrentPollComponent, poll_2.ClosedPollComponent],
            providers: [poll_service_1.PollService]
        })
    ], PollModule);
    return PollModule;
}());
exports.PollModule = PollModule;
//# sourceMappingURL=poll.module.js.map