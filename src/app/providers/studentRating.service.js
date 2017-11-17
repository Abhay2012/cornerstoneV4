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
require("rxjs/add/operator/map");
require("rxjs/add/operator/catch");
require("rxjs/add/observable/throw");
var common_service_1 = require("./common.service");
var StudentRatingService = /** @class */ (function () {
    function StudentRatingService(http, htttp, con) {
        this.http = http;
        this.htttp = htttp;
        this.con = con;
        // this.getUrl();
    }
    // getUrl() {
    //   this.serverUrl = this.con.baseUrl + "class-teacher" + "/" + this.con.userId;
    // }
    StudentRatingService.prototype.getStudents = function () {
        // var options = new RequestOptions({
        //   headers: new Headers({
        //     'Authorization': 'Bearer ' + localStorage.getItem('access_token')
        //   })
        // });
        return this.http.get(this.con.studentRatingUrl + "/student-profile/student")
            .map(this.extractData)
            .catch(this.handleError);
    };
    StudentRatingService.prototype.getStudentRating = function (studentId) {
        var options = new http_1.RequestOptions({
            headers: new http_1.Headers({
                'Authorization': 'Bearer ' + localStorage.getItem('access_token')
            })
        });
        return this.http.get(this.con.studentRatingUrl + '/student-profile/' + studentId, options)
            .map(this.extractData)
            .catch(this.handleError);
    };
    StudentRatingService.prototype.saveStudentRating = function (data, isEmpty) {
        var options = new http_1.RequestOptions({
            headers: new http_1.Headers({
                'Authorization': 'Bearer ' + localStorage.getItem('access_token')
            })
        });
        if (isEmpty) {
            return this.http.post(this.con.studentRatingUrl + '/student-profile/', data, options)
                .map(this.extractData)
                .catch(this.handleError);
        }
        else {
            return this.http.put(this.con.studentRatingUrl + '/student-profile/', data, options)
                .map(this.extractData)
                .catch(this.handleError);
        }
    };
    StudentRatingService.prototype.extractData = function (res) {
        if (res.status === 204) {
            return res;
        }
        var body = res.json();
        return body || {};
    };
    StudentRatingService.prototype.handleError = function (error) {
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
    StudentRatingService = __decorate([
        core_1.Injectable(),
        __metadata("design:paramtypes", [default_header_service_1.CustomHttpService,
            http_1.Http,
            common_service_1.CommonService])
    ], StudentRatingService);
    return StudentRatingService;
}());
exports.StudentRatingService = StudentRatingService;
//# sourceMappingURL=studentRating.service.js.map