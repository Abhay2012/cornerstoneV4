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
var common_service_1 = require("./common.service");
require("rxjs/add/operator/map");
require("rxjs/add/operator/catch");
require("rxjs/add/observable/throw");
var app_constant_1 = require("./app.constant");
var default_header_service_1 = require("./default.header.service");
var AuthService = /** @class */ (function () {
    function AuthService(http, htttp, commonService, con) {
        this.http = http;
        this.htttp = htttp;
        this.commonService = commonService;
        this.con = con;
        this.userId = localStorage.getItem("id");
        this.login = false;
        this.serverUrl = con.url;
    }
    // called after logout
    AuthService.prototype.resetLoginStatus = function () {
        this.login = false;
    };
    AuthService.prototype.isLoggedIn = function () {
        var access_token = localStorage.getItem("access_token");
        if (access_token) {
            return !this.login;
        }
        else {
            return this.login;
        }
    };
    AuthService.prototype.verifyUser = function (data) {
        return this.http.post(this.serverUrl + "/oauth/token?grant_type=password&username=" + data.username + "&password=" + data.password, {})
            .map(this.extractData)
            .catch(this.handleError);
    };
    AuthService.prototype.getUserInfo = function () {
        return this.http.get(this.serverUrl + "/management/info")
            .map(this.extractData)
            .catch(this.handleError);
    };
    AuthService.prototype.logout = function () {
        return this.http.get(this.serverUrl + "/management/logout")
            .map(this.extractData)
            .catch(this.handleError);
    };
    AuthService.prototype.forgotPassword = function (data) {
        return this.http.put(this.serverUrl + "/forgot-password", data)
            .map(this.extractData)
            .catch(this.handleError);
    };
    AuthService.prototype.resetPassword = function (data) {
        return this.http.put(this.serverUrl + "/management/" + this.userId + "/password", data)
            .map(this.extractData)
            .catch(this.handleError);
    };
    AuthService.prototype.storeData = function (data) {
        localStorage.setItem("id", data.id);
        localStorage.setItem("role", data.role);
        this.commonService.storeData("classTeacher", data.classTeacher);
        this.commonService.storeData("username", data.username);
        this.commonService.storeData("email", data.email);
        localStorage.setItem("name", data.name);
        this.commonService.storeData("nickName", data.nickName);
        localStorage.setItem("fileUrl", data.fileUrl);
        localStorage.setItem("picOriginalName", data.picOriginalName);
        localStorage.setItem("picTimestamp", data.picTimestamp);
        localStorage.setItem('picUrl', data.fileUrl + "/" + data.picTimestamp);
        this.con.setAccessToken();
    };
    AuthService.prototype.uploadImage = function (data) {
        var option = new http_1.RequestOptions({
            headers: new http_1.Headers({
                'Authorization': 'Bearer ' + localStorage.getItem('access_token'),
            })
        });
        return this.htttp.post(this.con.baseUrl + "management/" + this.con.getUserId() + "/picture", data, option)
            .map(this.extractData)
            .catch(this.handleError);
    };
    AuthService.prototype.resetImage = function () {
        return this.htttp.delete(this.con.baseUrl + "management/" + this.con.getUserId() + "/picture")
            .map(this.extractData)
            .catch(this.handleError);
    };
    AuthService.prototype.extractData = function (res) {
        var body = res.json();
        return body || {};
    };
    AuthService.prototype.handleError = function (error) {
        return Observable_1.Observable.throw(error.status);
    };
    AuthService = __decorate([
        core_1.Injectable(),
        __metadata("design:paramtypes", [default_header_service_1.CustomHttpService,
            http_1.Http,
            common_service_1.CommonService,
            app_constant_1.Configuration])
    ], AuthService);
    return AuthService;
}());
exports.AuthService = AuthService;
//# sourceMappingURL=auth.service.js.map