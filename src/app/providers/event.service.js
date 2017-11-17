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
var EventService = /** @class */ (function () {
    function EventService(http, htttp, con) {
        this.http = http;
        this.htttp = htttp;
        this.con = con;
        this.serveUrl = "";
        this.serveUrl = this.con.Server;
    }
    //   GetEvent(pageNo){
    //   return this.http.get(this.serveUrl + '/planner/page/' +pageNo)
    //   .map(this.extractData)
    //   .catch(this.handleError);
    // }
    EventService.prototype.GetEvents = function (eventMonth) {
        return this.http.get(this.serveUrl + '/planner/month/' + eventMonth)
            .map(this.extractData)
            .catch(this.handleError);
    };
    EventService.prototype.GetEventById = function (id) {
        return this.http.get(this.serveUrl + '/planner/' + id)
            .map(this.extractData)
            .catch(this.handleError);
    };
    EventService.prototype.GetPlanner = function () {
        return this.http.get(this.serveUrl + '/planner/type/')
            .map(this.extractData)
            .catch(this.handleError);
    };
    EventService.prototype.postEvent = function (data) {
        var options = new http_1.RequestOptions({
            headers: new http_1.Headers({
                'Authorization': 'Bearer ' + localStorage.getItem('access_token')
            })
        });
        return this.http.post(this.serveUrl + '/planner', data, options)
            .map(this.extractData)
            .catch(this.handleError);
    };
    EventService.prototype.deleteEvent = function (id) {
        return this.http.delete(this.serveUrl + '/planner/' + id)
            .map(this.extractData)
            .catch(this.handleError);
    };
    EventService.prototype.addimages = function (id, files) {
        var options = new http_1.RequestOptions({
            headers: new http_1.Headers({
                'Authorization': 'Bearer ' + localStorage.getItem('access_token')
            })
        });
        return this.http.post(this.serveUrl + '/planner/' + id + '/file', files, options)
            .map(this.extractData)
            .catch(this.handleError);
    };
    EventService.prototype.removeimage = function (id, file) {
        var options = new http_1.RequestOptions({
            headers: new http_1.Headers({
                'Authorization': 'Bearer ' + localStorage.getItem('access_token'),
                'fileTimestamp': file
            })
        });
        return this.http.delete(this.serveUrl + '/planner/' + id + '/file', options)
            .map(this.extractData)
            .catch(this.handleError);
    };
    EventService.prototype.updateEvent = function (id, event) {
        // var options = new RequestOptions({
        //    headers: new Headers({
        //    'Authorization': 'Bearer ' + localStorage.getItem('access_token')
        //  })
        // });
        return this.http.put(this.serveUrl + '/planner/' + id, event)
            .map(this.extractData)
            .catch(this.handleError);
    };
    EventService.prototype.getStandards = function () {
        return this.http.get(this.serveUrl + '/homework/standard')
            .map(this.extractData)
            .catch(this.handleError);
    };
    EventService.prototype.extractData = function (res) {
        if (res.status === 204) {
            return res;
        }
        var body = res.json();
        return body || {};
    };
    EventService.prototype.handleError = function (error) {
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
    EventService = __decorate([
        core_1.Injectable(),
        __metadata("design:paramtypes", [http_1.Http,
            default_header_service_1.CustomHttpService,
            app_constant_1.Configuration])
    ], EventService);
    return EventService;
}());
exports.EventService = EventService;
//# sourceMappingURL=event.service.js.map