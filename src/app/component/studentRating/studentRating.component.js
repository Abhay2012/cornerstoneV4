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
var studentRating_service_1 = require("../../providers/studentRating.service");
var forms_1 = require("@angular/forms");
var router_1 = require("@angular/router");
var loaderstop_service_1 = require("../../providers/loaderstop.service");
var StudentRatingComponent = /** @class */ (function () {
    function StudentRatingComponent(srs, fb, ls, router) {
        this.srs = srs;
        this.fb = fb;
        this.ls = ls;
        this.router = router;
        this.emptyStudents = false;
        this.selected = false;
        this.emptySearchResult = false;
        this.loader = false;
        this.loader1 = false;
        this.ratingForm = this.fb.group({});
        this.ls.setLoader(false);
    }
    StudentRatingComponent.prototype.ngOnInit = function () {
        this.getStudents();
    };
    StudentRatingComponent.prototype.ngOnDestroy = function () {
        this.ls.setLoader(true);
    };
    StudentRatingComponent.prototype.getStudents = function () {
        var _this = this;
        this.loader = true;
        this.srs.getStudents().subscribe(function (res) {
            if (res.status === 204) {
                _this.loader = false;
                _this.students = [];
                _this.emptyStudents = true;
                // $('#noDataModal').modal('show');
            }
            _this.loader = false;
            _this.students = res;
            _this.studentsCOPY = _this.students;
        }, function (err) {
            _this.router.navigate(['/error']);
        });
    };
    StudentRatingComponent.prototype.selectStudent = function (stu) {
        this.selected = false;
        this.selectedStudent = stu;
        this.selectedStudentCopy = stu;
        this.getStudentRating(stu.id);
    };
    StudentRatingComponent.prototype.getStudentRating = function (id) {
        var _this = this;
        this.loader1 = true;
        this.srs.getStudentRating(id).subscribe(function (res) {
            _this.respStu = res;
            _this.respStuCopy = _this.respStu;
            _this.initForm();
            _this.loader1 = false;
        }, function (err) {
            _this.loader1 = false;
            _this.router.navigate(['/error']);
        });
    };
    StudentRatingComponent.prototype.updaterating = function (e, x, x1) {
        for (var i = 0; i < 5; i++) {
            document.getElementById("star" + x1 + "a" + i + "1").checked = false;
        }
        for (var i = 0; i <= x; i++) {
            document.getElementById("star" + x1 + "a" + i + "1").checked = true;
        }
    };
    StudentRatingComponent.prototype.initForm = function () {
        this.ratingForm = this.fb.group({
            'studentId': [this.selectedStudent.id],
            'responsibilitiesWithRating': this.fb.array([]),
        });
        this.addResp();
    };
    StudentRatingComponent.prototype.addResp = function () {
        var _this = this;
        this.respStu.profile.forEach(function (item, index) {
            var control = _this.ratingForm.controls['responsibilitiesWithRating'];
            control.push(_this.initStudentRating());
        });
    };
    StudentRatingComponent.prototype.initStudentRating = function () {
        return this.fb.group({
            'ratingId': ['', [forms_1.Validators.required]],
            'responsibilityId': [''],
            'profileId': [''],
        });
    };
    StudentRatingComponent.prototype.searchStudents = function (ev) {
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
    StudentRatingComponent.prototype.submitRating = function () {
        var _this = this;
        this.srs.saveStudentRating(this.ratingForm.value, this.respStu.isEmpty).subscribe(function (res) {
            $('#submitModal').modal('show');
            _this.selectedStudent = null;
        }, function (err) {
            _this.selectedStudent = null;
            _this.router.navigate(['/error']);
        });
    };
    StudentRatingComponent.prototype.resetForm = function () {
        var _this = this;
        if (this.respStu.isEmpty) {
            this.initForm();
        }
        else {
            this.ratingForm.value.responsibilitiesWithRating.forEach(function (item, index) {
                _this.ratingForm.controls['responsibilitiesWithRating'].at(index).patchValue({ "ratingId": _this.respStuCopy.profile[index].ratingId });
            });
        }
        // this.ratingForm.controls.responsibilitiesWithRating.markAsPristine()
    };
    StudentRatingComponent = __decorate([
        core_1.Component({
            selector: 'student-rating',
            templateUrl: './studentRating.component.html',
            styleUrls: ['./studentRating.component.css']
        }),
        __metadata("design:paramtypes", [studentRating_service_1.StudentRatingService,
            forms_1.FormBuilder, loaderstop_service_1.LoaderStop, router_1.Router])
    ], StudentRatingComponent);
    return StudentRatingComponent;
}());
exports.StudentRatingComponent = StudentRatingComponent;
//# sourceMappingURL=studentRating.component.js.map