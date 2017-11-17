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
var common_service_1 = require("../../../providers/common.service");
var survey_service_1 = require("../../../providers/survey.service");
var formValidation_service_1 = require("../../../providers/formValidation.service");
var common_1 = require("@angular/common");
var router_1 = require("@angular/router");
var AddSurveyComponent = /** @class */ (function () {
    function AddSurveyComponent(cs, ss, fb, vs, _location, router) {
        this.cs = cs;
        this.ss = ss;
        this.fb = fb;
        this.vs = vs;
        this._location = _location;
        this.router = router;
        this.loader = false;
        this.submitProgress = false;
        this.standardLoader = false;
        this.stdIds = [];
    }
    AddSurveyComponent.prototype.ngOnInit = function () {
        this.getSurveyInfo();
        this.initForm();
        this.getStandards();
    };
    AddSurveyComponent.prototype.getStandards = function () {
        var _this = this;
        this.standardLoader = true;
        this.cs.getStandards().subscribe(function (res) {
            if (res.status == 204) {
                _this.standardLoader = false;
                _this.standards = null;
                return;
            }
            _this.standardLoader = false;
            _this.standards = res;
        }, function (err) {
            _this.router.navigate(['/error']);
        });
    };
    AddSurveyComponent.prototype.getSurveyInfo = function () {
        var _this = this;
        this.loader = true;
        this.cs.getSurveyInfo().subscribe(function (res) {
            if (res.status === 204) {
                _this.surveyInfo = null;
                return;
            }
            _this.surveyInfo = res;
            _this.loader = false;
        }, function (err) {
            _this.loader = false;
            _this.router.navigate(['/error']);
        });
    };
    AddSurveyComponent.prototype.initForm = function () {
        this.surveyForm = this.fb.group({
            'title': [(''), [forms_1.Validators.required]],
            'description': [(''), [forms_1.Validators.required]],
            'surveyTypeId': [(''), [forms_1.Validators.required]],
            'expiredAt': [(this.cs.getTomorrow()), [forms_1.Validators.required]],
            // 'standards': [('')],
            'surveyQuestions': this.fb.array([
                this.initQuestions(),
            ], forms_1.Validators.minLength(1)
            // Validators.compose([ Validators.minLength(1), Validators.maxLength(this.qLimit)])
            ),
        });
    };
    AddSurveyComponent.prototype.onDueDate = function (e) {
        if (new Date(e.target.value) < new Date(new Date().getFullYear(), new Date().getMonth(), new Date().getDate())) {
            $('#dateErrorModal').modal('show');
            this.surveyForm.controls['expiredAt'].patchValue(this.cs.getTomorrow());
        }
    };
    AddSurveyComponent.prototype.onTypeId = function (event) {
        if (event == "1") {
            this.surveyForm.removeControl("standards");
            this.selectedStandard = [];
        }
        else if (event == "2") {
            this.selectedStandard = [];
            this.surveyForm.addControl("standards", new forms_1.FormControl((''), [forms_1.Validators.required]));
        }
    };
    AddSurveyComponent.prototype.selectStandards = function (a, e) {
        var _this = this;
        if (e == true) {
            this.stdIds.push(a.id);
        }
        else if (e == false) {
            this.stdIds.forEach(function (element, index) {
                if (element == a.id) {
                    _this.stdIds.splice(index, 1);
                }
            });
        }
        this.surveyForm.controls['standardIds'].patchValue(this.stdIds);
    };
    AddSurveyComponent.prototype.onStandards = function (ev) {
        var stan = ev;
        this.surveyForm.controls['standards'].patchValue(stan);
    };
    AddSurveyComponent.prototype.initQuestions = function () {
        return this.fb.group({
            'type': [(''), [forms_1.Validators.required]],
            'text': [(''), [forms_1.Validators.required]],
            'choices': this.fb.array([
                this.initOptions(),
                this.initOptions(),
            ], forms_1.Validators.minLength(2)),
        });
    };
    AddSurveyComponent.prototype.addQuestions = function (e) {
        var control = e.controls['surveyQuestions'];
        control.push(this.initQuestions());
    };
    AddSurveyComponent.prototype.removeQuestions = function (form, index) {
        var control = form.controls['surveyQuestions'];
        control.removeAt(index);
    };
    AddSurveyComponent.prototype.initOptions = function () {
        return this.fb.group({
            'choice': [(''), [forms_1.Validators.required]],
        });
    };
    AddSurveyComponent.prototype.addOptions = function (e, i) {
        var control = e.controls['surveyQuestions'].controls[i].get("choices");
        control.push(this.initOptions());
    };
    AddSurveyComponent.prototype.removeOptions = function (form, i, ii) {
        var control = form.controls['surveyQuestions'].controls[i].get("choices");
        control.removeAt(ii);
    };
    AddSurveyComponent.prototype.submitSurvey = function () {
        var _this = this;
        this.submitProgress = true;
        this.ss.saveSurvey(this.surveyForm.value).subscribe(function (res) {
            _this.submitProgress = false;
            $('#submitModal').modal('show');
            _this.initForm();
        }, function (err) {
            _this.submitProgress = false;
            _this.router.navigate(['/error']);
        });
    };
    AddSurveyComponent = __decorate([
        core_1.Component({
            selector: 'add-survey',
            templateUrl: './add.html',
            styleUrls: ['./add.css'],
        }),
        __metadata("design:paramtypes", [common_service_1.CommonService,
            survey_service_1.SurveyService,
            forms_1.FormBuilder,
            formValidation_service_1.ValidationService,
            common_1.Location,
            router_1.Router])
    ], AddSurveyComponent);
    return AddSurveyComponent;
}());
exports.AddSurveyComponent = AddSurveyComponent;
// import { Component, OnInit } from '@angular/core';
// import { FormGroup, FormControl, FormBuilder, FormArray, Validators } from '@angular/forms';
// import { CommonService } from '../../../providers/common.service';
// import { SurveyService } from '../../../providers/survey.service';
// import { ValidationService } from '../../../providers/formValidation.service'
// import { Location } from '@angular/common';
// import { Router } from '@angular/router';
// declare let $: any;
// @Component({
//   selector: 'add-survey',
//   templateUrl: './add.html',
//   styleUrls: ['./add.css'],
// })
// export class AddSurveyComponent implements OnInit {
//   public surveyForm: FormGroup;
//   public standards: any[];
//   public surveyInfo: any;
//   public selectedStandard: any;
//   public loader: boolean = false;
//   constructor(public cs: CommonService,
//     public ss: SurveyService,
//     public fb: FormBuilder,
//     public vs: ValidationService,
//     public _location: Location,
//     public router: Router,
//   ) {
//   }
//   ngOnInit() {
//     this.getSurveyInfo();
//     this.initForm();
//     this.getStandards();
//   }
//   public getStandards() {
//     this.loader = true;
//     this.cs.getStandards().subscribe(res => {
//        if(res.status == 204){
//         this.standards = null;
//         return;
//       }
//       this.standards = res;
//       this.loader = false;
//     },
//       err => {
//          this.loader = false;
//          this.router.navigate(['/error']);
//       })
//   }
//   public getSurveyInfo() {
//      this.loader = true;
//     this.cs.getSurveyInfo().subscribe(res => {
//       if(res.status === 204){
//         this.surveyInfo = null;
//         return;
//       }
//       this.surveyInfo = res;
//       this.loader = false;
//     },
//       err => {
//        this.loader = false;
//         this.router.navigate(['/error']);
//       })
//   }
//   public initForm() {
//     this.surveyForm = this.fb.group({
//       'title': [(''), [Validators.required]],
//       'description': [(''), [Validators.required]],
//       'surveyTypeId': [(''), [Validators.required]],
//       'expiredAt': [(this.cs.getTomorrow()), [Validators.required]],
//       // 'standards': [('')],
//       'surveyQuestions': this.fb.array([
//         this.initQuestions(),
//       ], Validators.minLength(1)
//         // Validators.compose([ Validators.minLength(1), Validators.maxLength(this.qLimit)])
//       ),
//     })
//   }
//   onDueDate(e: any) {
//     if (new Date(e.target.value) < new Date(new Date().getFullYear(), new Date().getMonth(), new Date().getDate())) {
//       $('#dateErrorModal').modal('show');
//       this.surveyForm.controls['expiredAt'].patchValue(this.cs.getTomorrow());
//     }
//   }
//   public onTypeId(event: any) {
//     if (event == "1") {
//       this.surveyForm.removeControl("standards");
//       this.selectedStandard = [];
//     }
//     else if (event == "2") {
//       this.selectedStandard = [];
//       this.surveyForm.addControl("standards", new FormControl((''), [Validators.required]));
//     }
//   }
//   public onStandards(ev: any) {
//     var stan = ev;
//     this.surveyForm.controls['standards'].patchValue(stan);
//   }
//   public initQuestions() {
//     return this.fb.group({
//       'type': [(''), [Validators.required]],
//       'text': [(''), [Validators.required]],
//       'choices': this.fb.array([
//         this.initOptions(),
//         this.initOptions(),
//       ], Validators.required, Validators.minLength(2),
//         // Validators.compose([ Validators.minLength(2), Validators.maxLength(this.oLimit)])
//       ),
//     })
//   }
//   public addQuestions(e: any) {
//     const control = <FormArray>e.controls['surveyQuestions'];
//     control.push(this.initQuestions());
//   }
//   public removeQuestions(form: any, index: any) {
//     const control = <FormArray>form.controls['surveyQuestions'];
//     control.removeAt(index);
//   }
//   public initOptions() {
//     return this.fb.group({
//       'choice': [(''), [Validators.required]],
//     })
//   }
//   public addOptions(e: any, i: any) {
//     const control = <FormArray>e.controls['surveyQuestions'].controls[i].get("choices");
//     control.push(this.initOptions());
//   }
//   public removeOptions(form: any, i: any, ii: any) {
//     const control = <FormArray>form.controls['surveyQuestions'].controls[i].get("choices");
//     control.removeAt(ii);
//   }
//   public submitSurvey() {
//     this.loader = true;
//     this.ss.saveSurvey(this.surveyForm.value).subscribe(res => {
//       this.loader = false;
//       $('#submitModal').modal('show');
//       this.initForm();
//     },
//       err => {
//         this.loader = false;
//         this.router.navigate(['/error']);
//       })
//   }
//   // public onQuestionType(ev: any, form: any) {
//   //   if (ev == 3) {
//   //     // const control = <FormArray>form.controls['surveyQuestions'].controls[i].get("choices");
//   //     // control.setValidators(this.vs.minLengthArray(0));
//   //     // var l = control.length - 1;
//   //     // while (l >= 0) {
//   //     //   this.removeOptions(form, i, l);
//   //     //   l = l - 1;
//   //     // }
//   //     <FormGroup>form.removeControl("choices");
//   //   }
//   //   else {
//   //     // const control = <FormArray>form.controls['surveyQuestions'].controls[i].get("choices");
//   //     // control.setValidators(this.vs.minLengthArray(2));
//   //   }
//   // }
// }
//# sourceMappingURL=add.js.map