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
var timetable_component_1 = require("./timetable.component");
var forms_1 = require("@angular/forms");
var common_1 = require("@angular/common");
var timetable_service_1 = require("../../providers/timetable.service");
var shared_module_1 = require("../../shared.module");
var TimeTable = /** @class */ (function () {
    function TimeTable() {
    }
    TimeTable = __decorate([
        core_1.NgModule({
            imports: [shared_module_1.SharedModule, common_1.CommonModule, forms_1.FormsModule, router_1.RouterModule.forChild([
                    {
                        path: '',
                        component: timetable_component_1.TimetableComponent
                    }
                ])],
            declarations: [timetable_component_1.TimetableComponent],
            providers: [timetable_service_1.TimeTableService]
        })
    ], TimeTable);
    return TimeTable;
}());
exports.TimeTable = TimeTable;
//# sourceMappingURL=timetable.module.js.map