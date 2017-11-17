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
var survey_service_1 = require("../../../providers/survey.service");
var router_1 = require("@angular/router");
var CurrentSurveyComponent = /** @class */ (function () {
    function CurrentSurveyComponent(ss, router) {
        this.ss = ss;
        this.router = router;
        this.currentPage = 1;
        this.emptySurveys = false;
        this.noMore = false;
        this.loader = false;
    }
    CurrentSurveyComponent.prototype.ngOnInit = function () {
        this.getSurveys();
    };
    CurrentSurveyComponent.prototype.getSurveys = function () {
        var _this = this;
        this.loader = true;
        this.ss.getSurveys(this.currentPage).subscribe(function (res) {
            if (res.status == 204) {
                _this.emptySurveys = true;
                _this.loader = false;
                return;
            }
            _this.surveys = res;
            if (_this.surveys.length < 12)
                _this.noMore = true;
            else
                _this.noMore = false;
            _this.loader = false;
        }, function (err) {
            _this.loader = false;
            _this.router.navigate(['/error']);
        });
    };
    // public previousSurvey() {
    //   delete this.surveys;
    //   this.currentPage -= 1;
    //   this.getSurveys();
    // }
    CurrentSurveyComponent.prototype.nextSurvey = function () {
        // delete this.surveys;
        this.currentPage += 1;
        this.getSurveys();
    };
    CurrentSurveyComponent = __decorate([
        core_1.Component({
            selector: 'current-survey',
            templateUrl: './survey.html',
            styleUrls: ['./survey.css'],
        }),
        __metadata("design:paramtypes", [survey_service_1.SurveyService, router_1.Router])
    ], CurrentSurveyComponent);
    return CurrentSurveyComponent;
}());
exports.CurrentSurveyComponent = CurrentSurveyComponent;
//# sourceMappingURL=survey.js.map