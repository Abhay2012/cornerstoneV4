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
var router_1 = require("@angular/router");
var app_constant_1 = require("../../providers/app.constant");
var LoggedInGuard = /** @class */ (function () {
    function LoggedInGuard(router, con) {
        this.router = router;
        this.con = con;
    }
    LoggedInGuard.prototype.canActivate = function () {
        if (localStorage.getItem('username')) {
            this.con.setAccessToken();
            return true;
        }
        this.router.navigate(['/login']);
        return false;
    };
    LoggedInGuard.prototype.isLoggedIn = function () {
        return this.canActivate();
    };
    LoggedInGuard.prototype.getData = function (key) {
        return localStorage.getItem(key);
    };
    LoggedInGuard = __decorate([
        core_1.Injectable(),
        __metadata("design:paramtypes", [router_1.Router,
            app_constant_1.Configuration])
    ], LoggedInGuard);
    return LoggedInGuard;
}());
exports.LoggedInGuard = LoggedInGuard;
//# sourceMappingURL=login.gaurd.js.map