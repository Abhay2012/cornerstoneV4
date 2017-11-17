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
var homework_service_1 = require("../../../providers/homework.service");
var common_1 = require("@angular/common");
var common_service_1 = require("../../../providers/common.service");
var router_1 = require("@angular/router");
var HomeworkAddComponent = /** @class */ (function () {
    function HomeworkAddComponent(homeworkService, commonService, _location, router) {
        this.homeworkService = homeworkService;
        this.commonService = commonService;
        this._location = _location;
        this.router = router;
        this.title = "New Homework";
        this.submitProgress = false;
        this.standards = [];
        this.subjects = [];
        this.noOfFiles = 0;
        this.emptySubjects = true;
        this.loader = false;
        this.standardLoader = false;
        this.subjectLoader = false;
        this.maxfile = false;
        this.file = [];
    }
    HomeworkAddComponent.prototype.ngOnInit = function () {
        this.initForm();
        this.getStandards();
    };
    HomeworkAddComponent.prototype.getFile = function (event) {
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
    HomeworkAddComponent.prototype.removeFile = function (f) {
        var index = this.file.indexOf(f);
        this.file.splice(index, 1);
        var noOfFiles = this.file.length;
        if (noOfFiles <= 5) {
            this.maxfile = false;
        }
        this.noOfFiles = noOfFiles;
    };
    HomeworkAddComponent.prototype.onDueDate = function (e) {
        if (new Date(e.target.value) < new Date(new Date().getFullYear(), new Date().getMonth(), new Date().getDate())) {
            alert("Please choose an upcoming date from the calendar.");
            this.homework.controls['dueDate'].patchValue(this.commonService.getTomorrow());
        }
    };
    HomeworkAddComponent.prototype.initForm = function () {
        this.homework = new forms_1.FormGroup({
            description: new forms_1.FormControl('', [forms_1.Validators.required]),
            standardId: new forms_1.FormControl('', [forms_1.Validators.required]),
            subjectId: new forms_1.FormControl('', [forms_1.Validators.required]),
            dueDate: new forms_1.FormControl(this.commonService.getTomorrow(), [forms_1.Validators.required]),
            file: new forms_1.FormControl('')
        });
    };
    HomeworkAddComponent.prototype.getSubjects = function (a) {
        var _this = this;
        this.subjectLoader = true;
        this.subjects = [];
        this.homework.controls["subjectId"].reset();
        this.homeworkService.getSubjects(a).subscribe(function (res) {
            if (res.status == 204) {
                _this.emptySubjects = true;
                _this.subjects = [];
                _this.standardLoader = false;
                return;
            }
            _this.emptySubjects = false;
            _this.subjects = res;
            _this.subjectLoader = false;
        }, function (err) {
            _this.router.navigate(['/error']);
        });
    };
    HomeworkAddComponent.prototype.getStandards = function () {
        var _this = this;
        this.standardLoader = true;
        this.homeworkService.getStandards().subscribe(function (res) {
            _this.standards = res;
            _this.commonService.storeData("standards", res);
            _this.standardLoader = false;
        }, function (err) {
            _this.router.navigate(['/error']);
        });
    };
    HomeworkAddComponent.prototype.submitHomework = function () {
        this.submitProgress = true;
        var formData = new FormData();
        formData.append('description', this.homework.value['description']);
        formData.append('standardId', this.homework.value['standardId']);
        formData.append('subjectId', this.homework.value['subjectId']);
        formData.append('dueDate', this.homework.value['dueDate']);
        for (var i = 0; i < this.file.length; i++) {
            formData.append('files', this.file[i]);
        }
        console.log(formData);
        this.saveHomework(formData);
        // this.submitProgress = false;
    };
    // public presentActionSheet() {
    //   let actionSheet = this.actionSheetCtrl.create({
    //     title: 'Are you sure you want to submit?',
    //     buttons: [{
    //       text: 'YES',
    //       role: 'submit',
    //       handler: () => {
    //         this.saveHomework();
    //       }
    //     }, {
    //       text: 'CANCEL',
    //       role: 'cancel',
    //       handler: () => {
    //       }
    //     }]
    //   });
    //   actionSheet.present();
    // }
    HomeworkAddComponent.prototype.saveHomework = function (formData) {
        var _this = this;
        this.submitProgress = true;
        this.homeworkService.PostHomework(formData).subscribe(function (data) {
            _this.initForm();
            _this.submitProgress = false;
            $('#homeworkModal').modal('show');
        }, function (err) {
            // this.submitProgress = false;
            _this.router.navigate(['/error']);
        });
        this.file = null;
    };
    HomeworkAddComponent = __decorate([
        core_1.Component({
            selector: 'homework-add',
            templateUrl: './add.html',
        }),
        __metadata("design:paramtypes", [homework_service_1.HomeworkService,
            common_service_1.CommonService,
            common_1.Location,
            router_1.Router])
    ], HomeworkAddComponent);
    return HomeworkAddComponent;
}());
exports.HomeworkAddComponent = HomeworkAddComponent;
//# sourceMappingURL=add.js.map