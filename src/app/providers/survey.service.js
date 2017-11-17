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
var SurveyService = /** @class */ (function () {
    function SurveyService(con, http) {
        this.con = con;
        this.http = http;
        this.serverUrl = "";
        this.getUrl();
    }
    SurveyService.prototype.getUrl = function () {
        this.serverUrl = this.con.Server;
    };
    SurveyService.prototype.getSurveys = function (pageNo) {
        return this.http.get(this.serverUrl + "/survey/page/" + pageNo)
            .map(this.extractData)
            .catch(this.handleError);
    };
    SurveyService.prototype.getClosedSurveys = function (pageNo) {
        return this.http.get(this.serverUrl + "/survey/old/page/" + pageNo)
            .map(this.extractData)
            .catch(this.handleError);
    };
    SurveyService.prototype.getSurvey = function (id) {
        return this.http.get(this.serverUrl + "/survey/" + id)
            .map(this.extractData)
            .catch(this.handleError);
    };
    SurveyService.prototype.saveSurvey = function (data) {
        return this.http.post(this.serverUrl + "/survey/", data)
            .map(this.extractData)
            .catch(this.handleError);
    };
    SurveyService.prototype.extractData = function (res) {
        if (res.status === 204) {
            return res;
        }
        var body = res.json();
        return body || {};
    };
    SurveyService.prototype.handleError = function (error) {
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
    SurveyService = __decorate([
        core_1.Injectable(),
        __metadata("design:paramtypes", [app_constant_1.Configuration,
            default_header_service_1.CustomHttpService])
    ], SurveyService);
    return SurveyService;
}());
exports.SurveyService = SurveyService;
//# sourceMappingURL=survey.service.js.map