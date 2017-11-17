"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
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
require("rxjs/add/operator/map");
require("rxjs/add/operator/catch");
function getToken() {
    var token = localStorage.getItem('access_token');
    var header;
    if (!token) {
        header = 'Basic Zm9vQ2xpZW50SWRQYXNzd29yZDpzZWNyZXQ=';
    }
    else {
        header = 'Bearer ' + localStorage.getItem('access_token') || '';
    }
    return header;
}
var CustomHttpService = /** @class */ (function (_super) {
    __extends(CustomHttpService, _super);
    function CustomHttpService(backend, options) {
        var _this = this;
        options.headers = new http_1.Headers({
            'Content-Type': 'application/json',
            'isWeb': true,
            'Authorization': "" + getToken(),
        });
        _this = _super.call(this, backend, options) || this;
        return _this;
    }
    // its like interceptor, calls by each methods internally like get, post, put, delete etc
    CustomHttpService.prototype.request = function (url, options) {
        if (typeof url === 'string') {
            if (!options) {
                options = { headers: new http_1.Headers() };
            }
            options.headers.set('Content-Type', 'application/json');
            options.headers.set('Authorization', "" + getToken());
        }
        else {
            url.headers.set('Content-Type', 'application/json');
            url.headers.set('Authorization', "" + getToken());
        }
        return _super.prototype.request.call(this, url, options);
    };
    CustomHttpService = __decorate([
        core_1.Injectable(),
        __metadata("design:paramtypes", [http_1.XHRBackend, http_1.RequestOptions])
    ], CustomHttpService);
    return CustomHttpService;
}(http_1.Http));
exports.CustomHttpService = CustomHttpService;
//# sourceMappingURL=default.header.service.js.map