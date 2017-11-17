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
var forms_1 = require("@angular/forms");
var admin_service_1 = require("../../providers/admin.service");
var homework_service_1 = require("../../providers/homework.service");
var formValidation_service_1 = require("../../providers/formValidation.service");
var auth_service_1 = require("../../providers/auth.service");
var router_1 = require("@angular/router");
var common_1 = require("@angular/common");
var loaderstop_service_1 = require("../../providers/loaderstop.service");
var AddEmployeeComponent = /** @class */ (function () {
    function AddEmployeeComponent(as, au, hs, fb, ls, router, _location) {
        this.as = as;
        this.au = au;
        this.hs = hs;
        this.fb = fb;
        this.ls = ls;
        this.router = router;
        this._location = _location;
        this.standards = [];
        this.subjects = [[]];
        this.loader = false;
        this.profilePic = 'parent%2f39945169084408330481.jpg?alt=media';
        this.addEmployeeForm = this.fb.group({});
        this.fileUrl = localStorage.getItem('fileUrl');
    }
    AddEmployeeComponent.prototype.ngOnInit = function () {
        this.initForm();
        this.uploadPicForm = new forms_1.FormGroup({
            imgFile: new forms_1.FormControl(''),
        });
        // this.getStandards();
    };
    AddEmployeeComponent.prototype.ngOnDestroy = function () {
        this.ls.setLoader(true);
    };
    AddEmployeeComponent.prototype.initForm = function () {
        this.profilePic = 'parent%2f39945169084408330481.jpg?alt=media';
        this.addEmployeeForm = this.fb.group({
            "name": ['', [forms_1.Validators.required]],
            "username": ['', [forms_1.Validators.required, forms_1.Validators.minLength(4), forms_1.Validators.maxLength(20), forms_1.Validators.pattern('[A-Za-z]{1}[A-Za-z0-9]{3,19}')]],
            "nickName": [''],
            "password": ['', [forms_1.Validators.required, forms_1.Validators.pattern('^(?=.*[0-9])[a-zA-Z0-9!@#$%^&*]{5,100}$')]],
            'email': ['', [formValidation_service_1.ValidationService.emailValidator]],
            'contactNo': ['', [forms_1.Validators.pattern('[2-9]{2}[0-9]{8}$')]],
        });
        // this.profilePic = null;
    };
    AddEmployeeComponent.prototype.submitDetails = function () {
        var _this = this;
        this.uploadPicForm.controls['imgFile'].reset();
        // $('#myModal').modal('show');
        this.as.addEmployee(this.addEmployeeForm.value).subscribe(function (res) {
            _this.newEmpId = res.id;
            $('#myModal').modal('show');
        }, function (err) {
            if (err == "409 - Bad Request")
                $('#errorModal').modal('show');
            else {
                _this.router.navigate(['/error']);
            }
        });
    };
    AddEmployeeComponent.prototype.getFile = function (event) {
        var blob = event.srcElement.files[0];
        if (blob)
            if (blob.type == "image/png" || blob.type == "image/jpeg" || blob.type == "image/jpg") {
                this.imgFile = event.srcElement.files[0];
            }
            else {
                this.uploadPicForm.controls['file'].reset();
                $('#errorModal').modal('show');
            }
    };
    AddEmployeeComponent.prototype.changePicture = function () {
        var _this = this;
        this.loader = true;
        var formData = new FormData();
        formData.append('file', this.imgFile);
        this.as.uploadImage(formData, this.newEmpId).subscribe(function (res) {
            _this.profilePic = res.fileTimestamp;
            $('#myModal').modal('show');
            _this.loader = false;
        }, function (err) {
            _this.loader = false;
            _this.router.navigate(['/error']);
        });
    };
    AddEmployeeComponent = __decorate([
        core_1.Component({
            selector: 'add-employee',
            templateUrl: './addEmployee.component.html',
            styleUrls: ['./addEmployee.component.css']
        }),
        __metadata("design:paramtypes", [admin_service_1.AdminService,
            auth_service_1.AuthService,
            homework_service_1.HomeworkService,
            forms_1.FormBuilder,
            loaderstop_service_1.LoaderStop,
            router_1.Router,
            common_1.Location])
    ], AddEmployeeComponent);
    return AddEmployeeComponent;
}());
exports.AddEmployeeComponent = AddEmployeeComponent;
// getStandards() {
//   this.as.getStandards().subscribe(res => {
//     this.standards = res;
//   },
//     err => {
//     })
// }
// getSubjects(id: any, index: any) {
//   this.hs.getSubjects(id).subscribe(res => {
//     this.subjects[index] = res;
//   },
//     err => {
//     })
// }
// addStandard(e: any) {
//   const control = <FormArray>e.controls['teacherStandards'];
//   control.push(this.inItStandard());
// }
// removeStandard(form: any, index: any) {
//   const control = <FormArray>form.controls['teacherStandards'];
//   control.removeAt(index);
// }
// inItStandard() {
//   return this.fb.group({
//     "standardId": ['', Validators.required],
//     "subjectId": ['', Validators.required],
//   });
// } 
//# sourceMappingURL=addEmployee.component.js.map