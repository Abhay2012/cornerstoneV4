"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var complaint_component_1 = require("./complaint.component");
var router_1 = require("@angular/router");
var shared_module_1 = require("../../shared.module");
var complaint_service_1 = require("../../providers/complaint.service");
var ComplaintModule = /** @class */ (function () {
    function ComplaintModule() {
    }
    ComplaintModule = __decorate([
        core_1.NgModule({
            imports: [shared_module_1.SharedModule, router_1.RouterModule.forChild([
                    {
                        path: '',
                        component: complaint_component_1.ComplaintComponent
                    },
                    {
                        path: 'status/:statusId',
                        component: complaint_component_1.ComplaintComponent
                    },
                    {
                        path: 'category-status/category/:categoryId',
                        component: complaint_component_1.ComplaintComponent
                    },
                    {
                        path: 'category-status/:categoryId/:statusId',
                        component: complaint_component_1.ComplaintComponent
                    }
                ])],
            declarations: [complaint_component_1.ComplaintComponent],
            providers: [complaint_service_1.ComplaintService]
        })
    ], ComplaintModule);
    return ComplaintModule;
}());
exports.ComplaintModule = ComplaintModule;
//# sourceMappingURL=complaint.module.js.map