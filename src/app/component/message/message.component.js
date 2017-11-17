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
var message_service_1 = require("../../providers/message.service");
var forms_1 = require("@angular/forms");
var common_service_1 = require("../../providers/common.service");
var router_1 = require("@angular/router");
var loaderstop_service_1 = require("../../providers/loaderstop.service");
var MessageComponent = /** @class */ (function () {
    function MessageComponent(ms, cs, router, ls) {
        this.ms = ms;
        this.cs = cs;
        this.router = router;
        this.ls = ls;
        this.fileUrl = "";
        this.currentPage = 1; //For recipients
        this.noMore = false;
        this.currentMessagePage = 1; //For Messages
        this.noMoreMessages = false;
        this.emptyOldRecipient = false;
        this.emptyOldMessages = false;
        this.emptySearchResult = false;
        this.loader = true;
        this.loader1 = true;
        this.closed = false;
        this.selcate = -1;
        this.standard = "-1";
        this.standardLoader = false;
        this.studentLoader = false;
        this.categoryLoder = false;
        this.submitProgress = false;
    }
    MessageComponent.prototype.ngOnInit = function () {
        this.currentUser = localStorage.getItem("name");
        this.fileUrl = localStorage.getItem("fileUrl") + "/";
        this.getMessages();
        this.initForm();
        this.initnewMessageForm();
        this.getStandards();
        this.pictureForm = new forms_1.FormGroup({});
    };
    MessageComponent.prototype.ngOnDestroy = function () {
        this.ls.setLoader(true);
    };
    MessageComponent.prototype.ngAfterViewInit = function () {
    };
    //Old Messages
    MessageComponent.prototype.getMessages = function () {
        var _this = this;
        this.loader1 = true;
        this.ms.getAllMessages(this.currentPage).subscribe(function (res) {
            if (res.status == 204) {
                _this.oldMessageRecipients = [];
                _this.emptyOldRecipient = true;
                _this.loader1 = false;
                return;
            }
            _this.loader1 = false;
            _this.emptyOldRecipient = false;
            _this.oldMessageRecipients = res;
            _this.oldMessageRecipientsCOPY = _this.oldMessageRecipients;
            _this.selectOldRecipient(_this.oldMessageRecipients[0], 0);
            if (_this.oldMessageRecipients.length < 12) {
                _this.noMore = true;
            }
            else {
                _this.noMore = false;
            }
        }, function (err) {
            _this.errPage();
        });
        this.loader = false;
    };
    MessageComponent.prototype.selectstudent = function (a) {
        this.selectedStudent = this.students.find(function (student) { return student.id === a; });
    };
    MessageComponent.prototype.initForm = function () {
        this.messageForm = new forms_1.FormGroup({
            message: new forms_1.FormControl('', [forms_1.Validators.required]),
        });
    };
    MessageComponent.prototype.selectOldRecipient = function (r, i) {
        this.initForm();
        this.currentMessagePage = 1;
        this.selectedIndex = i;
        this.selectedId = r.id; //for submit
        if (r.againstParentName != null)
            this.recipientName = r.againstParentName;
        else
            this.recipientName = r.firstMessage.parentName;
        if (r.isClosed)
            this.closed = true;
        else
            this.closed = false;
        this.getSelectedMessage(this.selectedId);
    };
    MessageComponent.prototype.getSelectedMessage = function (id) {
        var _this = this;
        this.loader = true;
        var oldMessages;
        oldMessages = this.selectedOldRecipient;
        this.ms.getMessage(id, this.currentMessagePage).subscribe(function (res) {
            if (res.status == 204) {
                _this.selectedOldRecipient = [];
                _this.emptyOldMessages = true;
                $("#noMessageModal").modal('show');
                _this.currentMessagePage -= 1;
                _this.getSelectedMessage(_this.selectedId);
                _this.loader = false;
                return;
            }
            _this.selectedOldRecipient = res;
            _this.emptyOldMessages = false;
            // For Old Messages
            if (_this.selectedOldRecipient.length < 6 && _this.currentMessagePage != 1) {
                _this.noMoreMessages = true;
                _this.selectedOldRecipient = oldMessages.concat(_this.selectedOldRecipient);
            }
            if (_this.selectedOldRecipient.length < 12) {
                _this.noMoreMessages = true;
            }
            else {
                _this.noMoreMessages = false;
                // this.selectedOldRecipient = res;
            }
            //For New Messages
            _this.loader = false;
        }, function (err) {
            _this.loader = false;
            _this.errPage();
        });
    };
    MessageComponent.prototype.loadOldMessages = function () {
        // delete this.selectedOldRecipient;
        this.currentMessagePage += 1;
        this.getSelectedMessage(this.selectedId);
    };
    MessageComponent.prototype.loadNewMessages = function () {
        // delete this.selectedOldRecipient;
        this.currentMessagePage -= 1;
        this.getSelectedMessage(this.selectedId);
    };
    MessageComponent.prototype.previousPage = function () {
        delete this.oldMessageRecipients;
        this.currentPage -= 1;
        this.getMessages();
    };
    MessageComponent.prototype.nextPage = function () {
        delete this.oldMessageRecipients;
        this.currentPage += 1;
        this.getMessages();
    };
    MessageComponent.prototype.searchMessages = function (ev) {
        this.oldMessageRecipients = this.oldMessageRecipientsCOPY;
        var val = ev.target.value;
        if (val && val.trim() != '') {
            this.emptySearchResult = false;
            this.oldMessageRecipients = this.oldMessageRecipientsCOPY.filter(function (item) {
                console.log(item);
                return (item.title.toLowerCase().indexOf(val.toLowerCase()) > -1 || item.firstMessage.message.toLowerCase().indexOf(val.toLowerCase()) > -1 || item.firstMessage.parentName.toLowerCase().indexOf(val.toLowerCase()) > -1);
            });
            if (this.oldMessageRecipients.length === 0)
                this.emptySearchResult = true;
            else
                this.emptySearchResult = false;
        }
    };
    MessageComponent.prototype.getFile = function (event) {
        var ext = event.srcElement.files[0];
        var reader = new FileReader();
        if (ext.type == "image/png" || ext.type == "image/jpeg" || ext.type == "image/jpg") {
            this.file = event.srcElement.files[0];
        }
        else {
            $('#errorModal').modal('show');
            // this.newMessageForm.controls['file'].reset();      
        }
        reader.onload = function (e) {
            $('#getFileModal').modal('show'); //file upload modal   
            $('#img33')
                .attr('src', e.target.result);
        };
        // var blob = event.srcElement.files[0];
        // if(blob.type=="image/png" || blob.type=="image/jpeg" || blob.type=="image/jpg"){
        //   this.file = event.srcElement.files[0];
        // }
        // else{
        //    $('#errorModal').modal('show');
        //   this.circular.controls['file'].reset();
        // }
        reader.readAsDataURL(event.srcElement.files[0]);
    };
    MessageComponent.prototype.submitMessageForm = function () {
        var _this = this;
        this.submitProgress = true;
        this.ms.conversationComment(this.selectedId, this.messageForm.value).subscribe(function (res) {
            _this.currentMessagePage = 1;
            _this.messageForm.value['employeeName'] = _this.currentUser;
            _this.messageForm.value['createdAt'] = new Date();
            _this.messageForm.value['employeePicTimestamp'] = localStorage.getItem("picTimestamp");
            _this.selectedOldRecipient.unshift(_this.messageForm.value);
            _this.initForm();
            _this.submitProgress = false;
        }, function (er) {
            _this.errPage();
        });
    };
    MessageComponent.prototype.submitFormWithPicture = function () {
        var _this = this;
        this.submitProgress = true;
        var formData = new FormData();
        formData.append('file', this.file);
        this.ms.conversationCommentWithPicture(this.selectedId, formData).subscribe(function (res) {
            _this.currentMessagePage = 1;
            _this.getSelectedMessage(_this.selectedId);
            _this.file = null;
            _this.submitProgress = false;
        }, function (er) {
            _this.errPage();
        });
    };
    MessageComponent.prototype.closeConversation = function () {
        var _this = this;
        this.loader = true;
        this.ms.closeConversation(this.selectedId).subscribe(function (res) {
            _this.closed = true;
            _this.oldMessageRecipients[_this.selectedIndex].isClosed = true;
        }, function (err) {
            _this.errPage();
        });
        this.loader = false;
    };
    //New Message
    MessageComponent.prototype.newMessage = function () {
        this.selectedOldRecipient = null;
        // this.createMessage = true;
        this.newMsg = true;
        // this.selectedRecipient = null;
        this.initnewMessageForm();
        // this.getStandards();
    };
    MessageComponent.prototype.initnewMessageForm = function () {
        this.standard = -1;
        this.categories = null;
        this.students = null;
        this.newMessageForm = new forms_1.FormGroup({
            // standards: new FormControl('', Validators.required),
            title: new forms_1.FormControl('', [forms_1.Validators.required]),
            message: new forms_1.FormControl('', [forms_1.Validators.required]),
            categoryId: new forms_1.FormControl('', [forms_1.Validators.required]),
        });
    };
    MessageComponent.prototype.getStandards = function () {
        var _this = this;
        this.standardLoader = true;
        this.ms.getStandards().subscribe(function (res) {
            if (res.status === 204) {
                _this.standardsArray = null;
                _this.standardLoader = false;
                return;
            }
            _this.standardLoader = false;
            _this.standardsArray = res;
        }, function (err) {
            _this.errPage();
        });
    };
    MessageComponent.prototype.onStandard = function (ev) {
        var _this = this;
        this.studentLoader = true;
        this.categoryLoder = true;
        this.ms.getMessageCategory(ev).subscribe(function (res) {
            if (res.status === 204) {
                _this.categoryLoder = false;
                _this.studentLoader = false;
                _this.categories = null;
                _this.students = null;
                return;
            }
            _this.students = res.students;
            _this.students.splice(0, 0, { id: -1, name: 'Select Student' });
            _this.selectstudent(-1);
            _this.categories = res.categories;
            _this.categories.splice(0, 0, { id: -1, name: 'Select Category' });
            _this.categoryLoder = false;
            _this.studentLoader = false;
        }, function (err) {
            _this.errPage();
        });
    };
    MessageComponent.prototype.submitNewMessage = function () {
        var _this = this;
        this.loader = true;
        var temp = {
            againstParentId: this.selectedStudent.parentId,
            againstStudentId: this.selectedStudent.id,
        };
        temp = Object.assign(temp, this.newMessageForm.value);
        this.ms.newConversation(temp).subscribe(function (res) {
            _this.getMessages();
            $("#submitModal").modal('show');
            _this.initnewMessageForm();
        }, function (err) {
            _this.errPage();
        });
        this.loader = false;
    };
    MessageComponent.prototype.errPage = function () {
        this.loader = false;
        this.router.navigate(['/error']);
    };
    MessageComponent = __decorate([
        core_1.Component({
            selector: 'message',
            templateUrl: './message.component.html',
            styleUrls: ['./message.component.css'],
        }),
        __metadata("design:paramtypes", [message_service_1.MessageService,
            common_service_1.CommonService,
            router_1.Router,
            loaderstop_service_1.LoaderStop])
    ], MessageComponent);
    return MessageComponent;
}());
exports.MessageComponent = MessageComponent;
//# sourceMappingURL=message.component.js.map