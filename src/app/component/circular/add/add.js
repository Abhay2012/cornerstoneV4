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
var circular_service_1 = require("../../../providers/circular.service");
var common_service_1 = require("../../../providers/common.service");
var common_1 = require("@angular/common");
var router_1 = require("@angular/router");
var AddCircular = /** @class */ (function () {
    function AddCircular(circserv, commonService, _location, router) {
        this.circserv = circserv;
        this.commonService = commonService;
        this._location = _location;
        this.router = router;
        this.title = 'Add Circular';
        this.maxfile = false;
        this.buttonlabel = 'Select Standard';
        this.emptyStandards = false;
        this.file = [];
        this.loader = false;
        this.submitProgress = false;
        this.standardLoader = false;
        this.audienceLoader = false;
        this.noOfFiles = 0;
        this.stdIds = [];
    }
    AddCircular.prototype.ngOnInit = function () {
        this.circular = this.initForm();
        this.todayDate = new Date("DD MMM YYYY");
    };
    AddCircular.prototype.onDueDate = function (e) {
        if (new Date(e.target.value) < new Date(new Date().getFullYear(), new Date().getMonth(), new Date().getDate())) {
            alert("Please choose an upcoming date from the calendar.");
            this.circular.controls['date'].patchValue(this.commonService.getTomorrow());
        }
    };
    AddCircular.prototype.ngAfterViewInit = function () {
        this.getCircularInfo();
        this.getStandards();
    };
    AddCircular.prototype.initForm = function () {
        return new forms_1.FormGroup({
            title: new forms_1.FormControl('', [forms_1.Validators.required]),
            description: new forms_1.FormControl('', [forms_1.Validators.required]),
            date: new forms_1.FormControl(this.commonService.getTomorrow(), [forms_1.Validators.required]),
            circularTypeId: new forms_1.FormControl('', [forms_1.Validators.required]),
            files: new forms_1.FormControl('')
            // standardIds: new FormControl([], [Validators.required])
        });
    };
    // public getStandards() {
    //   this.loader = true;
    //   this.standards = this.commonService.getData("standards");
    //   if (typeof (this.standards) === 'undefined') {
    //     this._getStandards();
    //   }
    //   this.loader = false;
    // }
    AddCircular.prototype.getStandards = function () {
        var _this = this;
        this.standardLoader = true;
        this.circserv.getStandards().subscribe(function (res) {
            if (res.status === 204) {
                _this.standardLoader = false;
                _this.standards = null;
                _this.loader = false;
                return;
            }
            _this.standards = res;
            _this.commonService.storeData("standards", res);
            _this.standardLoader = false;
        }, function (err) {
            _this.loader = false;
            _this.router.navigate(['/error']);
        });
    };
    // public getCircularInfo() {
    //   this.loader = true;
    //   let circularInfo = this.commonService.getData("circularInfo");
    //   if (typeof (circularInfo) == "undefined") {
    //     this._getCircularInfo();
    //     this.loader = false;
    //   } else {
    //     this.buildCircularData(circularInfo);
    //     this.loader = false;
    //   }
    // }
    AddCircular.prototype.getCircularInfo = function () {
        var _this = this;
        this.loader = true;
        this.audienceLoader = true;
        this.commonService.getCircularInfo().subscribe(function (res) {
            _this.audienceLoader = false;
            _this.buildCircularData(res);
            _this.commonService.storeData("circularInfo", res);
            _this.loader = false;
        }, function (err) {
            _this.loader = false;
            _this.router.navigate(['/error']);
        });
    };
    AddCircular.prototype.check = function (a) {
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
    AddCircular.prototype.buildCircularData = function (circular) {
        this.circularType = circular;
    };
    AddCircular.prototype.onCircularType = function (event) {
        if (event == "1") {
            this.circular.removeControl("standardIds");
            this.standard = [];
            this.emptyStandards = true;
        }
        else if (event == "2") {
            this.circular.addControl("standardIds", new forms_1.FormControl('', [forms_1.Validators.required]));
            this.emptyStandards = false;
        }
        // this.circular.controls['standardIds'].reset();
    };
    AddCircular.prototype.circularSubmit = function () {
        this.submitProgress = true;
        var formData = new FormData();
        console.log(formData);
        formData.append('title', this.circular.value['title']);
        formData.append('description', this.circular.value['description']);
        formData.append('circularTypeId', this.circular.value['circularTypeId']);
        if (!this.emptyStandards) {
            formData.append('standardIds', this.circular.value['standardIds']);
        }
        formData.append('date', this.circular.value['date']);
        for (var i = 0; i < this.file.length; i++) {
            formData.append('files', this.file[i]);
        }
        this.onSubmit(formData);
        console.log(formData);
        // this.submitProgress = false;
    };
    AddCircular.prototype.selectStandards = function (a, e) {
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
        this.circular.controls['standardIds'].patchValue(this.stdIds);
        console.log(this.stdIds);
    };
    AddCircular.prototype.onSubmit = function (formData) {
        var _this = this;
        this.submitProgress = true;
        console.log(formData);
        this.circserv.PostCircular(formData).subscribe(function (data) {
            _this.submitProgress = false;
            _this.circular = _this.initForm();
            _this.loader = false;
            $('#circularModal').modal('show');
        }, function (err) {
            _this.loader = false;
            _this.router.navigate(['/error']);
        });
        this.file = null;
    };
    AddCircular.prototype.getFile = function (event) {
        var noOfFiles = this.file.length;
        console.log(noOfFiles);
        // if(event.srcElement.files.length<=5 && noOfFiles<=5){
        //   this.maxfile = false;
        for (var i = 0; i < event.srcElement.files.length; i++) {
            var blob = event.srcElement.files[i];
            // if(blob.type=="image/png" || blob.type=="image/jpeg" || blob.type=="image/jpg"){
            this.file[i + noOfFiles] = event.srcElement.files[i];
            // }
            // else{
            //   $('#errorModal').modal('show');
            //   this.circular.controls['files'].reset();
            //  }
        }
        // }
        noOfFiles = this.file.length;
        if (noOfFiles > 5) {
            this.maxfile = true;
        }
        else {
            this.maxfile = false;
        }
        this.noOfFiles = noOfFiles;
        console.log(this.file);
    };
    AddCircular.prototype.removeFile = function (f) {
        var index = this.file.indexOf(f);
        this.file.splice(index, 1);
        var noOfFiles = this.file.length;
        if (noOfFiles <= 5) {
            this.maxfile = false;
        }
        this.noOfFiles = noOfFiles;
    };
    AddCircular = __decorate([
        core_1.Component({
            selector: 'add-circular',
            styleUrls: ['./add.css'],
            templateUrl: './add.html'
        }),
        __metadata("design:paramtypes", [circular_service_1.CircularService,
            common_service_1.CommonService,
            common_1.Location,
            router_1.Router])
    ], AddCircular);
    return AddCircular;
}());
exports.AddCircular = AddCircular;
//# sourceMappingURL=add.js.map