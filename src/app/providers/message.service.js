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
var MessageService = /** @class */ (function () {
    function MessageService(http, htttp, con) {
        this.http = http;
        this.htttp = htttp;
        this.con = con;
        this.getUrl();
    }
    MessageService.prototype.getUrl = function () {
        this.serverUrl = this.con.Server;
    };
    MessageService.prototype.getAllMessages = function (pageNo) {
        this.getUrl();
        return this.http.get(this.serverUrl + "/conversation/page/" + pageNo)
            .map(this.extractData)
            .catch(this.handleError);
    };
    MessageService.prototype.getStandards = function () {
        return this.http.get(this.serverUrl + "/homework/standard")
            .map(this.extractData)
            .catch(this.handleError);
    };
    MessageService.prototype.getMessage = function (id, pageNo) {
        var options = new http_1.RequestOptions({
            headers: new http_1.Headers({
                'Authorization': 'Bearer ' + localStorage.getItem('access_token')
            })
        });
        return this.http.get(this.serverUrl + "/conversation/" + id + "/page/" + pageNo, options)
            .map(this.extractData)
            .catch(this.handleError);
    };
    MessageService.prototype.conversationComment = function (id, data) {
        var options = new http_1.RequestOptions({
            headers: new http_1.Headers({
                'Authorization': 'Bearer ' + localStorage.getItem('access_token')
            })
        });
        return this.http.post(this.serverUrl + "/conversation/" + id, data, options)
            .map(this.extractData)
            .catch(this.handleError);
    };
    MessageService.prototype.conversationCommentWithPicture = function (id, data) {
        var options = new http_1.RequestOptions({
            headers: new http_1.Headers({
                'Authorization': 'Bearer ' + localStorage.getItem('access_token')
            })
        });
        return this.htttp.post(this.serverUrl + "/conversation/" + id + "/picture", data, options)
            .map(this.extractData)
            .catch(this.handleError);
    };
    MessageService.prototype.newConversation = function (data) {
        var options = new http_1.RequestOptions({
            headers: new http_1.Headers({
                'Authorization': 'Bearer ' + localStorage.getItem('access_token')
            })
        });
        return this.http.post(this.serverUrl + "/conversation/", data, options)
            .map(this.extractData)
            .catch(this.handleError);
    };
    MessageService.prototype.getMessageCategory = function (standardId) {
        return this.http.get(this.serverUrl + "/conversation/category-and-student/" + standardId)
            .map(this.extractData)
            .catch(this.handleError);
    };
    MessageService.prototype.closeConversation = function (id) {
        return this.http.put(this.serverUrl + "/conversation/" + id, {})
            .map(this.extractData)
            .catch(this.handleError);
    };
    MessageService.prototype.extractData = function (res) {
        if (res.status === 204) {
            return res;
        }
        var body = res.json();
        return body || {};
    };
    MessageService.prototype.handleError = function (error) {
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
    MessageService = __decorate([
        core_1.Injectable(),
        __metadata("design:paramtypes", [default_header_service_1.CustomHttpService,
            http_1.Http,
            app_constant_1.Configuration])
    ], MessageService);
    return MessageService;
}());
exports.MessageService = MessageService;
//# sourceMappingURL=message.service.js.map