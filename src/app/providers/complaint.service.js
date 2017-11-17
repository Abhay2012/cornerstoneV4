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
var ComplaintService = /** @class */ (function () {
    function ComplaintService(con, http) {
        this.con = con;
        this.http = http;
        this.baseUrl = "";
        this.baseUrl = con.Server;
    }
    ComplaintService.prototype.getComplaint = function (url, pageNo) {
        this.baseUrl = this.con.Server;
        return this.http.get(this.baseUrl + url + "/page/" + pageNo)
            .map(this.extractData)
            .catch(this.handleError);
    };
    ComplaintService.prototype.getComplaintById = function (url, id) {
        return this.http.get(this.baseUrl + "/" + url + id)
            .map(this.extractData)
            .catch(this.handleError);
    };
    ComplaintService.prototype.getComplaintCommentById = function (url, complaintId) {
        // return this.http.get(this.baseUrl + "/complaint" + "/" + complaintId + "/comment")
        return this.http.get(this.baseUrl + "/" + url + "/" + complaintId + "/comment")
            .map(this.extractData)
            .catch(this.handleError);
    };
    ComplaintService.prototype.postComplaintComment = function (complaintId, comment, url) {
        return this.http.post(this.baseUrl + "/" + url + "/" + complaintId + "/comment", comment)
            .map(this.extractData)
            .catch(this.handleError);
    };
    ComplaintService.prototype.updateComplaint = function (complaintId, complaint, url) {
        return this.http.put(this.baseUrl + "/" + url + "/" + complaintId, complaint)
            .map(this.extractData)
            .catch(this.handleError);
    };
    ComplaintService.prototype.closeComplaint = function (complaintId, complaint, url) {
        return this.http.put(this.baseUrl + "/" + url + "/" + complaintId + "/close", complaint)
            .map(this.extractData)
            .catch(this.handleError);
    };
    ComplaintService.prototype.searchComplaints = function (pageNo, key) {
        return this.http.post(this.baseUrl + "/complaint/search/page/" + pageNo, key)
            .map(this.extractData)
            .catch(this.handleError);
    };
    ComplaintService.prototype.editInfo = function () {
        return this.http.get(this.baseUrl + "/complaint/edit-info")
            .map(this.extractData)
            .catch(this.handleError);
    };
    ComplaintService.prototype.showToast = function (msg) {
    };
    ComplaintService.prototype.getUserId = function () {
        return this.con.getUserId();
    };
    ComplaintService.prototype.extractData = function (res) {
        if (res.status === 204) {
            return res;
        }
        var body = res.json();
        return body || {};
    };
    ComplaintService.prototype.getSockJs = function () {
        var access_token = localStorage.getItem('access_token');
        var url = this.con.url + '/management/nxtlife-websocket?access_token=' + access_token;
        var socket = new SockJS(url);
        return Stomp.over(socket);
    };
    ComplaintService.prototype.handleError = function (error) {
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
    ComplaintService = __decorate([
        core_1.Injectable(),
        __metadata("design:paramtypes", [app_constant_1.Configuration,
            default_header_service_1.CustomHttpService])
    ], ComplaintService);
    return ComplaintService;
}());
exports.ComplaintService = ComplaintService;
//# sourceMappingURL=complaint.service.js.map