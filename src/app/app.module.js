"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var router_1 = require("@angular/router");
var platform_browser_1 = require("@angular/platform-browser");
var app_component_1 = require("./app.component");
var AuthGuard_1 = require("./AuthGuard");
var loaderstop_service_1 = require("./providers/loaderstop.service");
var AppModule = /** @class */ (function () {
    function AppModule() {
    }
    AppModule = __decorate([
        core_1.NgModule({
            declarations: [app_component_1.AppComponent],
            imports: [platform_browser_1.BrowserModule, router_1.RouterModule.forRoot([
                    {
                        path: '',
                        redirectTo: '',
                        pathMatch: 'full'
                    },
                    {
                        path: 'login',
                        loadChildren: 'app/component/login/login.module#LoginModule'
                    },
                    {
                        path: '',
                        loadChildren: 'app/component/main/main.module#MainModule', canLoad: [AuthGuard_1.AuthGuard]
                    }
                ], { useHash: true })],
            exports: [],
            bootstrap: [app_component_1.AppComponent],
            providers: [AuthGuard_1.AuthGuard, loaderstop_service_1.LoaderStop]
        })
    ], AppModule);
    return AppModule;
}());
exports.AppModule = AppModule;
//# sourceMappingURL=app.module.js.map