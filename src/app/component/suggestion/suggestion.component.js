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
var SuggestionComponent = /** @class */ (function () {
    function SuggestionComponent(route, router) {
        this.route = route;
        this.router = router;
        this.status = "";
        this.url = "";
        this.tab = false;
        this.url = this.router.url;
        if (this.url == "/suggestion/for-me" || this.url == "/suggestion/for-student")
            this.tab = true;
        else
            this.tab = false;
        // this.router.navigate(["/suggestion/for-me"]);
    }
    SuggestionComponent = __decorate([
        core_1.Component({
            selector: 'suggestion',
            templateUrl: './suggestion.component.html',
            styleUrls: ['./suggestion.component.css']
        }),
        __metadata("design:paramtypes", [router_1.ActivatedRoute, router_1.Router])
    ], SuggestionComponent);
    return SuggestionComponent;
}());
exports.SuggestionComponent = SuggestionComponent;
//# sourceMappingURL=suggestion.component.js.map