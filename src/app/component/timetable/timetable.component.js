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
var router_1 = require("@angular/router");
var timetable_service_1 = require("../../providers/timetable.service");
var loaderstop_service_1 = require("../../providers/loaderstop.service");
var TimetableComponent = /** @class */ (function () {
    function TimetableComponent(ls, ps, router) {
        this.ls = ls;
        this.ps = ps;
        this.router = router;
        this.selectedStandard = 4;
        this.days = [];
        this.daysdata = [];
        this.selectedSubject = 1;
        this.showsubjectlist = true;
        this.showsubjectname = false;
        this.serialNo = ['Assembly', 'First', 'Second', 'Third', 'Snack', 'Fourth', 'Fifth', 'Sixth', 'Lunch', 'Seventh', 'Eighth', 'Ninth'];
        this.loader = false;
        this.ls.setLoader(false);
    }
    TimetableComponent.prototype.ngOnInit = function () {
        this.getStandards();
        this.getTimeTable(this.selectedStandard);
    };
    TimetableComponent.prototype.ngOnDestroy = function () {
        this.ls.setLoader(true);
    };
    TimetableComponent.prototype.getTimeTable = function (selectedstandard) {
        var _this = this;
        console.log(this.selectedStandard);
        this.days = [];
        this.daysdata = [];
        this.loader = true;
        this.ps.gettimeTable(selectedstandard).subscribe(function (res) {
            if (res.status == 204) {
                _this.days = [];
                _this.daysdata = [];
                _this.timetable = [];
            }
            else {
                _this.timetable = res;
                Object.keys(res).forEach(function (key) {
                    _this.daysdata.push(res[key]);
                    _this.days.push(key); //key
                });
            }
            _this.loader = false;
        }, function (err) {
            _this.router.navigate(['/error']);
        });
    };
    TimetableComponent.prototype.getModal = function (selectedstandard, x, i) {
        if (x.subjectName != null) {
            this.showsubjectlist = false;
            this.showsubjectname = true;
        }
        else {
            this.showsubjectname = false;
            this.showsubjectlist = true;
        }
        this.subjectName = x.subjectName;
        this.starttime = x.startTime;
        this.endtime = x.endTime;
        this.timetableid = x.id;
        this.day = this.days[i];
        $('#editSubject').modal('show');
        this.getSubject(selectedstandard);
    };
    TimetableComponent.prototype.showlist = function () {
        this.showsubjectlist = true;
    };
    TimetableComponent.prototype.getSubject = function (selectedstandard) {
        var _this = this;
        this.ps.getSubject(selectedstandard).subscribe(function (res) {
            _this.subjects = res;
        }, function (err) {
            _this.router.navigate(['/error']);
        });
    };
    TimetableComponent.prototype.getValue = function (i) {
        if (i == 0) {
            return "Assembly";
        }
        else if (i == 4) {
            return "Snack";
        }
        else
            return "Lunch";
    };
    TimetableComponent.prototype.onSubmit = function () {
        var _this = this;
        this.ps.onSubmit(this.timetableid, this.selectedSubject).subscribe(function (res) {
            _this.refreshTimeTable();
        }, function (err) {
            _this.router.navigate(['/error']);
        });
    };
    TimetableComponent.prototype.refreshTimeTable = function () {
        var s;
        for (var _i = 0, _a = this.subjects; _i < _a.length; _i++) {
            var x = _a[_i];
            if (x.id == this.selectedSubject) {
                s = x.name;
                break;
            }
        }
        for (var _b = 0, _c = this.daysdata; _b < _c.length; _b++) {
            var x = _c[_b];
            for (var _d = 0, x_1 = x; _d < x_1.length; _d++) {
                var x1 = x_1[_d];
                if (x1.id == this.timetableid) {
                    x1.subjectName = s;
                    break;
                }
            }
        }
    };
    TimetableComponent.prototype.getStandards = function () {
        var _this = this;
        this.standardLoader = true;
        this.ps.getStandards().subscribe(function (res) {
            _this.standardLoader = false;
            _this.standards = res;
        }, function (err) {
            _this.router.navigate(['/error']);
        });
    };
    TimetableComponent = __decorate([
        core_1.Component({
            selector: "time-table",
            templateUrl: "./timetable.component.html",
            styleUrls: ["./timetable.component.css"]
        }),
        __metadata("design:paramtypes", [loaderstop_service_1.LoaderStop,
            timetable_service_1.TimeTableService,
            router_1.Router])
    ], TimetableComponent);
    return TimetableComponent;
}());
exports.TimetableComponent = TimetableComponent;
//# sourceMappingURL=timetable.component.js.map