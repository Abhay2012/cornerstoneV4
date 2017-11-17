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
var circular_service_1 = require("../../providers/circular.service");
var router_1 = require("@angular/router");
var loaderstop_service_1 = require("../../providers/loaderstop.service");
var CircularComponent = /** @class */ (function () {
    function CircularComponent(circularService, router, ls) {
        this.circularService = circularService;
        this.router = router;
        this.ls = ls;
        this.title = 'Circular';
        this.icon = "ios-paper-outline";
        this.currentPage = 1;
        this.EmptyCirculars = true;
        this.loader = false;
        this.noMore = true;
        this.imgindex = 0;
        this.ls.setLoader(false);
    }
    CircularComponent.prototype.ngOnInit = function () {
        this.fileUrl = localStorage.getItem("fileUrl") + "/";
        this.getCirculars();
    };
    CircularComponent.prototype.ngOnDestroy = function () {
        this.ls.setLoader(true);
    };
    CircularComponent.prototype.getCirculars = function () {
        var _this = this;
        this.loader = true;
        this.circularService.GetCirculars(this.currentPage).subscribe(function (res) {
            _this.onSuccess(res);
            console.log(res);
        }, function (err) {
            _this.onError(err);
        });
    };
    CircularComponent.prototype.onSuccess = function (data) {
        this.loader = false;
        if (data.status === 204) {
            this.circulars = [];
            this.EmptyCirculars = true;
            return;
        }
        else {
            if (this.currentPage == 1)
                this.circulars = data;
            else
                this.circulars = this.circulars.concat(data);
            if (data.length < 12)
                this.noMore = true;
            else
                this.noMore = false;
            this.EmptyCirculars = false;
        }
    };
    CircularComponent.prototype.onError = function (err) {
        this.loader = false;
        this.router.navigate(['/error']);
    };
    CircularComponent.prototype.previousCircular = function () {
        delete this.circulars;
        this.currentPage -= 1;
        this.getCirculars();
    };
    CircularComponent.prototype.swipe = function (a) {
        console.log(a);
        this.imgindex += a;
    };
    CircularComponent.prototype.swipebydots = function (a) {
        console.log(a);
        this.imgindex = a;
    };
    CircularComponent.prototype.nextCircular = function () {
        // delete this.circulars;
        this.currentPage += 1;
        this.getCirculars();
    };
    CircularComponent.prototype.try = function () {
        console.log("working");
    };
    // public onCircularSelected(circular) {
    //   this.circularService.GetparticularCircular(circular.id).subscribe((res) => {
    //   }, (err) => {
    //   })
    // }
    CircularComponent.prototype.seletToExpand = function (circular) {
        this.imgindex = 0;
        console.log(circular);
        this.selectedCircular = circular;
    };
    CircularComponent = __decorate([
        core_1.Component({
            selector: 'circular',
            templateUrl: './circular.component.html',
            styleUrls: ['./circular.component.css']
        }),
        __metadata("design:paramtypes", [circular_service_1.CircularService,
            router_1.Router, loaderstop_service_1.LoaderStop])
    ], CircularComponent);
    return CircularComponent;
}());
exports.CircularComponent = CircularComponent;
//# sourceMappingURL=circular.component.js.map