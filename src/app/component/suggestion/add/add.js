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
var suggestion_service_1 = require("../../../providers/suggestion.service");
var common_service_1 = require("../../../providers/common.service");
var common_1 = require("@angular/common");
var router_1 = require("@angular/router");
var SuggestionAddComponent = /** @class */ (function () {
    // subjects:any = [];
    function SuggestionAddComponent(suggestionService, commonService, _location, router) {
        this.suggestionService = suggestionService;
        this.commonService = commonService;
        this._location = _location;
        this.router = router;
        this.submitProgress = false;
        this.standards = [];
        this.emptyStandards = false;
        this.emptyStudents = false;
        this.students = [];
        this.standardLoader = false;
        this.studentLoader = false;
        // this.getStudents(a);
    }
    SuggestionAddComponent.prototype.ngOnInit = function () {
        this.getStandards();
        this.initForm();
    };
    SuggestionAddComponent.prototype.initForm = function () {
        this.standardId = null;
        this.suggestion = new forms_1.FormGroup({
            description: new forms_1.FormControl('', [forms_1.Validators.required, forms_1.Validators.maxLength(2500)]),
            studentId: new forms_1.FormControl('', [forms_1.Validators.required]),
            title: new forms_1.FormControl('', [forms_1.Validators.required, forms_1.Validators.maxLength(50)]),
        });
    };
    SuggestionAddComponent.prototype.submitSuggestion = function () {
        var _this = this;
        this.submitProgress = true;
        this.suggestionService.postSuggestion(this.suggestion.value).subscribe(function (res) {
            _this.submitProgress = false;
            _this.initForm();
            // $('#circularModal').modal('show');
        }, function (err) {
            _this.router.navigate(['/error']);
        });
    };
    SuggestionAddComponent.prototype.getStandards = function () {
        var _this = this;
        this.standardLoader = true;
        this.suggestionService.getStandards().subscribe(function (res) {
            if (res.status === 204) {
                _this.standardLoader = false;
                _this.emptyStandards = true;
                return;
            }
            _this.standardLoader = false;
            _this.emptyStandards = false;
            _this.standards = res;
        }, function (err) {
            _this.router.navigate(['/error']);
        });
    };
    SuggestionAddComponent.prototype.getStudents = function (standardId) {
        var _this = this;
        this.studentLoader = true;
        this.suggestion.controls["studentId"].reset();
        this.suggestionService.getStudents(standardId).subscribe(function (res) {
            if (res.status === 204) {
                _this.studentLoader = false;
                _this.emptyStudents = true;
                return;
            }
            _this.studentLoader = false;
            _this.emptyStudents = false;
            ;
            _this.students = res;
        }, function (err) {
            _this.router.navigate(['/error']);
        });
    };
    SuggestionAddComponent = __decorate([
        core_1.Component({
            selector: 'suggestion-add',
            templateUrl: './add.html',
        }),
        __metadata("design:paramtypes", [suggestion_service_1.SuggestionService,
            common_service_1.CommonService,
            common_1.Location,
            router_1.Router])
    ], SuggestionAddComponent);
    return SuggestionAddComponent;
}());
exports.SuggestionAddComponent = SuggestionAddComponent;
//# sourceMappingURL=add.js.map