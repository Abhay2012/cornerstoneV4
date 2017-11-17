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
var http_1 = require("@angular/http");
var Observable_1 = require("rxjs/Observable");
require("rxjs/add/operator/map");
require("rxjs/add/operator/catch");
require("rxjs/add/observable/throw");
var app_constant_1 = require("./app.constant");
var default_header_service_1 = require("./default.header.service");
var ChartService = /** @class */ (function () {
    function ChartService(con, http) {
        this.con = con;
        this.http = http;
        this.baseUrl = "";
        this.baseUrl = con.Server;
    }
    ChartService.prototype.getComplaintByStatus = function () {
        // console.log("sx");
        // console.log(this.con.Server);
        console.log(this.baseUrl);
        return this.http.get(this.con.Server + "/complaint/status")
            .map(this.extractData)
            .catch(this.handleError);
    };
    ChartService.prototype.getComplaintByCategoryAndStatus = function () {
        return this.http.get(this.con.Server + "/complaint/category-status")
            .map(this.extractData)
            .catch(this.handleError);
    };
    ChartService.prototype.getSuggestionByStatus = function () {
        return this.http.get(this.con.Server + "/suggestion/status")
            .map(this.extractData)
            .catch(this.handleError);
    };
    ChartService.prototype.extractData = function (res) {
        if (res.status === 204) {
            return res;
        }
        var body = res.json();
        return body || {};
    };
    ChartService.prototype.handleError = function (error) {
        var errMsg;
        if (error instanceof http_1.Response) {
            errMsg = error.status + " - " + (error.ok || 'Bad Request');
            if (error.status === 0) {
                errMsg = error.status + " - \"No Internet\"";
            }
        }
        else {
            errMsg = error.message ? error.message : error.toString();
        }
        return Observable_1.Observable.throw(errMsg);
    };
    ChartService = __decorate([
        core_1.Injectable(),
        __metadata("design:paramtypes", [app_constant_1.Configuration,
            default_header_service_1.CustomHttpService])
    ], ChartService);
    return ChartService;
}());
exports.ChartService = ChartService;
//# sourceMappingURL=chart.service.js.map