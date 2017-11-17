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
var ExistingStudentComponent = /** @class */ (function () {
    // public showStudentDetails:boolean=false;
    function ExistingStudentComponent(_location, as, fb, router, ls, actRoute) {
        var _this = this;
        this._location = _location;
        this.as = as;
        this.fb = fb;
        this.router = router;
        this.ls = ls;
        this.actRoute = actRoute;
        this.loader = false;
        this.standardLoader = false;
        this.studentLoader = false;
        this.students = [];
        this.edit1 = false;
        this.edit2 = false;
        this.edit3 = false;
        this.studentsCOPY = [];
        this.showStudent = false;
        this.showSearch = false;
        this.showTable = false;
        this.filter = 1;
        this.showSibling = true;
        this.showParent = true;
        this.showStudentOnly = false;
        this.noStudents = false;
        this.standardId = "";
        this.selected = false;
        this.contactControl = false;
        this.actRoute.params.subscribe(function (param) {
            if (param['standardId'])
                _this.standardId = param['standardId'];
            if (param['studentId'])
                _this.getStudentDetails(param['studentId']);
        });
        this.fileUrl = localStorage.getItem('fileUrl');
        this.ls.setLoader(false);
        this.getStandards();
        // this.initNewStudentForm();
        // this.getStudents();
        // this.initEditParentForm();
        // this.initAddSiblingForm();
        this.uploadPicForm = new forms_1.FormGroup({
            file: new forms_1.FormControl(''),
        });
    }
    ExistingStudentComponent.prototype.getStandards = function () {
        var _this = this;
        this.standardLoader = true;
        this.as.getStandards().subscribe(function (res) {
            _this.standards = res;
            console.log(res);
            _this.standardLoader = false;
        }, function (err) {
            _this.errorPage();
        });
    };
    ExistingStudentComponent.prototype.onSelectStandard = function (e) {
        this.selectedStandardId = e;
        this.showSearch = true;
        this.getStudents();
        this.showStudent = true;
    };
    ExistingStudentComponent.prototype.ngOnDestroy = function () {
        this.ls.setLoader(true);
    };
    ExistingStudentComponent.prototype.getStudents = function () {
        var _this = this;
        this.studentLoader = true;
        this.as.getStudents(this.selectedStandardId).subscribe(function (res) {
            if (res.status == 204) {
                _this.noStudents = true;
            }
            _this.noStudents = false;
            _this.totalStudents = res.length;
            _this.students = res;
            _this.studentsCOPY = _this.students;
            _this.studentLoader = false;
        }, function (err) {
            // this.loader = false;
            _this.errorPage();
        });
    };
    ExistingStudentComponent.prototype.searchStudents = function (ev) {
        this.selected = true;
        var val = ev.target.value;
        if (val && val.trim() != '') {
            this.emptySearchResult = false;
            this.students = this.studentsCOPY.filter(function (item) {
                return (item.name.toLowerCase().indexOf(val.toLowerCase()) > -1);
            });
            if (this.students.length == 0) {
                this.emptySearchResult = true;
            }
        }
        else {
            this.selected = false;
        }
    };
    ExistingStudentComponent.prototype.getStudentDetails = function (ev) {
        var _this = this;
        this.showTable = false;
        this.showSearch = true;
        this.loader = true;
        this.selected = false;
        this.initAddParentForm();
        this.initAddSiblingForm();
        this.as.getStudentDetails(ev).subscribe(function (res) {
            _this.selectedStudent = res;
            _this.parentLimit = 3 - _this.selectedStudent.parents.length;
            _this.siblingLimit = 10 - _this.selectedStudent.siblings.length;
            _this.loader = false;
        }, function (err) {
            _this.errorPage();
        });
    };
    ExistingStudentComponent.prototype.getStudentsByStd = function () {
        var _this = this;
        // this.showStudentDetails=false;
        this.loader = true;
        this.showTable = true;
        this.showSearch = false;
        this.as.getAllStudents(this.selectedStandardId).subscribe(function (res) {
            _this.loader = false;
            _this.studentsInfo = res;
        }, function (err) {
            _this.errorPage();
        });
    };
    ExistingStudentComponent.prototype.initAddSiblingForm = function () {
        // this.getSiblings();
        this.addSiblingForm = this.fb.group({
            students: this.fb.array([
                this.inItSibling(),
            ])
        });
    };
    ExistingStudentComponent.prototype.inItSibling = function () {
        return this.fb.group({
            "name": ['', [forms_1.Validators.required]],
            "standardId": ['', [forms_1.Validators.required]]
        });
    };
    ExistingStudentComponent.prototype.addSibling = function (e) {
        var control = e.controls['students'];
        control.push(this.inItSibling());
    };
    ExistingStudentComponent.prototype.removeSibling = function (form, index) {
        var control = form.controls['students'];
        control.removeAt(index);
        if (control.length == 0) {
            this.addForm = null;
        }
    };
    ExistingStudentComponent.prototype.submitSibling = function () {
        var _this = this;
        this.loader = true;
        this.as.addSibling(this.selectedStudent.id, this.addSiblingForm.value.students).subscribe(function (res) {
            $('#updateModal').modal('show');
            _this.getStudentDetails(_this.selectedStudent.id);
            _this.initAddSiblingForm();
            _this.loader = false;
        }, function (err) {
            // this.loader = false;
            _this.errorPage();
        });
    };
    ExistingStudentComponent.prototype.initAddParentForm = function () {
        this.addParentForm = new forms_1.FormGroup({
            name: new forms_1.FormControl('', [forms_1.Validators.required]),
            nickName: new forms_1.FormControl(''),
            contactNo: new forms_1.FormControl('', [forms_1.Validators.required, forms_1.Validators.maxLength(12), forms_1.Validators.minLength(9)]),
            email: new forms_1.FormControl('', [formValidation_service_1.ValidationService.emailValidator]),
        });
    };
    ExistingStudentComponent.prototype.submitParentForm = function () {
        var _this = this;
        var studentIds = [this.selectedStudent.id];
        // studentIds.push(this.selectedStudent.id);
        this.selectedStudent.siblings.forEach(function (element) {
            studentIds.push(element.id);
        });
        this.addParentForm.addControl("studentIds", new forms_1.FormControl(studentIds));
        this.loader = true;
        this.as.addParent(this.selectedStudent.id, this.addParentForm.value).subscribe(function (res) {
            _this.getStudentDetails(_this.selectedStudent.id);
            $('#updateModal').modal('show');
            _this.initAddParentForm();
            _this.loader = false;
        }, function (err) {
            _this.loader = false;
            if (err === "400 - Bad Request") {
                _this.initAddParentForm();
                $('#errModal').modal('show');
            }
            else {
                _this.errorPage();
            }
        });
    };
    //Update Information
    ExistingStudentComponent.prototype.initEditStudentForm = function () {
        this.editStudentForm = new forms_1.FormGroup({
            name: new forms_1.FormControl(this.selectedSibling.name, [forms_1.Validators.required]),
            standardId: new forms_1.FormControl(this.selectedSibling.standardId, [forms_1.Validators.required]),
        });
    };
    ExistingStudentComponent.prototype.submitEditStudentForm = function () {
        var _this = this;
        this.loader = true;
        this.as.updateStudent(this.selectedSibling.id, this.editStudentForm.value).subscribe(function (res) {
            $('#editSiblingModal').modal('hide');
            _this.getStudentDetails(_this.selectedStudent.id);
            $('#updateModal').modal('show');
            _this.loader = false;
        }, function (err) {
            _this.errorPage();
        });
    };
    ExistingStudentComponent.prototype.submitEditParentForm = function () {
        var _this = this;
        this.loader = true;
        this.as.updateParent(this.selectedParent.id, this.editParentForm.value).subscribe(function (res) {
            _this.loader = false;
            $('#editParentModal').modal('hide');
            _this.getStudentDetails(_this.selectedStudent.id);
            $('#updateModal').modal('show');
            _this.editParentForm.reset;
        }, function (err) {
            _this.loader = false;
            _this.errorPage();
        });
    };
    ExistingStudentComponent.prototype.uploadParentImage = function () {
        var _this = this;
        this.loader = true;
        var formData = new FormData();
        formData.append('file', this.imgFile);
        this.as.uploadParentImage(this.selectedImageUpload.id, formData).subscribe(function (res) {
            _this.getStudentDetails(_this.selectedStudent.id);
            $('#updateModal').modal('show');
            _this.uploadPicForm.reset();
            _this.loader = false;
        }, function (err) {
            _this.errorPage();
        });
        this.selectedImageUpload = null;
    };
    ExistingStudentComponent.prototype.uploadStudentImage = function () {
        var _this = this;
        this.loader = true;
        var formData = new FormData();
        formData.append('file', this.imgFile);
        this.as.uploadStudentImage(this.selectedImageUpload.id, formData).subscribe(function (res) {
            _this.getStudentDetails(_this.selectedStudent.id);
            $('#updateModal').modal('show');
            _this.uploadPicForm.reset();
            _this.loader = false;
        }, function (err) {
            _this.errorPage();
        });
        this.selectedImageUpload = null;
    };
    ExistingStudentComponent.prototype.getFile = function (event) {
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
    ExistingStudentComponent.prototype.errorPage = function () {
        this.loader = false;
        this.router.navigate(['/error']);
    };
    ExistingStudentComponent.prototype.filterDetails = function (e) {
        if (e == 1) {
            this.showParent = true;
            this.showSibling = true;
            this.showStudentOnly = false;
        }
        else if (e == 2) {
            this.showParent = false;
            this.showSibling = true;
            this.showStudentOnly = false;
        }
        else if (e == 3) {
            this.showParent = true;
            this.showSibling = false;
            this.showStudentOnly = false;
        }
        else if (e == 4) {
            this.showParent = false;
            this.showSibling = false;
            this.showStudentOnly = true;
        }
    };
    // public order:any;
    //   public orderDetails(e:any){    
    //     if(e==1){
    //       this.studentsInfo.reverse;
    //     }
    //   }
    ExistingStudentComponent.prototype.initEditParentForm = function () {
        if (this.selectedParent)
            this.editParentForm = new forms_1.FormGroup({
                name: new forms_1.FormControl(this.selectedParent.name),
                nickName: new forms_1.FormControl(this.selectedParent.nickName),
                email: new forms_1.FormControl(this.selectedParent.email, [formValidation_service_1.ValidationService.emailValidator]),
            });
    };
    ExistingStudentComponent.prototype.onContact = function (e) {
        if (this.selectedParent.contactNo != e) {
            this.contactControl = true;
            this.editParentForm.addControl("contactNo", new forms_1.FormControl(this.selectedParent.contactNo, [forms_1.Validators.maxLength(12), forms_1.Validators.minLength(9)]));
            this.editParentForm.controls['contactNo'].patchValue(e);
            // if(this.editParentForm.controls.contactNo.dirty || !this.editParentForm.dirty || this.editParentForm.invalid){
            //   $('#submitBtn').addClass('disabled');
            // }
            // else{
            //   $('#submitBtn').removeClass('disabled');
            // }
        }
        else {
            this.contactControl = false;
            this.editParentForm.removeControl('contactNo');
        }
    };
    ExistingStudentComponent = __decorate([
        core_1.Component({
            selector: 'existing-student',
            templateUrl: './existingStudent.component.html',
            styleUrls: ['./existingStudent.component.css'],
        }),
        __metadata("design:paramtypes", [common_1.Location,
            admin_service_1.AdminService,
            forms_1.FormBuilder,
            router_1.Router,
            loaderstop_service_1.LoaderStop,
            router_1.ActivatedRoute])
    ], ExistingStudentComponent);
    return ExistingStudentComponent;
}());
exports.ExistingStudentComponent = ExistingStudentComponent;
//# sourceMappingURL=existingStudent.component.js.map