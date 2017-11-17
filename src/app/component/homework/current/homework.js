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
var homework_service_1 = require("../../../providers/homework.service");
var router_1 = require("@angular/router");
var loaderstop_service_1 = require("../../../providers/loaderstop.service");
var CurrentHomework = /** @class */ (function () {
    function CurrentHomework(homeworkService, ls, router) {
        this.homeworkService = homeworkService;
        this.ls = ls;
        this.router = router;
        this.title = "Homework";
        this.icon = "book";
        this.currentPage = 1;
        this.homeworks = [];
        this.loader = false;
        this.EmptyHomeworks = true;
        this.imgindex = 0;
        this.noMore = true;
        this.ls.setLoader(false);
    }
    CurrentHomework.prototype.ngOnInit = function () {
        this.fileUrl = localStorage.getItem("fileUrl") + "/";
        this.getHomeworks();
    };
    CurrentHomework.prototype.ngOnDestroy = function () {
        this.ls.setLoader(true);
    };
    CurrentHomework.prototype.getHomeworks = function () {
        var _this = this;
        // this.nl.showLoader();
        this.loader = true;
        this.homeworkService.getHomework(this.currentPage).subscribe(function (data) {
            _this.onSuccess(data);
        }, function (err) {
            _this.loader = false;
            _this.router.navigate(['/error']);
        });
    };
    CurrentHomework.prototype.onSuccess = function (res) {
        // this.nl.hideLoader();
        this.loader = false;
        if (res.status === 204) {
            this.EmptyHomeworks = true;
        }
        else {
            this.EmptyHomeworks = false;
            if (this.currentPage == 1)
                this.homeworks = res;
            else
                this.homeworks = this.homeworks.concat(res);
            if (res.length < 12)
                this.noMore = true;
            else
                this.noMore = false;
        }
    };
    CurrentHomework.prototype.onError = function (err) {
        this.loader = false;
        this.router.navigate(['/error']);
    };
    // public previousHomework() {
    //   delete this.homeworks;
    //   this.currentPage -= 1;
    //   this.getHomeworks();
    // }
    CurrentHomework.prototype.nextHomework = function () {
        // delete this.homeworks;
        this.currentPage += 1;
        this.getHomeworks();
    };
    CurrentHomework.prototype.swipe = function (a) {
        console.log(a);
        this.imgindex += a;
    };
    CurrentHomework.prototype.swipebydots = function (a) {
        console.log(a);
        this.imgindex = a;
    };
    CurrentHomework.prototype.seletToExpand = function (a, i) {
        this.selectedHomework = a;
        console.log("index :" + this.imgindex);
        this.imgindex = 0;
        console.log("index :" + this.imgindex);
        if (a.files) {
            this.dispurl = this.fileUrl + a.files[0].fileTimestamp;
        }
        console.log(this.dispurl);
        console.log(this.selectedHomework);
    };
    CurrentHomework = __decorate([
        core_1.Component({
            selector: 'current-homework',
            templateUrl: './homework.html',
            styleUrls: ['./../homework.component.css']
        }),
        __metadata("design:paramtypes", [homework_service_1.HomeworkService, loaderstop_service_1.LoaderStop,
            router_1.Router])
    ], CurrentHomework);
    return CurrentHomework;
}());
exports.CurrentHomework = CurrentHomework;
//# sourceMappingURL=homework.js.map