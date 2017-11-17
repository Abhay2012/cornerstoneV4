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
var event_service_1 = require("../../providers/event.service");
var loaderstop_service_1 = require("../../providers/loaderstop.service");
var common_service_1 = require("../../providers/common.service");
var moment_ = require("moment");
var http_1 = require("@angular/http");
var _ = require("jquery");
var router_1 = require("@angular/router");
var EventComponent = /** @class */ (function () {
    function EventComponent(eventService, http, ls, element, cs, router) {
        var _this = this;
        this.eventService = eventService;
        this.http = http;
        this.ls = ls;
        this.element = element;
        this.cs = cs;
        this.router = router;
        this.maxfile = false;
        this.buttonlabel = 'Select Standard';
        this.pageNo = 1;
        this.stdIds = [];
        this.loader = true;
        this.file = [];
        this.fileE = [];
        this.canadd = true;
        this.noOfFiles = 0;
        this.maxfileE = false;
        this.disable = false;
        this.standardId = [];
        this.standardLoader = false;
        this.plannerLoader = false;
        this.imgindex = 0;
        this.calendarOptions = {
            fixedWeekCount: false,
            editable: true,
            eventLimit: true,
            firstDay: 1,
            selectable: true,
            selectHeader: true,
            timeFormat: ' ',
            header: {
                right: 'today,month,listMonth, prev,next'
            },
            events: [],
            eventClick: function (event, jsEvent, view) {
                _this.selectedEvent = event;
                _this.imgindex = 0;
                _this.empId = event.employeeId;
                if (_this.empId == _this.id) {
                    _this.disable = false;
                }
                else {
                    _this.disable = true;
                }
                _this.editEvent = _this.editForm();
                _this.event = _this.initForm();
                _this.getEventById(event.id);
                $('#fullCalModal').modal();
            },
            select: function (start, end) {
                if (start.isBefore(moment_().subtract(1, "days"))) {
                    _('#calendar').fullCalendar('unselect');
                    $('#modal-unselect').modal();
                    return false;
                }
                else {
                    _this.event.reset;
                    _this.start = moment_(start).format('YYYY-MM-DD');
                    // var tomorrow = new Date(this.start);
                    // tomorrow.setDate(tomorrow.getDate() + 1);
                    _this.end = moment_(moment_(end).subtract(1, "days")).format('YYYY-MM-DD');
                    _this.event = _this.initForm();
                    $('#fullCalView').modal();
                }
            },
            dayRender: function (date, cell) {
                if (date.isBefore(moment_().subtract(1, "days"))) {
                    cell.css("background-color", "#fbfbfb");
                    // cell.css("color","grey");
                }
                else {
                    cell.css("cursor", "pointer");
                }
            },
            eventRender: function (event, element, view) {
                console.log("render : ");
                console.log(event);
                console.log(element);
                console.log(view);
                if (event.files) {
                    console.log("work");
                    $(element).find('span:first').prepend('<img style="width:100px;height:75px" src="https://www.googleapis.com/download/storage/v1/b/srgs-blr/o/' + event.files[0].fileTimestamp + '" />');
                    $(element).find('span:first').css({ 'width': '100px', 'height': '75px' });
                }
            },
            eventDrop: function (event, delta, revertFunc) {
                // var date = Date(); 
                // var day = date.getDate();
                // var month = date.getMonth();
                revertFunc();
                /*          console.log(event);
                          console.log(event.startDate);
                          
                          var n = event.startDate.lastIndexOf('-');
                          var day :string = event.startDate.substring(n+1);
                          console.log(day + )
                          var newday = parseInt(day) + delta._days;
                          console.log(" a " +  newday);
                          console.log(event.startDate.slice(0, n));
                          event.startDate = event.startDate.slice(0, n) +'-'+ newday;
                          
                          console.log(event.endDate);
                          console.log(delta);
                
                          n = event.endDate.lastIndexOf('-');
                          day = event.endDate.substring(n+1);
                          console.log(day + )
                          newday = parseInt(day) + delta._days;
                          event.endDate = event.startDate.slice(0, n) +'-'+ newday;
                
                          console.log(event.endDate);
                          console.log(event.startDate);
                          console.log( "tt" );
                          console.log( event);
                          if (!confirm("Are you sure about this change?")) {
                            revertFunc();
                          }
                          else{
                
                          }
                */
            },
            eventMouseover: function (calEvent, jsEvent) {
                var tooltip = '<div class="tooltipevent" style="width:100px;height:100px;background:#ccc;position:absolute;z-index:10001;padding:7px;color:black;font-weight:500;font-size:15px">Click to view, edit or delete the event</div>';
                $("body").append(tooltip);
                $(this).mouseover(function (e) {
                    $(this).css('z-index', 100);
                    $('.tooltipevent').fadeIn('500');
                    $('.tooltipevent').fadeTo('10', 1.9);
                }).mousemove(function (e) {
                    $('.tooltipevent').css('top', e.pageY + 10);
                    $('.tooltipevent').css('left', e.pageX + 20);
                });
            },
            eventMouseout: function (calEvent, jsEvent) {
                $(this).css('z-index', 8);
                $('.tooltipevent').remove();
            },
            viewRender: function (view, element) {
                var b = _('#calendar').fullCalendar('getDate');
                var check = moment_(b, 'YYYY/MM/DD');
                var month = check.format('MM');
                var year = check.format('YYYY');
                _this.eventMonth = year + "-" + month;
                _this.getEvents();
            },
        };
        //  
        this.getPlanner();
        this.getStandardId();
        this.ls.setLoader(false);
    }
    EventComponent.prototype.ngOnInit = function () {
        this.fileUrl = localStorage.getItem("fileUrl") + "/";
        this.id = localStorage.getItem("id");
        this.event = this.initForm();
    };
    EventComponent.prototype.ngOnDestroy = function () {
        this.ls.setLoader(true);
    };
    EventComponent.prototype.ngAfterViewInit = function () {
        _('#calendar').fullCalendar('renderEvents', this.calendarOptions.events, true);
    };
    EventComponent.prototype.initForm = function () {
        return new forms_1.FormGroup({
            title: new forms_1.FormControl('', [forms_1.Validators.required]),
            plannerTypeId: new forms_1.FormControl([], [forms_1.Validators.required]),
            startDate: new forms_1.FormControl(this.start, [forms_1.Validators.required]),
            endDate: new forms_1.FormControl(this.end, [forms_1.Validators.required]),
            location: new forms_1.FormControl('', [forms_1.Validators.maxLength(50)]),
            description: new forms_1.FormControl('', [forms_1.Validators.maxLength(2500)]),
            files: new forms_1.FormControl('')
        });
    };
    EventComponent.prototype.createFormData = function () {
        var eventformData = new FormData();
        eventformData.append('title', this.event.value.title);
        eventformData.append('plannerTypeId', this.event.value.plannerTypeId);
        eventformData.append('startDate', this.event.value.startDate);
        eventformData.append('endDate', this.event.value.endDate);
        eventformData.append('location', this.event.value.location);
        eventformData.append('description', this.event.value.description);
        if (this.event.value.startTime) {
            eventformData.append('startTime', this.event.value.startTime);
        }
        if (this.event.value.endTime) {
            eventformData.append('endTime', this.event.value.endTime);
        }
        for (var i = 0; i < this.file.length; i++) {
            eventformData.append('files', this.file[i]);
        }
        this.postEvent(eventformData);
    };
    EventComponent.prototype.editForm = function () {
        this.selectedEvent.startTime = (moment_(this.selectedEvent.startTime, 'hh-mm a').format('HH:mm'));
        this.selectedEvent.endTime = (moment_(this.selectedEvent.endTime, 'hh-mm a').format('HH:mm'));
        console.log(this.selectedEvent.startTime);
        return new forms_1.FormGroup({
            title: new forms_1.FormControl(this.selectedEvent.title),
            startDate: new forms_1.FormControl(this.selectedEvent.startDate),
            endDate: new forms_1.FormControl(this.selectedEvent.endDate),
            startTime: new forms_1.FormControl(this.selectedEvent.startTime),
            endTime: new forms_1.FormControl(this.selectedEvent.endTime),
            location: new forms_1.FormControl(this.selectedEvent.location, [forms_1.Validators.maxLength(50)]),
            description: new forms_1.FormControl(this.selectedEvent.description, [forms_1.Validators.maxLength(2500)]),
        });
    };
    //   public editFormData(){
    //   var editformData = new FormData();
    //   editformData.append('title',this.event.value.title);
    //   editformData.append('plannerTypeId',this.event.value.plannerTypeId);
    //   editformData.append('startDate',this.event.value.startDate);
    //   editformData.append('endDate',this.event.value.endDate);
    //   editformData.append('location',this.event.value.location);
    //   editformData.append('description',this.event.value.description);
    //   if(this.event.value.startTime){
    //     editformData.append('startTime',this.event.value.startTime);
    //   }
    //   if(this.event.value.endTime){
    //     editformData.append('endTime',this.event.value.endTime);
    //   }
    //   for(let i=0; i<this.fileE.length;i++){
    //     editformData.append('files', this.fileE[i]);  
    //   }
    //   this.updateEvent(editformData); 
    // }
    EventComponent.prototype.selectPlannerType = function (type) {
        if (type == 2) {
            this.event.addControl("standardIds", new forms_1.FormControl('', [forms_1.Validators.required]));
        }
        else if (type != 2) {
            this.event.removeControl("standardIds");
            // this.standard = [];
        }
        if (type == 3 || type == 4) {
            this.event.removeControl("startTime");
            this.event.removeControl("endTime");
        }
        else if ((type != 3) || (type != 4)) {
            this.event.addControl("startTime", new forms_1.FormControl('', [forms_1.Validators.required]));
            this.event.addControl("endTime", new forms_1.FormControl('', [forms_1.Validators.required]));
        }
        this.start = "00:00";
        this.end = "00:00";
    };
    EventComponent.prototype.startT = function (e) {
        this.startTime = e;
        this.event.controls['startTime'].patchValue(e);
        if ((this.event.controls['startDate'].value) == (this.event.controls['endDate'].value)) {
            if (this.endTime < this.startTime) {
                this.message = "Please choose start time less than end time";
                $('#modal-success').modal('show');
                this.event.controls['startTime'].patchValue("");
                this.event.controls['endTime'].patchValue("");
                $("input[type=time]").val("");
                this.startTime = null;
                this.endTime = null;
            }
        }
    };
    EventComponent.prototype.endT = function (e) {
        this.endTime = e;
        this.event.controls['endTime'].patchValue(e);
        if ((this.event.controls['startDate'].value) == (this.event.controls['endDate'].value)) {
            if (this.endTime < this.startTime) {
                this.message = "Please choose end time greater than start time";
                $('#modal-success').modal('show');
                // this.event.controls['startTime'].patchValue("")    
                $("input[type=time]").val("");
                this.event.controls['startTime'].patchValue("");
                this.event.controls['endTime'].patchValue("");
                this.startTime = null;
                this.endTime = null;
            }
        }
        // this.endTime=null;
    };
    EventComponent.prototype.getEvents = function () {
        var _this = this;
        console.log("getting events....");
        this.eventService.GetEvents(this.eventMonth).subscribe(function (res) {
            if (res.status === 204) {
                _this.emptyEvent = true;
                _this.loader = false;
            }
            else {
                _this.loader = false;
                _this.newEvents = res;
                console.log(_this.newEvents);
                _('#calendar').fullCalendar('removeEvents');
                _('#calendar').fullCalendar('addEventSource', _this.newEvents);
            }
        }, function (err) {
        });
    };
    // public startTi:any;
    // public endTi:any;
    EventComponent.prototype.getEventById = function (id) {
        var _this = this;
        this.eventService.GetEventById(id).subscribe(function (res) {
            _this.eventsInfo = res;
            console.log(_this.eventsInfo);
            $('#fullCalModal').modal('show');
            // this.startTime = moment_(this.eventsInfo.start).format('HH-MM-SS-A');
            //  this.endTime = moment_(this.eventsInfo.end).format('HH-MM-SS-A');
            _this.startTime = _this.eventsInfo.startTime;
            _this.endTime = _this.eventsInfo.endTime;
            // this.startTime=this.eventsInfo.startTime;
            // this.endTime=this.eventsInfo.endTime;
        });
    };
    EventComponent.prototype.getPlanner = function () {
        var _this = this;
        this.plannerLoader = true;
        this.eventService.GetPlanner().subscribe(function (res) {
            _this.plannerLoader = false;
            _this.planner = res;
            _this.loader = false;
        }, function (err) {
            _this.router.navigate(['/error']);
        });
    };
    EventComponent.prototype.getStandardId = function () {
        var _this = this;
        this.standardLoader = true;
        this.eventService.getStandards().subscribe(function (res) {
            _this.standardLoader = false;
            _this.standard = res;
        }, function (err) {
            _this.router.navigate(['/error']);
        });
    };
    EventComponent.prototype.postEvent = function (formdata) {
        var _this = this;
        this.loader = true;
        console.log(formdata);
        this.eventService.postEvent(formdata).subscribe(function (res) {
            _this.loader = false;
            _this.message = "You have successfully added an event";
            $('#modal-success').modal();
            // $('#message').html(this.eventsInfo.eventTitle);       
            _this.getEvents();
        }, function (err) {
            _this.router.navigate(['/error']);
        });
    };
    EventComponent.prototype.deleteEvent = function () {
        var _this = this;
        this.loader = true;
        this.eventService.deleteEvent(this.eventsInfo.id).subscribe(function (res) {
            _this.loader = false;
            _this.message = "You have successfully deleted the event";
            $('#modal-success').modal('show');
            _this.getEvents();
        }, function (err) {
            _this.router.navigate(['/error']);
        });
    };
    EventComponent.prototype.updateEvent = function () {
        var _this = this;
        console.log("upating");
        this.loader = true;
        console.log(this.eventsInfo.id);
        console.log(this.editEvent);
        this.eventService.updateEvent(this.eventsInfo.id, this.editEvent.value).subscribe(function (res) {
            _this.loader = false;
            _this.newEvents = res;
            console.log("upating1");
            _this.message = "You have successfully updated the event";
            $('#modal-success').modal('show');
            _this.getEvents();
        }, function (err) {
            console.log("upatingerr");
            _this.loader = false;
        });
    };
    EventComponent.prototype.selectStandards = function (a, e) {
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
        this.event.controls['standardIds'].patchValue(this.stdIds);
        console.log(this.stdIds);
    };
    EventComponent.prototype.onDueDate = function (e) {
        this.currentDate = e.target.value;
        if (new Date(e.target.value) < new Date(new Date().getFullYear(), new Date().getMonth(), new Date().getDate())) {
            this.message = "Please choose an upcoming date from the calendar";
            $('#modal-success').modal('show');
            this.event.controls['startDate'].patchValue(this.start);
            this.event.controls['endDate'].patchValue(this.start);
        }
        if (new Date(e.target.value) > new Date(this.event.controls['endDate'].value)) {
            this.message = "Please choose date before end date from the calendar";
            $('#modal-success').modal('show');
            this.event.controls['startDate'].patchValue(this.start);
        }
        this.startT(this.startTime);
        this.endT(this.endTime);
    };
    EventComponent.prototype.checkDate = function (e) {
        if (new Date(e.target.value) < new Date(this.event.controls['startDate'].value)) {
            this.message = "Please choose a date after start date";
            $('#modal-success').modal('show');
            this.event.controls['endDate'].patchValue(this.start);
        }
        this.startT(this.startTime);
        this.endT(this.endTime);
    };
    EventComponent.prototype.checkcheckedbox = function (a) {
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
    EventComponent.prototype.onStartDate = function (e) {
        if (new Date(e.target.value) < new Date(new Date().getFullYear(), new Date().getMonth(), new Date().getDate())) {
            this.message = "Please choose an upcoming date from the calendar";
            $('#modal-success').modal('show');
            this.editEvent.controls['startDate'].patchValue(this.selectedEvent.startDate);
            this.editEvent.controls['endDate'].patchValue(this.selectedEvent.startDate);
        }
        if (new Date(e.target.value) > new Date(this.editEvent.controls['endDate'].value)) {
            this.message = "Please choose date before end date from the calendar";
            $('#modal-success').modal('show');
            this.editEvent.controls['startDate'].patchValue(this.selectedEvent.startDate);
            this.checkStart(this.startTime);
            this.checkEnd(this.endTime);
        }
    };
    EventComponent.prototype.check = function (e) {
        if (new Date(e.target.value) < new Date(this.editEvent.controls['startDate'].value)) {
            this.message = "Please choose a date after start date";
            $('#modal-success').modal('show');
            this.editEvent.controls['endDate'].patchValue(this.selectedEvent.startDate);
        }
        this.checkStart(this.startTime);
        this.checkEnd(this.endTime);
    };
    EventComponent.prototype.checkStart = function (e) {
        this.startTime = e;
        console.log(e);
        if ((this.editEvent.controls['startDate'].value) == (this.editEvent.controls['endDate'].value)) {
            if (this.endTime < this.startTime) {
                this.message = "Please choose start time less than end time";
                $('#modal-success').modal('show');
                this.editEvent.controls['startTime'].patchValue("");
                this.editEvent.controls['endTime'].patchValue("");
                $("input[type=time]").val("");
                this.startTime = null;
                this.endTime = null;
            }
        }
    };
    EventComponent.prototype.checkEnd = function (e) {
        this.endTime = e;
        // this.editEvent.controls['endTime'].patchValue(e);
        if ((this.editEvent.controls['startDate'].value) == (this.editEvent.controls['endDate'].value)) {
            if (this.endTime < this.startTime) {
                this.message = "Please choose end time greater than start time";
                $('#modal-success').modal('show');
                this.event.controls['startTime'].patchValue("");
                this.editEvent.controls['startTime'].patchValue("");
                this.editEvent.controls['endTime'].patchValue("");
                $("input[type=time]").val("");
                this.startTime = null;
                this.endTime = null;
            }
        }
    };
    EventComponent.prototype.resetForm = function () {
        console.log(this.selectedEvent);
        this.editEvent.patchValue({ "title": this.selectedEvent.title });
        this.editEvent.patchValue({ "startdate": this.selectedEvent.startDate });
        this.editEvent.patchValue({ "endDate": this.selectedEvent.endDate });
        this.editEvent.patchValue({ "startTime": this.selectedEvent.startTime });
        this.editEvent.patchValue({ "endTime": this.selectedEvent.endTime });
        this.editEvent.patchValue({ "description": this.selectedEvent.description });
        this.editEvent.patchValue({ "location": this.selectedEvent.location });
        for (var i = 0; i < this.selectedEvent.files.length; i++) {
            this.fileE[i] = this.selectedEvent.files[i];
        }
        // this.fileE = JSON.parse(JSON.stringify(this.selectedEvent.files));
        console.log("reset working");
        console.log(this.fileE);
        console.log(this.selectedEvent.files);
        // console.log( moment_(this.selectedEvent.startTime).format('H-mm'));
    };
    // public resetFormData(formdata : any){
    //       formdata.patchValue({ "title": this.selectedEvent.title });
    //       formdata.patchValue({ "startdate": this.selectedEvent.startDate });
    //       formdata.patchValue({ "endDate": this.selectedEvent.endDate });
    //       formdata.patchValue({ "startTime": this.selectedEvent.startTime});
    //       formdata.patchValue({ "endTime": this.selectedEvent.endTime});
    //       formdata.patchValue({ "description": this.selectedEvent.description });
    //       formdata.patchValue({ "location": this.selectedEvent.location });
    //       // console.log( moment_(this.selectedEvent.startTime).format('H-mm'));
    // }
    EventComponent.prototype.getFile = function (event) {
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
            console.log("working1234");
        }
        else {
            this.maxfile = false;
        }
        this.noOfFiles = noOfFiles;
        console.log(this.file);
    };
    EventComponent.prototype.getFileE = function (event) {
        var noOfFiles = this.fileE.length;
        console.log(noOfFiles);
        // if(event.srcElement.files.length<=5 && noOfFiles<=5){
        //   this.maxfile = false;
        for (var i = 0; i < event.srcElement.files.length; i++) {
            var blob = event.srcElement.files[i];
            // if(blob.type=="image/png" || blob.type=="image/jpeg" || blob.type=="image/jpg"){
            this.fileE[i + noOfFiles] = event.srcElement.files[i];
            // }
            // else{
            //   $('#errorModal').modal('show');
            //   this.circular.controls['files'].reset();
            //  }
        }
        // }
        noOfFiles = this.fileE.length;
        if (noOfFiles + this.selectedEvent.files.length > 5) {
            this.maxfileE = true;
            console.log("working1234");
        }
        else {
            this.maxfileE = false;
        }
        this.noOfFiles = noOfFiles;
        console.log(this.fileE);
    };
    EventComponent.prototype.removeEditImage = function (i) {
        this.fileE.splice(i, 1);
        var noOfFiles = this.fileE.length;
        if (noOfFiles + this.selectedEvent.files.length <= 5) {
            this.maxfileE = false;
        }
        this.noOfFiles = noOfFiles;
    };
    EventComponent.prototype.removeFile = function (f) {
        var index = this.file.indexOf(f);
        this.file.splice(index, 1);
        var noOfFiles = this.file.length;
        if (noOfFiles <= 5) {
            this.maxfile = false;
        }
        this.noOfFiles = noOfFiles;
    };
    EventComponent.prototype.swipe = function (a) {
        console.log(a);
        this.imgindex += a;
    };
    EventComponent.prototype.swipebydots = function (a) {
        console.log(a);
        this.imgindex = a;
    };
    EventComponent.prototype.openGallery = function () {
        console.log("working gallery");
        $('#modal-gallery').modal('show');
    };
    EventComponent.prototype.removeImage = function (file, i) {
        var _this = this;
        console.log(file);
        var obj = {
            fileTimestamp: file.fileTimestamp
        };
        this.eventService.removeimage(this.eventsInfo.id, file.fileTimestamp).subscribe(function (res) {
            _this.selectedEvent.files.splice(i, 1);
            _this.getEvents();
        }, function (err) {
        });
        console.log("icjdvioc");
        console.log(this.selectedEvent.files);
    };
    EventComponent.prototype.imgArray = function () {
        console.log("i'm working");
        // if(this.selectedEvent.files){
        //   for(let i=0; i<this.selectedEvent.files.length; i++){
        //     this.fileE[i] = this.selectedEvent.files[i]; 
        //   }
        // }
        // this.fileE = JSON.parse(JSON.stringify(this.selectedEvent.files));
        console.log(this.fileE);
        if (this.fileE.length + this.selectedEvent.files.length < 5) {
            this.canadd = true;
        }
        else {
            this.canadd = false;
        }
    };
    EventComponent.prototype.addImages = function () {
        var _this = this;
        var images = new FormData();
        for (var _i = 0, _a = this.fileE; _i < _a.length; _i++) {
            var file = _a[_i];
            images.append('files', file);
        }
        this.eventService.addimages(this.eventsInfo.id, images).subscribe(function (res) {
            _this.fileE = [];
            _this.getEvents();
        }, function (err) {
        });
    };
    EventComponent = __decorate([
        core_1.Component({
            selector: 'event',
            templateUrl: './event.component.html',
            styleUrls: ['./event.component.css']
        }),
        __metadata("design:paramtypes", [event_service_1.EventService,
            http_1.Http,
            loaderstop_service_1.LoaderStop,
            core_1.ElementRef,
            common_service_1.CommonService,
            router_1.Router])
    ], EventComponent);
    return EventComponent;
}());
exports.EventComponent = EventComponent;
//# sourceMappingURL=event.component.js.map