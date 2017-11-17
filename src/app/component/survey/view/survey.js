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
var survey_service_1 = require("../../../providers/survey.service");
var common_1 = require("@angular/common");
var ViewSurveyComponent = /** @class */ (function () {
    function ViewSurveyComponent(ss, _location, route, router) {
        this.ss = ss;
        this._location = _location;
        this.route = route;
        this.router = router;
        this.loader = false;
        this.emptySurvey = false;
    }
    ViewSurveyComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.loader = true;
        this.route.params.subscribe(function (params) {
            _this.id = params['id'];
        });
        this.selectToExpand();
    };
    ViewSurveyComponent.prototype.selectToExpand = function () {
        var _this = this;
        this.loader = true;
        this.ss.getSurvey(this.id).subscribe(function (res) {
            if (res.status === 204) {
                _this.emptySurvey = true;
                _this.selectedSurvey = null;
                _this.loader = false;
                return;
            }
            _this.selectedSurvey = res;
            _this.loader = false;
        }, function (err) {
            _this.loader = false;
            _this.router.navigate(['/error']);
        });
    };
    ViewSurveyComponent = __decorate([
        core_1.Component({
            selector: 'view-survey',
            templateUrl: './survey.html',
            styleUrls: ['./survey.css']
        }),
        __metadata("design:paramtypes", [survey_service_1.SurveyService,
            common_1.Location,
            router_1.ActivatedRoute,
            router_1.Router])
    ], ViewSurveyComponent);
    return ViewSurveyComponent;
}());
exports.ViewSurveyComponent = ViewSurveyComponent;
//# sourceMappingURL=survey.js.map