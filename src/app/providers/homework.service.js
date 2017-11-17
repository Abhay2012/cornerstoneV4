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
require("rxjs/add/observable/throw");
var app_constant_1 = require("./app.constant");
var default_header_service_1 = require("./default.header.service");
var HomeworkService = /** @class */ (function () {
    function HomeworkService(http, htttp, con) {
        this.http = http;
        this.htttp = htttp;
        this.con = con;
        this.getUrl();
    }
    HomeworkService.prototype.getUrl = function () {
        this.serverUrl = this.con.Server;
    };
    HomeworkService.prototype.getStandards = function () {
        return this.http.get(this.serverUrl + '/homework/standard')
            .map(this.extractData)
            .catch(this.handleError);
    };
    HomeworkService.prototype.getSubjects = function (stan) {
        return this.http.get(this.serverUrl + "/homework/standard/" + stan + "/subject")
            .map(this.extractData)
            .catch(this.handleError);
    };
    HomeworkService.prototype.PostHomework = function (body) {
        var options = new http_1.RequestOptions({
            headers: new http_1.Headers({
                'Authorization': 'Bearer ' + localStorage.getItem('access_token')
            })
        });
        return this.htttp.post(this.serverUrl + "/homework", body, options)
            .map(this.extractData)
            .catch(this.handleError);
    };
    HomeworkService.prototype.getHomework = function (pageNo) {
        return this.http.get(this.serverUrl + '/homework/page/' + pageNo)
            .map(this.extractData)
            .catch(this.handleError);
    };
    HomeworkService.prototype.getOldHomework = function (pageNo) {
        return this.http.get(this.serverUrl + '/homework/old/page/' + pageNo)
            .map(this.extractData)
            .catch(this.handleError);
    };
    HomeworkService.prototype.extractData = function (res) {
        if (res.status === 204) {
            return res;
        }
        var body = res.json();
        return body || {};
    };
    HomeworkService.prototype.handleError = function (error) {
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
    HomeworkService = __decorate([
        core_1.Injectable(),
        __metadata("design:paramtypes", [default_header_service_1.CustomHttpService,
            http_1.Http,
            app_constant_1.Configuration])
    ], HomeworkService);
    return HomeworkService;
}());
exports.HomeworkService = HomeworkService;
//# sourceMappingURL=homework.service.js.map