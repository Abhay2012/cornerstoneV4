"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var common_1 = require("@angular/common");
var admin_service_1 = require("../../../providers/admin.service");
var forms_1 = require("@angular/forms");
var formValidation_service_1 = require("../../../providers/formValidation.service");
var router_1 = require("@angular/router");
var loaderstop_service_1 = require("../../../providers/loaderstop.service");
var NewStudentComponent = /** @class */ (function () {
    function NewStudentComponent(_location, as, fb, ls, router) {
        this._location = _location;
        this.as = as;
        this.fb = fb;
        this.ls = ls;
        this.router = router;
        this.loader = false;
        this.standardLoader = false;
        this.stuId = [];
        this.stanId = [];
        this.getStandards();
        this.initNewStudentForm();
    }
    //New Student Functions
    NewStudentComponent.prototype.getStandards = function () {
        var _this = this;
        this.standardLoader = true;
        this.as.getStandards().subscribe(function (res) {
            _this.standards = res;
            _this.standardLoader = false;
        }, function (err) {
            _this.errorPage();
        });
    };
    // public onParent(p:any,i:any){
    //   this.selectedParent.push(p);
    // }
    NewStudentComponent.prototype.initNewStudentForm = function () {
        this.newStudentForm = this.fb.group({
            name: ['', [forms_1.Validators.required]],
            standardId: ['', [forms_1.Validators.required]],
            parent: this.fb.array([
                this.inItParent(),
            ])
        });
    };
    NewStudentComponent.prototype.ngOnDestroy = function () {
        this.ls.setLoader(true);
    };
    NewStudentComponent.prototype.inItParent = function () {
        return this.fb.group({
            "name": ['', [forms_1.Validators.required]],
            "nickName": [''],
            "contactNo": ['', [forms_1.Validators.required, forms_1.Validators.maxLength(12), forms_1.Validators.minLength(9)]],
            "email": ['', [formValidation_service_1.ValidationService.emailValidator]],
        });
    };
    NewStudentComponent.prototype.addParent = function (e) {
        var control = e.controls['parent'];
        control.push(this.inItParent());
    };
    NewStudentComponent.prototype.removeParent = function (form, index) {
        var control = form.controls['parent'];
        control.removeAt(index);
    };
    NewStudentComponent.prototype.submitNewStudent = function () {
        var _this = this;
        this.as.addStudent(this.newStudentForm.value).subscribe(function (res) {
            _this.loader = true;
            $('#addModal').modal('show');
            // this.selectedStudent = null;
            _this.initNewStudentForm();
            _this.loader = false;
        }, function (err) {
            if (err.status == 400) {
                _this.initNewStudentForm();
                _this.messages = err.json();
                _this.mes = JSON.parse(_this.messages.message);
                for (var i = 0; i < _this.mes.length; i++) {
                    _this.stuId[i] = _this.mes[i].studentId;
                    _this.stanId[i] = _this.mes[i].standardId;
                }
                $('#errModal').modal('show');
            }
            else {
                _this.errorPage();
            }
        });
    };
    NewStudentComponent.prototype.errorPage = function () {
        this.loader = false;
        this.router.navigate(['/error']);
    };
    NewStudentComponent.prototype.navigateToExisting = function (standardid, studentid) {
        $('#errModal').modal('hide');
        this.router.navigate(["/add-student", "existing-student", standardid, studentid]);
    };
    NewStudentComponent = __decorate([
        core_1.Component({
            // selector: 'new-student',
            templateUrl: './newStudent.component.html',
            styleUrls: ['./newStudent.component.css'],
        }),
        __metadata("design:paramtypes", [common_1.Location,
            admin_service_1.AdminService,
            forms_1.FormBuilder,
            loaderstop_service_1.LoaderStop,
            router_1.Router])
    ], NewStudentComponent);
    return NewStudentComponent;
}());
exports.NewStudentComponent = NewStudentComponent;
//# sourceMappingURL=newStudent.component.js.map