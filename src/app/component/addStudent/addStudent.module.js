"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var addStudent_component_1 = require("./addStudent.component");
var router_1 = require("@angular/router");
var shared_module_1 = require("../../shared.module");
var existingStudent_component_1 = require("./existingStudent/existingStudent.component");
var newStudent_component_1 = require("./newStudent/newStudent.component");
var AddStudentModule = /** @class */ (function () {
    function AddStudentModule() {
    }
    AddStudentModule = __decorate([
        core_1.NgModule({
            imports: [shared_module_1.SharedModule, router_1.RouterModule.forChild([
                    { path: '', redirectTo: 'new-student', pathMatch: 'full' },
                    {
                        path: '',
                        component: addStudent_component_1.AddStudentComponent,
                        children: [
                            {
                                path: 'existing-student',
                                component: existingStudent_component_1.ExistingStudentComponent
                            },
                            {
                                path: 'existing-student/:standardId/:studentId',
                                component: existingStudent_component_1.ExistingStudentComponent
                            },
                            {
                                path: 'new-student',
                                component: newStudent_component_1.NewStudentComponent
                            }
                        ]
                    }
                ])],
            declarations: [addStudent_component_1.AddStudentComponent, existingStudent_component_1.ExistingStudentComponent, newStudent_component_1.NewStudentComponent]
        })
    ], AddStudentModule);
    return AddStudentModule;
}());
exports.AddStudentModule = AddStudentModule;
//# sourceMappingURL=addStudent.module.js.map