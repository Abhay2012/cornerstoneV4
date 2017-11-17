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
var forms_1 = require("@angular/forms");
var auth_service_1 = require("../../providers/auth.service");
var router_1 = require("@angular/router");
var common_service_1 = require("../../providers/common.service");
var app_constant_1 = require("../../providers/app.constant");
var default_header_service_1 = require("../../providers/default.header.service");
var LoginComponent = /** @class */ (function () {
    function LoginComponent(formBuilder, appService, router) {
        this.formBuilder = formBuilder;
        this.appService = appService;
        this.router = router;
        this.error = false;
        this.loader = false;
        if (appService.isLoggedIn()) {
            $.noConflict();
            router.navigate(['/']);
        }
    }
    LoginComponent.prototype.ngOnInit = function () {
        this.loginForm = this.formBuilder.group({
            username: ['', forms_1.Validators.required],
            password: ['', [forms_1.Validators.required]]
        });
    };
    LoginComponent.prototype.loaderOn = function () {
        var url = document.URL;
        if (url.indexOf('dashboard')) {
            return true;
        }
        else
            false;
    };
    LoginComponent.prototype.onSubmit = function () {
        var _this = this;
        this.loader = true;
        this.appService.verifyUser(this.loginForm.value).subscribe(function (res) {
            _this.verifySuccessfully(res);
        }, function (err) {
            _this.loader = false;
            _this.verifyFailed(err);
        });
    };
    LoginComponent.prototype.verifySuccessfully = function (res) {
        localStorage.setItem("access_token", res.access_token);
        this.getUserInfo();
    };
    LoginComponent.prototype.verifyFailed = function (err) {
        this.error = true;
        this.router.navigate(['/error']);
    };
    LoginComponent.prototype.getUserInfo = function () {
        var _this = this;
        this.appService.getUserInfo().subscribe(function (res) {
            _this.loggedInSuccesfully(res);
        }, function (err) {
            _this.router.navigate(['/error']);
        });
    };
    LoginComponent.prototype.loggedInSuccesfully = function (res) {
        this.appService.storeData(res);
        this.loader = false;
        this.router.navigate(['/']);
    };
    LoginComponent = __decorate([
        core_1.Component({
            selector: 'login',
            templateUrl: './login.component.html',
            styleUrls: ['./login.component.css'],
            providers: [common_service_1.CommonService, app_constant_1.Configuration, default_header_service_1.CustomHttpService, auth_service_1.AuthService]
        }),
        __metadata("design:paramtypes", [forms_1.FormBuilder,
            auth_service_1.AuthService,
            router_1.Router])
    ], LoginComponent);
    return LoginComponent;
}());
exports.LoginComponent = LoginComponent;
//# sourceMappingURL=login.component.js.map