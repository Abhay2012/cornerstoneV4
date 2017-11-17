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
var Observable_1 = require("rxjs/Observable");
var http_1 = require("@angular/http");
require("rxjs/add/operator/map");
require("rxjs/add/operator/catch");
var app_constant_1 = require("./app.constant");
var default_header_service_1 = require("./default.header.service");
var FoodmenuService = /** @class */ (function () {
    function FoodmenuService(http, htttp, con) {
        this.http = http;
        this.htttp = htttp;
        this.con = con;
        this.serveUrl = "";
        this.serveUrl = this.con.Server;
        this.id = localStorage.getItem('id');
    }
    FoodmenuService.prototype.getMenu = function (month) {
        return this.http.get(this.serveUrl + '/food-menu/month/' + month)
            .map(this.extractData)
            .catch(this.handleError);
    };
    FoodmenuService.prototype.postItem = function (data) {
        console.log("i am in service ", data);
        return this.http.post(this.serveUrl + '/food-menu/food', data)
            .map(this.extractData)
            .catch(this.handleError);
    };
    FoodmenuService.prototype.getItem = function () {
        return this.http.get(this.serveUrl + '/food-menu/food')
            .map(this.extractData)
            .catch(this.handleError);
    };
    FoodmenuService.prototype.deleteItem = function (id) {
        return this.http.delete(this.serveUrl + '/food-menu/food/' + id)
            .map(this.extractData)
            .catch(this.handleError);
    };
    FoodmenuService.prototype.postMenu = function (data) {
        return this.http.post(this.serveUrl + '/food-menu', data)
            .map(this.extractData)
            .catch(this.handleError);
    };
    FoodmenuService.prototype.extractData = function (res) {
        if (res.status === 204) {
            return res;
        }
        var body = res.json();
        return body || {};
    };
    FoodmenuService.prototype.handleError = function (error) {
        var errMsg;
        if (error instanceof http_1.Response) {
            errMsg = error.status + " - " + (error.ok || '');
            if (error.status === 0) {
                errMsg = error.status + " - \"No Internet\"";
            }
        }
        else {
            errMsg = error.message ? error.message : error.toString();
        }
        return Observable_1.Observable.throw(errMsg);
    };
    FoodmenuService = __decorate([
        core_1.Injectable(),
        __metadata("design:paramtypes", [http_1.Http,
            default_header_service_1.CustomHttpService,
            app_constant_1.Configuration])
    ], FoodmenuService);
    return FoodmenuService;
}());
exports.FoodmenuService = FoodmenuService;
//# sourceMappingURL=foodmenu.service.js.map