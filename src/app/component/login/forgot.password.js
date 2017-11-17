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
var auth_service_1 = require("../../providers/auth.service");
var forms_1 = require("@angular/forms");
var default_header_service_1 = require("../../providers/default.header.service");
var app_constant_1 = require("../../providers/app.constant");
var common_service_1 = require("../../providers/common.service");
var ForgotPassword = /** @class */ (function () {
    // public initForm()
    // {
    //   return new FormGroup({
    //        username : new FormControl('')
    //     })
    // }
    function ForgotPassword(authService) {
        this.authService = authService;
        this.forgotform = new forms_1.FormGroup({
            username: new forms_1.FormControl('')
        });
        // this.forgotform=this.initForm()
    }
    ForgotPassword.prototype.onSubmit = function () {
        this.authService.forgotPassword(this.forgotform.value)
            .subscribe(function (response) {
        }, function (err) {
        });
    };
    ForgotPassword.prototype.gotologin = function () {
        this.router.navigate(['/login']);
    };
    ForgotPassword = __decorate([
        core_1.Component({
            selector: 'forgot-password',
            templateUrl: './forgot.password.html',
            styleUrls: ['./forgot.password.css'],
            providers: [common_service_1.CommonService, app_constant_1.Configuration, default_header_service_1.CustomHttpService, auth_service_1.AuthService]
        }),
        __metadata("design:paramtypes", [auth_service_1.AuthService])
    ], ForgotPassword);
    return ForgotPassword;
}());
exports.ForgotPassword = ForgotPassword;
//# sourceMappingURL=forgot.password.js.map