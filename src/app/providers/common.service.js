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
var default_header_service_1 = require("./default.header.service");
var app_constant_1 = require("./app.constant");
require("rxjs/add/operator/map");
require("rxjs/add/operator/catch");
require("rxjs/add/observable/throw");
// declare const SockJS;
// declare const Stomp;
var CommonService = /** @class */ (function () {
    function CommonService(http, con) {
        this.http = http;
        this.con = con;
        this.baseUrl = this.con.baseUrl;
        this.getSockJs();
        this.getUrl();
    }
    CommonService.prototype.getUrl = function () {
        this.con.getRole();
        this.con.getUserId();
        this.surveyUrl = this.baseUrl.concat(this.con.role + "/" + this.con.userId + "/survey/save-info");
        this.pollUrl = this.baseUrl.concat(this.con.role + "/" + this.con.userId + "/poll/save-info");
        this.circularUrl = this.baseUrl.concat(this.con.role + "/" + this.con.userId + "/circular/type");
        this.studentRatingUrl = this.baseUrl.concat("class-teacher/" + this.con.userId);
    };
    CommonService.prototype.getStandards = function () {
        this.getUrl();
        return this.http.get(this.surveyUrl + "/homework/standard")
            .map(this.extractData)
            .catch(this.handleError);
    };
    CommonService.prototype.getSubjects = function () {
        this.getUrl();
        return this.http.get(this.surveyUrl + "/subjects")
            .map(this.extractData)
            .catch(this.handleError);
    };
    CommonService.prototype.getSurveyInfo = function () {
        this.getUrl();
        return this.http.get(this.surveyUrl)
            .map(this.extractData)
            .catch(this.handleError);
    };
    CommonService.prototype.getPollInfo = function () {
        this.getUrl();
        return this.http.get(this.pollUrl)
            .map(this.extractData)
            .catch(this.handleError);
    };
    CommonService.prototype.getCircularInfo = function () {
        this.getUrl();
        return this.http.get(this.circularUrl)
            .map(this.extractData)
            .catch(this.handleError);
    };
    CommonService.prototype.storeData = function (field_name, data) {
        localStorage.setItem(field_name, data);
    };
    CommonService.prototype.getData = function (field_name) {
        var data = localStorage.getItem(field_name);
        if (data) {
            return data;
        }
    };
    CommonService.prototype.getTomorrow = function () {
        var currentDate = new Date(new Date().getTime() + 24 * 60 * 60 * 1000);
        var day = ("0" + (currentDate.getDate() + 1)).slice(-2);
        var month = ("0" + (currentDate.getMonth() + 1)).slice(-2);
        var year = currentDate.getFullYear();
        var tomorrow = year + '-' + month + '-' + day;
        return tomorrow;
    };
    CommonService.prototype.getSockJs = function () {
        var access_token = localStorage.getItem('access_token');
        var url = this.baseUrl + 'management/nxtlife-websocket?access_token=' + access_token;
        // var socket = new SockJS(url);
        // return Stomp.over(socket);
    };
    CommonService.prototype.extractData = function (res) {
        if (res.status === 204) {
            return res;
        }
        var body = res.json();
        return body || {};
    };
    CommonService.prototype.handleError = function (error) {
        var errMsg;
        if (error instanceof http_1.Response) {
            var body = error.json() || '';
            var err = body.error || JSON.stringify(body);
            errMsg = error.status + " - " + (error.statusText || '') + " " + err;
            if (error.status === 0) {
                errMsg = error.status + " - \"Something is wrong..\"";
            }
        }
        else {
            errMsg = error.message ? error.message : error.toString();
        }
        return Observable_1.Observable.throw(errMsg);
    };
    CommonService = __decorate([
        core_1.Injectable(),
        __metadata("design:paramtypes", [default_header_service_1.CustomHttpService,
            app_constant_1.Configuration])
    ], CommonService);
    return CommonService;
}());
exports.CommonService = CommonService;
//# sourceMappingURL=common.service.js.map