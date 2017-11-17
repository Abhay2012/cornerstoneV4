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
var poll_service_1 = require("../../../providers/poll.service");
var common_1 = require("@angular/common");
var router_1 = require("@angular/router");
var AddPollComponent = /** @class */ (function () {
    function AddPollComponent(fb, cs, ps, router, _location) {
        this.fb = fb;
        this.cs = cs;
        this.ps = ps;
        this.router = router;
        this._location = _location;
        this.buttonlabel = 'Select Standard';
        // public disable: boolean = false;
        this.loader = false;
        this.submitProgress = false;
        this.standardLoader = false;
        this.infoLoader = false;
        this.pollType = [];
        this.pollOptionType = [];
        this.questype = -1;
        this.auditype = -1;
        this.stdIds = [];
    }
    AddPollComponent.prototype.ngOnInit = function () {
        this.getPollInfo();
        this.initForm();
        this.getStandards();
    };
    AddPollComponent.prototype.initForm = function () {
        this.addPollForm = this.fb.group({
            'question': ['', [forms_1.Validators.required]],
            'typeId': ['', [forms_1.Validators.required]],
            'expiredAt': [this.cs.getTomorrow(), [forms_1.Validators.required]],
            'optionTypeId': ['', [forms_1.Validators.required]],
            // 'standardIds': ['',[Validators.required]],
            'subOptions': this.fb.array([
                this.initOptions(),
                this.initOptions(),
            ], forms_1.Validators.minLength(2)),
        });
    };
    AddPollComponent.prototype.check = function (a) {
        if (a.checked == true) {
            return true;
        }
        else {
            if (this.buttonlabel.indexOf(a.name) >= 0) {
                return true;
            }
            return false;
        }
    };
    AddPollComponent.prototype.setDefault = function () {
        this.buttonlabel = "Select Standard";
        this.getStandards();
    };
    AddPollComponent.prototype.getStandards = function () {
        var _this = this;
        this.standardLoader = true;
        this.ps.getStandards().subscribe(function (res) {
            _this.standardLoader = false;
            _this.standards = res;
        }, function (err) {
            _this.router.navigate(['/error']);
        });
    };
    AddPollComponent.prototype.getPollInfo = function () {
        var _this = this;
        this.infoLoader = true;
        this.cs.getPollInfo().subscribe(function (res) {
            _this.pollInfo = res;
            _this.pollType = _this.pollInfo.pollType;
            _this.pollOptionType = _this.pollInfo.pollOptionType;
            // this.pollOptionType.splice(0,0,{id : -1 , name : 'Select Question Type'});
            _this.infoLoader = false;
        }, function (err) {
            _this.router.navigate(['/error']);
        });
    };
    AddPollComponent.prototype.onTypeId = function (event) {
        if (event == "1") {
            this.addPollForm.removeControl("standardIds");
            this.selectedStandard = [];
            // this.disable = false;
        }
        else if (event == "2") {
            this.selectedStandard = [];
            // this.disable = true;
            this.addPollForm.addControl("standardIds", new forms_1.FormControl('', forms_1.Validators.required));
        }
    };
    AddPollComponent.prototype.selectStandards = function (a, e) {
        var _this = this;
        if (e == true) {
            this.stdIds.push(a.id);
            if (this.buttonlabel == 'Select Standard') {
                this.buttonlabel = ' ' + a.name;
            }
            else {
                this.buttonlabel += ' ' + a.name;
            }
        }
        else if (e == false) {
            var s = a.name;
            this.buttonlabel = this.buttonlabel.replace(' ' + s, '');
            console.log(this.buttonlabel);
            if (this.buttonlabel == '') {
                this.buttonlabel = 'Select Standard';
            }
            this.stdIds.forEach(function (element, index) {
                if (element == a.id) {
                    _this.stdIds.splice(index, 1);
                }
            });
        }
        this.addPollForm.controls['standardIds'].patchValue(this.stdIds);
        console.log(this.stdIds);
    };
    AddPollComponent.prototype.onStandards = function (ev) {
        // this.disable = false;
        var stan = ev;
        this.addPollForm.controls['standardIds'].patchValue(stan);
    };
    AddPollComponent.prototype.onDueDate = function (e) {
        if (new Date(e.target.value) < new Date(new Date().getFullYear(), new Date().getMonth(), new Date().getDate())) {
            $('#dateErrorModal').modal('show');
            this.addPollForm.controls['expiredAt'].patchValue(this.cs.getTomorrow());
        }
    };
    AddPollComponent.prototype.initOptions = function () {
        return this.fb.group({
            choice: ['', [forms_1.Validators.required]]
        });
    };
    AddPollComponent.prototype.addOptions = function (e) {
        var control = e.controls['subOptions'];
        control.push(this.initOptions());
    };
    AddPollComponent.prototype.removeOptions = function (form, index) {
        var control = form.controls['subOptions'];
        control.removeAt(index);
    };
    AddPollComponent.prototype.submitPoll = function (obj) {
        var _this = this;
        this.submitProgress = true;
        this.ps.createPoll(obj).subscribe(function (res) {
            _this.submitProgress = false;
            $('#submitModal').modal('show');
            _this.initForm();
        }, function (err) {
            _this.router.navigate(['/error']);
        });
    };
    AddPollComponent = __decorate([
        core_1.Component({
            selector: 'add-poll',
            templateUrl: './add.html',
            styleUrls: ['./add.css'],
        }),
        __metadata("design:paramtypes", [forms_1.FormBuilder,
            common_service_1.CommonService,
            poll_service_1.PollService,
            router_1.Router,
            common_1.Location])
    ], AddPollComponent);
    return AddPollComponent;
}());
exports.AddPollComponent = AddPollComponent;
//# sourceMappingURL=add.js.map