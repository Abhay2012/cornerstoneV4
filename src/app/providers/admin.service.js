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
var default_header_service_1 = require("./default.header.service");
var app_constant_1 = require("./app.constant");
var AdminService = /** @class */ (function () {
    function AdminService(http, htttp, con) {
        this.http = http;
        this.htttp = htttp;
        this.con = con;
        this.baseUrl = "";
        this.baseUrl = this.con.baseUrl;
        this.id = localStorage.getItem('id');
    }
    AdminService.prototype.getSubjects = function () {
        return this.http.get(this.baseUrl + "subject")
            .map(this.extractData)
            .catch(this.handleError);
    };
    AdminService.prototype.getStandards = function () {
        return this.http.get(this.baseUrl + "admin/" + this.id + "/homework/standard")
            .map(this.extractData)
            .catch(this.handleError);
    };
    // getParents() {
    //   return this.http.get("https://cornerstone.ind-cloud.everdata.com/admin/parent")
    //     .map(this.extractData)
    //     .catch(this.handleError);
    // }
    AdminService.prototype.getStudents = function (stdId) {
        return this.http.get(this.baseUrl + "admin/student-by-standard/" + stdId)
            .map(this.extractData)
            .catch(this.handleError);
    };
    AdminService.prototype.addEmployee = function (data) {
        return this.http.post(this.baseUrl + "admin/employee", data)
            .map(this.extractData)
            .catch(this.handleError);
    };
    AdminService.prototype.addStudent = function (data) {
        var option = new http_1.RequestOptions({
            headers: new http_1.Headers({
                'Authorization': 'Bearer ' + localStorage.getItem('access_token'),
            })
        });
        return this.http.post(this.baseUrl + "admin/student", data, option)
            .map(this.extractData);
    };
    AdminService.prototype.getAllStudents = function (stdId) {
        return this.http.get(this.baseUrl + "admin/student/" + stdId + "/parent-sibling")
            .map(this.extractData)
            .catch(this.handleError);
    };
    AdminService.prototype.uploadParentImage = function (id, data) {
        var option = new http_1.RequestOptions({
            headers: new http_1.Headers({
                'Authorization': 'Bearer ' + localStorage.getItem('access_token'),
            })
        });
        return this.htttp.post(this.con.baseUrl + "admin/parent/" + id + "/picture", data, option)
            .map(this.extractData)
            .catch(this.handleError);
    };
    AdminService.prototype.uploadStudentImage = function (id, data) {
        var option = new http_1.RequestOptions({
            headers: new http_1.Headers({
                'Authorization': 'Bearer ' + localStorage.getItem('access_token'),
            })
        });
        return this.htttp.post(this.con.baseUrl + "admin/student/" + id + "/picture", data, option)
            .map(this.extractData)
            .catch(this.handleError);
    };
    AdminService.prototype.uploadImage = function (data, id) {
        var option = new http_1.RequestOptions({
            headers: new http_1.Headers({
                'Authorization': 'Bearer ' + localStorage.getItem('access_token'),
            })
        });
        return this.htttp.post(this.con.baseUrl + "management/" + id + "/picture", data, option)
            .map(this.extractData)
            .catch(this.handleError);
    };
    AdminService.prototype.addSibling = function (id, data) {
        return this.http.post(this.baseUrl + "admin/student/" + id + "/sibling", data)
            .map(this.extractData)
            .catch(this.handleError);
    };
    AdminService.prototype.addParent = function (id, data) {
        return this.http.post(this.baseUrl + "admin/student/" + id + "/parent", data)
            .map(this.extractData)
            .catch(this.handleError);
    };
    AdminService.prototype.getStudentDetails = function (id) {
        return this.http.get(this.baseUrl + "admin/student/" + id)
            .map(this.extractData)
            .catch(this.handleError);
    };
    AdminService.prototype.updateStudent = function (id, object) {
        return this.http.put(this.baseUrl + "admin/student/" + id, object)
            .map(this.extractData)
            .catch(this.handleError);
    };
    AdminService.prototype.updateParent = function (id, object) {
        return this.http.put(this.baseUrl + "admin/parent/" + id, object)
            .map(this.extractData)
            .catch(this.handleError);
    };
    // addStudentWithExistingUser(data: any) {
    //   return this.http.post("https://cornerstone.ind-cloud.everdata.com/admin/students", data)
    //     .map(this.extractData)
    //     .catch(this.handleError);
    // }
    // deleteStudent(id: any) {
    //   return this.http.delete("https://cornerstone.ind-cloud.everdata.com/admin/student/" + id)
    //     .map(this.extractData)
    //     .catch(this.handleError);
    // }
    AdminService.prototype.extractData = function (res) {
        if (res.status === 204) {
            return res;
        }
        var body = res.json();
        return body || {};
    };
    AdminService.prototype.handleError = function (error) {
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
    AdminService = __decorate([
        core_1.Injectable(),
        __metadata("design:paramtypes", [default_header_service_1.CustomHttpService,
            http_1.Http,
            app_constant_1.Configuration])
    ], AdminService);
    return AdminService;
}());
exports.AdminService = AdminService;
//# sourceMappingURL=admin.service.js.map