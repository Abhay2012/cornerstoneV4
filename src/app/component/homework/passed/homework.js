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
var PassedHomework = /** @class */ (function () {
    function PassedHomework(homeworkService, router, ls) {
        this.homeworkService = homeworkService;
        this.router = router;
        this.ls = ls;
        this.title = 'Homework';
        this.icon = "book";
        this.EmptyHomeworks = true;
        this.homeworks = [];
        this.currentPage = 1;
        this.loader = false;
        this.imgindex = 0;
        this.noMore = true;
    }
    PassedHomework.prototype.ngOnInit = function () {
        this.ls.setLoader(false);
        this.fileUrl = localStorage.getItem("fileUrl") + "/";
        this.getHomeworks();
    };
    PassedHomework.prototype.ngOnDestroy = function () {
        this.ls.setLoader(true);
    };
    PassedHomework.prototype.getHomeworks = function () {
        var _this = this;
        this.loader = true;
        this.homeworkService.getOldHomework(this.currentPage).subscribe(function (data) {
            _this.onSuccess(data);
        }, function (err) {
            _this.loader = false;
            _this.router.navigate(['/error']);
        });
    };
    // public previousHomework() {
    //   delete this.homeworks;
    //   this.currentPage -= 1;
    //   this.getHomeworks();
    // }
    PassedHomework.prototype.nextHomework = function () {
        // delete this.homeworks;
        this.currentPage += 1;
        this.getHomeworks();
    };
    //   ngAfterViewInit(){
    //         //loading on scroll
    //     $(window).scroll(function () { 
    //    if ($(window).scrollTop() >= $(document).height() - $(window).height() - 10) {
    //       alert('end of page');
    //       this.nextHomework();
    //    }
    // });
    //   }
    PassedHomework.prototype.doRefresh = function (refresher) {
        var _this = this;
        setTimeout(function () {
            _this.homeworkService.getOldHomework(1).subscribe(function (res) {
                _this.onSuccess(res);
                refresher.complete();
            }, function (err) {
                refresher.complete();
                _this.onError(err);
            });
        }, 500);
    };
    PassedHomework.prototype.onSuccess = function (res) {
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
    PassedHomework.prototype.onError = function (err) {
        this.loader = false;
        this.router.navigate(['/error']);
    };
    PassedHomework.prototype.doInfinite = function (infiniteScroll) {
        var _this = this;
        this.currentPage += 1;
        setTimeout(function () {
            _this.loadMoreData(infiniteScroll);
        }, 500);
    };
    PassedHomework.prototype.loadMoreData = function (infiniteScroll) {
        var _this = this;
        this.homeworkService.getOldHomework(this.currentPage).subscribe(function (res) {
            infiniteScroll.complete();
            _this.loadDataSuccess(res);
        }, function (err) {
            infiniteScroll.complete();
            _this.loadDataError(err);
        });
    };
    PassedHomework.prototype.loadDataSuccess = function (res) {
        if (res.status === 204) {
            this.currentPage -= 1;
            return;
        }
        var newHomework = res;
        this.homeworks = this.homeworks.concat(newHomework);
    };
    PassedHomework.prototype.loadDataError = function (err) {
        this.currentPage -= 1;
        this.loader = false;
        this.router.navigate(['/error']);
    };
    PassedHomework.prototype.swipe = function (a) {
        console.log(a);
        this.imgindex += a;
    };
    PassedHomework.prototype.swipebydots = function (a) {
        console.log(a);
        this.imgindex = a;
    };
    // public seletToExpand(a: any) {
    //   this.selectedHomework = a;
    // }
    PassedHomework.prototype.seletToExpand = function (a, i) {
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
    PassedHomework = __decorate([
        core_1.Component({
            selector: 'passed-homework',
            styleUrls: ['./../homework.component.css'],
            templateUrl: './homework.html'
        }),
        __metadata("design:paramtypes", [homework_service_1.HomeworkService,
            router_1.Router,
            loaderstop_service_1.LoaderStop])
    ], PassedHomework);
    return PassedHomework;
}());
exports.PassedHomework = PassedHomework;
//# sourceMappingURL=homework.js.map