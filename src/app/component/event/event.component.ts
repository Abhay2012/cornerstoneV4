import { Component, Input, OnInit, OnDestroy, AfterViewInit, AfterContentChecked, AfterViewChecked, ElementRef } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { EventService } from '../../providers/event.service';
import { LoaderStop } from '../../providers/loaderstop.service';
import { CommonService } from '../../providers/common.service';
import * as moment_ from 'moment';
import { Http } from '@angular/http';
import * as _ from 'jquery';
import { Router } from '@angular/router';


declare let $: any;


@Component({
  selector: 'event',
  templateUrl: './event.component.html',
  styleUrls: ['./event.component.css']
})
export class EventComponent implements OnInit, AfterViewInit, OnDestroy {
  public event: FormGroup;
  eventformData: FormData;
  public currentMonth: any;
  public newEvents: any;
  public calInstance: any;
  public thisdate: any;
  public eventsInfo: any;
  public maxfile: boolean = false;
  public buttonlabel: string = 'Select Standard';
  public eventId: any;
  public pageNo: any = 1;
  public eventMonth: any;
  public emptyEvent: boolean;
  public planner: any;
  public standard: any;
  public editEvent: FormGroup;
  public start: any;
  public end: any;
  public stdIds: any[] = [];
  public selectedEvent: any;
  public message: any;
  public loader: boolean = true;
  public empId: any;
  public file: any[] = [];
  public fileE: any[] = [];
  public canadd: boolean = true;
  public noOfFiles: number = 0;
  public id: any;
  public maxfileE: boolean = false;
  public disable: boolean = false;
  public standardId: any[] = [];
  public standardLoader: boolean = false;
  public plannerLoader: boolean = false;
  public startTime: any;
  public endTime: any;
  imgindex: number = 0;
  fileUrl: any;
  constructor(

    public eventService: EventService,
    public http: Http,
    public ls: LoaderStop,
    public element: ElementRef,
    public cs: CommonService,
    public router: Router,
  ) {
    //  
    this.getPlanner();
    this.getStandardId();
    this.ls.setLoader(false);

  }

  ngOnInit() {
    this.fileUrl = localStorage.getItem("fileUrl") + "/";
    this.id = localStorage.getItem("id");
    this.event = this.initForm();

  }
  ngOnDestroy() {
    this.ls.setLoader(true);
  }
  ngAfterViewInit() {
    _('#calendar').fullCalendar('renderEvents', this.calendarOptions.events, true);
  }

  public calendarOptions: any = {
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

    events: [
    ],

    eventClick: (event: any, jsEvent: any, view: any) => {
      this.selectedEvent = event;
      this.imgindex = 0;
      this.empId = event.employeeId;
      if (this.empId == this.id) {
        this.disable = false;
      }
      else {
        this.disable = true;
      }
      this.editEvent = this.editForm();
      this.event = this.initForm();
      this.getEventById(event.id);
      $('#fullCalModal').modal();
    },

    select: (start: any, end: any) => {
      if (start.isBefore(moment_().subtract(1, "days"))) {
        _('#calendar').fullCalendar('unselect');
        $('#modal-unselect').modal();
        return false;
      }
      else {
        this.event.reset;
        this.start = moment_(start).format('YYYY-MM-DD');
        // var tomorrow = new Date(this.start);
        // tomorrow.setDate(tomorrow.getDate() + 1);
        this.end = moment_(moment_(end).subtract(1, "days")).format('YYYY-MM-DD');

        this.event = this.initForm();
        $('#fullCalView').modal();
      }
    },

    dayRender: function (date: any, cell: any) {
      if (date.isBefore(moment_().subtract(1, "days"))) {
        cell.css("background-color", "#fbfbfb");
        // cell.css("color","grey");
      }
      else {
        cell.css("cursor", "pointer");

      }
    },

    eventRender: function (event: any, element: any, view: any) {
      console.log("render : ");
      console.log(event);
      console.log(element);
      console.log(view);

      if (event.files) {
        console.log("work");
      }
    },

    eventDrop: function (event: any, delta: any, revertFunc: any) {
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
    eventMouseover: function (calEvent: any, jsEvent: any) {
      var tooltip = '<div class="tooltipevent" style="width:100px;height:100px;background:#ccc;position:absolute;z-index:10001;padding:7px;color:black;font-weight:500;font-size:15px">Click to view, edit or delete the event</div>';
      $("body").append(tooltip);
      $(this).mouseover(function (e: any) {
        $(this).css('z-index', 100);
        $('.tooltipevent').fadeIn('500');
        $('.tooltipevent').fadeTo('10', 1.9);
      }).mousemove(function (e: any) {
        $('.tooltipevent').css('top', e.pageY + 10);
        $('.tooltipevent').css('left', e.pageX + 20);
      });
    },

    eventMouseout: function (calEvent: any, jsEvent: any) {
      $(this).css('z-index', 8);
      $('.tooltipevent').remove();
    },

    viewRender: (view: any, element: any) => {
      var b = _('#calendar').fullCalendar('getDate');
      var check = moment_(b, 'YYYY/MM/DD');
      var month = check.format('MM');
      var year = check.format('YYYY');
      this.eventMonth = year + "-" + month;
      this.getEvents();
    },
  }

  public initForm() {
    return new FormGroup({
      title: new FormControl('', [Validators.required]),
      plannerTypeId: new FormControl([], [Validators.required]),
      startDate: new FormControl(this.start, [Validators.required]),
      endDate: new FormControl(this.end, [Validators.required]),
      location: new FormControl('', [Validators.maxLength(50)]),
      description: new FormControl('', [Validators.maxLength(2500)]),
      files: new FormControl('')
    })
  }

  public createFormData() {
    this.eventformData = new FormData();

    this.eventformData.append('title', this.event.value.title);
    this.eventformData.append('plannerTypeId', this.event.value.plannerTypeId);
    this.eventformData.append('startDate', this.event.value.startDate);
    this.eventformData.append('endDate', this.event.value.endDate);
    this.eventformData.append('location', this.event.value.location);
    this.eventformData.append('description', this.event.value.description);
    if (this.event.value.startTime) {
      this.eventformData.append('startTime', this.event.value.startTime);
    }
    if (this.event.value.endTime) {
      this.eventformData.append('endTime', this.event.value.endTime);
    }
    for (let i = 0; i < this.file.length; i++) {
      this.eventformData.append('files', this.file[i]);
    }
    this.postEvent(this.eventformData);
  }

  public editForm() {
    this.selectedEvent.startTime = (moment_(this.selectedEvent.startTime, 'hh-mm a').format('HH:mm'));
    this.selectedEvent.endTime = (moment_(this.selectedEvent.endTime, 'hh-mm a').format('HH:mm'));
    console.log(this.selectedEvent.startTime);
    return new FormGroup({
      title: new FormControl(this.selectedEvent.title),
      startDate: new FormControl(this.selectedEvent.startDate),
      endDate: new FormControl(this.selectedEvent.endDate),
      startTime: new FormControl(this.selectedEvent.startTime),
      endTime: new FormControl(this.selectedEvent.endTime),
      location: new FormControl(this.selectedEvent.location, [Validators.maxLength(50)]),
      description: new FormControl(this.selectedEvent.description, [Validators.maxLength(2500)]),
    })
  }

  //   public  editFormData(){
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

  public selectPlannerType(type: any) {
    if (type == 2) {
      this.event.addControl("standardIds", new FormControl('', [Validators.required]));
      console.log(this.event.value);
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
      this.event.addControl("startTime", new FormControl('', [Validators.required]));
      this.event.addControl("endTime", new FormControl('', [Validators.required]));
    }
    this.start = "00:00";
    this.end = "00:00";

  }


  public startT(e: any) {

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
  }

  public endT(e: any) {
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
  }

  public getEvents() {
    console.log("getting events....");
    this.eventService.GetEvents(this.eventMonth).subscribe((res) => {
      if (res.status === 204) {
        this.emptyEvent = true;
        this.loader = false;
      }
      else {
        this.loader = false;
        this.newEvents = res;
        console.log(this.newEvents);
        _('#calendar').fullCalendar('removeEvents');
        _('#calendar').fullCalendar('addEventSource', this.newEvents);
      }

    }, (err) => {
    });
  }
  // public  startTi:any;
  // public  endTi:any;
  public getEventById(id: any) {
    this.eventService.GetEventById(id).subscribe((res) => {
      this.eventsInfo = res;
      console.log(this.eventsInfo);
      $('#fullCalModal').modal('show');
      // this.startTime = moment_(this.eventsInfo.start).format('HH-MM-SS-A');
      //  this.endTime = moment_(this.eventsInfo.end).format('HH-MM-SS-A');

      this.startTime = this.eventsInfo.startTime;
      this.endTime = this.eventsInfo.endTime;
      // this.startTime=this.eventsInfo.startTime;
      // this.endTime=this.eventsInfo.endTime;
    })
  }


  public getPlanner() {
    this.plannerLoader = true;
    this.eventService.GetPlanner().subscribe((res) => {
      this.plannerLoader = false;
      this.planner = res;
      this.loader = false;
    }, (err) => {
      this.router.navigate(['/error']);
    })
  }

  public getStandardId() {
    this.standardLoader = true;
    this.eventService.getStandards().subscribe((res) => {
      this.standardLoader = false;
      this.standard = res;
    }, (err) => {
      this.router.navigate(['/error']);
    });
  }

  public postEvent(formdata: any) {
    this.loader = true;
    // for(let std of this.stdIds){
    if (this.event.get('plannerTypeId').value == 2) {
      formdata.append('standardIds', this.stdIds);
    }

    console.log(formdata);
    this.eventService.postEvent(formdata).subscribe((res) => {
      this.loader = false;
      this.message = "You have successfully added an event";
      $('#modal-success').modal();
      // $('#message').html(this.eventsInfo.eventTitle);       
      this.getEvents();
    }, (err) => {
      this.router.navigate(['/error']);
    })
  }

  public deleteEvent() {
    this.loader = true;
    this.eventService.deleteEvent(this.eventsInfo.id).subscribe((res) => {
      this.loader = false;
      this.message = "You have successfully deleted the event";
      $('#modal-success').modal('show');
      this.getEvents();
    }, (err) => {
      this.router.navigate(['/error']);
    })
  }

  public updateEvent() {
    console.log("upating");
    this.loader = true;
    console.log(this.eventsInfo.id);
    console.log(this.editEvent);
    this.eventService.updateEvent(this.eventsInfo.id, this.editEvent.value).subscribe((res) => {
      this.loader = false;
      this.newEvents = res;
      console.log("upating1");
      this.message = "You have successfully updated the event";
      $('#modal-success').modal('show');
      this.getEvents();
    }, (err) => {
      console.log("upatingerr");
      this.loader = false;
    });
  }

  selectStandards(a: any, e: any) {

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

      let s: string = a.name;
      this.buttonlabel = this.buttonlabel.replace(' ' + s, '');
      console.log(this.buttonlabel);
      if (this.buttonlabel == '') {
        this.buttonlabel = 'Select Standard';
      }
      this.stdIds.forEach((element: any, index: any) => {
        if (element == a.id) {
          this.stdIds.splice(index, 1);
        }
      })
    }
    this.event.controls['standardIds'].patchValue(this.stdIds);
    console.log(this.event.value);
    console.log(this.stdIds);
  }

  // public  selectStandards(e:any,a:any){
  //     if(e==true){
  //       this.stdIds.push(a.id);
  //     }
  //     else if(e==false){
  //       this.stdIds.forEach((element:any, index:any)=>{
  //          if (element==a.id){
  //           this.stdIds.splice(index,1);
  //         }
  //       })
  //     }
  //     // this.stdIds = [];
  //     // for(let x of e){
  //     //   this.stdIds.push(x.id);  
  //     // }
  //     // console.log(this.stdIds);
  //     this.event.controls['standardIds'].patchValue(this.stdIds);
  //   }



  public currentDate: any;

  public onDueDate(e: any) {
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

  }

  public checkDate(e: any) {
    if (new Date(e.target.value) < new Date(this.event.controls['startDate'].value)) {
      this.message = "Please choose a date after start date";
      $('#modal-success').modal('show');
      this.event.controls['endDate'].patchValue(this.start);
    }
    this.startT(this.startTime);
    this.endT(this.endTime);
  }

  checkcheckedbox(a: any) {
    if (a.checked == true) {
      return true;
    } else {
      if (this.buttonlabel.indexOf(a.name) >= 0) {
        return true;
      }
      return false;
    }
  }



  public onStartDate(e: any) {
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
  }

  public check(e: any) {
    if (new Date(e.target.value) < new Date(this.editEvent.controls['startDate'].value)) {
      this.message = "Please choose a date after start date";
      $('#modal-success').modal('show');
      this.editEvent.controls['endDate'].patchValue(this.selectedEvent.startDate);
    }
    this.checkStart(this.startTime);
    this.checkEnd(this.endTime);
  }

  public checkStart(e: any) {

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

  }

  public checkEnd(e: any) {
    this.endTime = e;
    // this.editEvent.controls['endTime'].patchValue(e);

    if ((this.editEvent.controls['startDate'].value) == (this.editEvent.controls['endDate'].value)) {
      if (this.endTime < this.startTime) {
        this.message = "Please choose end time greater than start time";
        $('#modal-success').modal('show');
        this.event.controls['startTime'].patchValue("")
        this.editEvent.controls['startTime'].patchValue("");
        this.editEvent.controls['endTime'].patchValue("");
        $("input[type=time]").val("");
        this.startTime = null;
        this.endTime = null;
      }
    }

  }
  public resetForm() {
    console.log(this.selectedEvent);
    this.editEvent.patchValue({ "title": this.selectedEvent.title });
    this.editEvent.patchValue({ "startdate": this.selectedEvent.startDate });
    this.editEvent.patchValue({ "endDate": this.selectedEvent.endDate });
    this.editEvent.patchValue({ "startTime": this.selectedEvent.startTime });
    this.editEvent.patchValue({ "endTime": this.selectedEvent.endTime });
    this.editEvent.patchValue({ "description": this.selectedEvent.description });
    this.editEvent.patchValue({ "location": this.selectedEvent.location });
    for (let i = 0; i < this.selectedEvent.files.length; i++) {
      this.fileE[i] = this.selectedEvent.files[i];
    }
    // this.fileE = JSON.parse(JSON.stringify(this.selectedEvent.files));
    console.log("reset working");
    console.log(this.fileE);
    console.log(this.selectedEvent.files);
    // console.log( moment_(this.selectedEvent.startTime).format('H-mm'));
  }

  // public  resetFormData(formdata : any){
  //       formdata.patchValue({ "title": this.selectedEvent.title });
  //       formdata.patchValue({ "startdate": this.selectedEvent.startDate });
  //       formdata.patchValue({ "endDate": this.selectedEvent.endDate });
  //       formdata.patchValue({ "startTime": this.selectedEvent.startTime});
  //       formdata.patchValue({ "endTime": this.selectedEvent.endTime});
  //       formdata.patchValue({ "description": this.selectedEvent.description });
  //       formdata.patchValue({ "location": this.selectedEvent.location });
  //       // console.log( moment_(this.selectedEvent.startTime).format('H-mm'));
  // }

  getFile(event: any) {

    var noOfFiles = this.file.length;
    console.log(noOfFiles);
    // if(event.srcElement.files.length<=5 && noOfFiles<=5){
    //   this.maxfile = false;

    for (let i = 0; i < event.srcElement.files.length; i++) {
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
  }

  getFileE(event: any) {

    var noOfFiles = this.fileE.length;
    console.log(noOfFiles);
    // if(event.srcElement.files.length<=5 && noOfFiles<=5){
    //   this.maxfile = false;

    for (let i = 0; i < event.srcElement.files.length; i++) {
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
  }

  removeEditImage(i: any) {
    this.fileE.splice(i, 1);
    var noOfFiles = this.fileE.length;
    if (noOfFiles + this.selectedEvent.files.length <= 5) {
      this.maxfileE = false;
    }
    this.noOfFiles = noOfFiles;
  }

  removeFile(f: any) {
    var index = this.file.indexOf(f);
    this.file.splice(index, 1);
    var noOfFiles = this.file.length;
    if (noOfFiles <= 5) {
      this.maxfile = false;
    }
    this.noOfFiles = noOfFiles;
  }

  public swipe(a: number) {
    console.log(a);
    this.imgindex += a;
  }
  public swipebydots(a: number) {
    console.log(a);
    this.imgindex = a;
  }

  openGallery() {
    console.log("working gallery");
    $('#modal-gallery').modal('show');
  }

  removeImage(file: any, i: number) {
    console.log(file);
    var obj = {
      fileTimestamp: file.fileTimestamp
    }
    this.eventService.removeimage(this.eventsInfo.id, file.fileTimestamp).subscribe((res: any) => {
      this.selectedEvent.files.splice(i, 1);
      this.getEvents();
    }, (err: any) => {

    })
    console.log("icjdvioc");
    console.log(this.selectedEvent.files);
  }

  imgArray() {
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
  }
  addImages() {
    var images: FormData = new FormData();
    for (let file of this.fileE) {
      images.append('files', file);
    }
    this.eventService.addimages(this.eventsInfo.id, images).subscribe((res: any) => {
      this.fileE = [];
      this.getEvents();
    }, (err: any) => {

    })
  }
}

