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
var appreciation_service_1 = require("../../../providers/appreciation.service");
var common_service_1 = require("../../../providers/common.service");
var common_1 = require("@angular/common");
var router_1 = require("@angular/router");
var loaderstop_service_1 = require("../../../providers/loaderstop.service");
var AddAppreciation = /** @class */ (function () {
    function AddAppreciation(appreciationService, commonService, router, ls, _location) {
        this.appreciationService = appreciationService;
        this.commonService = commonService;
        this.router = router;
        this.ls = ls;
        this._location = _location;
        this.title = "New Appreciation";
        this.submitProgress = false;
        this.isEmpty = true;
        this.standards = [];
        this.standardId = '';
        this.students = [];
        this.studentscopy = [];
        this.subjects = [];
        this.length = 165;
        this.dropdown = false;
        this.emptyStudents = true;
        this.emptyStandards = true;
        this.loader = false;
        this.studentLoader = false;
        this.getStandards();
    }
    AddAppreciation.prototype.ngOnInit = function () {
        this.initForm();
    };
    AddAppreciation.prototype.ngOnDestroy = function () {
        this.ls.setLoader(true);
    };
    AddAppreciation.prototype.trychange = function (ev) {
        this.students = this.studentscopy;
        var val = ev.target.value;
        this.isEmpty = true;
        if (val && val.trim() != '') {
            this.isEmpty = false;
            this.students = this.studentscopy.filter(function (item) {
                console.log(item);
                return (item.name.toLowerCase().indexOf(val.toLowerCase()) > -1);
            });
        }
        if (this.students.length == 0 || this.students.length == 1) {
            this.length = 42;
        }
        else if (this.students.length == 2) {
            this.length = 85;
        }
        else if (this.students.length == 3) {
            this.length = 126;
        }
        else {
            this.length = 165;
        }
    };
    AddAppreciation.prototype.fulllist = function () {
        // console.log("wrkn");
        if (this.dropdown == true) {
            this.isEmpty = false;
        }
        else {
            this.isEmpty = true;
        }
        this.dropdown = !this.dropdown;
    };
    AddAppreciation.prototype.initForm = function () {
        this.appreciation = new forms_1.FormGroup({
            description: new forms_1.FormControl('', [forms_1.Validators.required, forms_1.Validators.maxLength(2500)]),
            studentId: new forms_1.FormControl('', [forms_1.Validators.required]),
            title: new forms_1.FormControl('', [forms_1.Validators.required, forms_1.Validators.maxLength(50)]),
        });
    };
    AddAppreciation.prototype.submitAppreciation = function () {
        var _this = this;
        this.submitProgress = true;
        this.appreciationService.postAppreciation(this.appreciation.value).subscribe(function (res) {
            _this.submitProgress = false;
            _this.initForm();
            $('#appreciationModal').modal('show');
        }, function (err) {
            _this.router.navigate(['/error']);
        });
    };
    AddAppreciation.prototype.getStandards = function () {
        var _this = this;
        // this.nl.showLoader();
        this.loader = true;
        this.appreciationService.getStandards().subscribe(function (res) {
            if (res.status === 204) {
                _this.standards = [];
                _this.emptyStandards = true;
                _this.loader = false;
                return;
            }
            _this.standards = res;
            console.log(_this.standards);
            _this.emptyStandards = false;
            _this.loader = false;
        }, function (err) {
            _this.router.navigate(['/error']);
        });
    };
    AddAppreciation.prototype.searching = function (env) {
        this.searchQuery = env.target.value;
        console.log(this.searchQuery);
    };
    AddAppreciation.prototype.selectstudent = function (s) {
        console.log(s.id);
        document.getElementById("try").value = s.name;
        this.appreciation.controls["studentId"].patchValue(s.id);
        console.log(this.appreciation.controls["studentId"]);
        this.isEmpty = true;
    };
    AddAppreciation.prototype.getStudents = function (standard) {
        var _this = this;
        this.studentLoader = true;
        this.appreciation.controls["studentId"].reset();
        this.appreciationService.getStudents(standard).subscribe(function (res) {
            if (res.status === 204) {
                _this.students = [];
                _this.emptyStudents = true;
                _this.studentLoader = false;
                return;
            }
            _this.studentLoader = false;
            _this.emptyStudents = false;
            _this.students = res;
            _this.studentscopy = res;
        }, function (err) {
            _this.router.navigate(['/error']);
        });
    };
    AddAppreciation = __decorate([
        core_1.Component({
            selector: 'add-appreciation',
            templateUrl: './add.html',
            styleUrls: ['./../appreciation.component.css']
        }),
        __metadata("design:paramtypes", [appreciation_service_1.AppreciationService,
            common_service_1.CommonService,
            router_1.Router,
            loaderstop_service_1.LoaderStop,
            common_1.Location])
    ], AddAppreciation);
    return AddAppreciation;
}());
exports.AddAppreciation = AddAppreciation;
//# sourceMappingURL=add.js.map