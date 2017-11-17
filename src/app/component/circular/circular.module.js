"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var circular_component_1 = require("./circular.component");
var router_1 = require("@angular/router");
var shared_module_1 = require("../../shared.module");
var add_1 = require("./add/add");
var circular_service_1 = require("../../providers/circular.service");
var CircularModule = /** @class */ (function () {
    function CircularModule() {
    }
    CircularModule = __decorate([
        core_1.NgModule({
            imports: [shared_module_1.SharedModule, router_1.RouterModule.forChild([
                    {
                        path: '',
                        component: circular_component_1.CircularComponent
                    },
                    {
                        path: 'add-circular',
                        component: add_1.AddCircular
                    }
                ])],
            declarations: [circular_component_1.CircularComponent, add_1.AddCircular],
            providers: [circular_service_1.CircularService]
        })
    ], CircularModule);
    return CircularModule;
}());
exports.CircularModule = CircularModule;
//# sourceMappingURL=circular.module.js.map