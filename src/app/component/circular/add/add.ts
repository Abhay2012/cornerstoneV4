import { Component, OnInit, AfterViewInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { CircularService } from '../../../providers/circular.service';
import { CommonService } from '../../../providers/common.service';
import { Location } from '@angular/common';
import { Router } from '@angular/router';

declare let $: any;

@Component({
  selector: 'add-circular',
  styleUrls:['./add.css'],
  templateUrl: './add.html'
})
export class AddCircular implements OnInit, AfterViewInit {

  public  circular: FormGroup;
  public  title: string = 'Add Circular';
  public  newCircular: any;
  public  maxfile : boolean = false;
  public  standards: any;
  public  buttonlabel : string = 'Select Standard';
  public  emptyStandards = false;
  public  circularType: any;
  public  file: any[]=[];
  public  loader: boolean = false;
  public  submitProgress: boolean = false;
  public  standardLoader:boolean=false;
  public  audienceLoader:boolean=false;
  public  noOfFiles : number =0;
  public  todayDate : Date;
  constructor(public circserv: CircularService,
    public commonService: CommonService,
    public _location: Location,
    public  router: Router, ) { }

  ngOnInit() {
    this.circular = this.initForm();
    this.todayDate = new Date("DD MMM YYYY");
  }

  onDueDate(e: any) {
    if (new Date(e.target.value) < new Date(new Date().getFullYear(), new Date().getMonth(), new Date().getDate())) {
      alert("Please choose an upcoming date from the calendar.");
      this.circular.controls['date'].patchValue(this.commonService.getTomorrow());
    }
  }

  ngAfterViewInit() {
    this.getCircularInfo();
    this.getStandards();
  }

  public  initForm() {
    return new FormGroup({
      title: new FormControl('', [Validators.required]),
      description: new FormControl('', [Validators.required]),
      date: new FormControl(this.commonService.getTomorrow(), [Validators.required]),
      circularTypeId: new FormControl('', [Validators.required]),
      files: new FormControl('')
      // standardIds: new FormControl([], [Validators.required])
    });
  }

  // public  getStandards() {
  //   this.loader = true;
  //   this.standards = this.commonService.getData("standards");
  //   if (typeof (this.standards) === 'undefined') {
  //     this._getStandards();
  //   }
  //   this.loader = false;
  // }

  public  getStandards() {

    this.standardLoader = true;
    this.circserv.getStandards().subscribe((res) => {
      if (res.status === 204) {
        this.standardLoader=false;
        this.standards = null;
        this.loader = false;
        return;
      }
      this.standards = res;
      this.commonService.storeData("standards", res);
      this.standardLoader = false;
      
    }, (err) => {
      this.loader = false;
      this.router.navigate(['/error']);
    });
  }

  // public  getCircularInfo() {
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

  public  getCircularInfo() {
    this.loader = true;
    this.audienceLoader=true;
    this.commonService.getCircularInfo().subscribe((res) => {
      this.audienceLoader=false;
      this.buildCircularData(res);
      this.commonService.storeData("circularInfo", res);
      this.loader = false;
    }, (err) => {
      this.loader = false;
      this.router.navigate(['/error']);
    });
  }

  check(a:any){
      if(a.checked == true){
        return true;
      }
      else{
         if( this.buttonlabel.indexOf(a.name) >= 0  ){
           return true;
         }
         return false;
      }
  }

  public  buildCircularData(circular: any) {

    this.circularType = circular;
  }

  public  onCircularType(event: any) {
    if (event == "1") {
      this.circular.removeControl("standardIds");
      this.standard = [];
      this.emptyStandards = true;
    } else if (event == "2") {
      this.circular.addControl("standardIds", new FormControl('', [Validators.required]));
      this.emptyStandards = false;
    }
    // this.circular.controls['standardIds'].reset();
  }

  public  circularSubmit() {
    this.submitProgress = true;

    let formData = new FormData();
    console.log(formData);
    formData.append('title', this.circular.value['title']);
    formData.append('description', this.circular.value['description']);
    formData.append('circularTypeId', this.circular.value['circularTypeId']);
    if (!this.emptyStandards) {
      formData.append('standardIds', this.circular.value['standardIds']);
    }
    formData.append('date', this.circular.value['date']);
    for(let i=0; i< this.file.length;i++){
      formData.append('files', this.file[i]);  
    }
    
    this.onSubmit(formData);
     console.log(formData);

    // this.submitProgress = false;
  }
  stdIds: any = [];
  standard: any;

  selectStandards(a:any,e: any) {

    if(e==true){
      this.stdIds.push(a.id);
      if(this.buttonlabel == 'Select Standard'){
        this.buttonlabel = ' '+a.name;
      }
      else{
        this.buttonlabel += ' ' + a.name;
      }
    }
    else if(e==false){
      
      let s : string = a.name; 
      this.buttonlabel = this.buttonlabel.replace( ' '+s , '');
      console.log(this.buttonlabel);
      if(this.buttonlabel == ''){
        this.buttonlabel = 'Select Standard';
      }
      this.stdIds.forEach((element:any, index:any)=>{
         if (element==a.id){
          this.stdIds.splice(index,1);
        }
      })
    }
    this.circular.controls['standardIds'].patchValue(this.stdIds);
    console.log(this.stdIds);
  }

  public  onSubmit(formData: any) {
    this.submitProgress = true;
    console.log(formData);
    this.circserv.PostCircular(formData).subscribe((data) => {
      this.submitProgress = false;
      this.circular = this.initForm();
      this.loader= false;
      $('#circularModal').modal('show');
    }, (err) => {
      this.loader = false;
      this.router.navigate(['/error']);
    });
    this.file = null;
  }

    getFile(event: any) {
      
      var noOfFiles = this.file.length;
      console.log(noOfFiles);
      // if(event.srcElement.files.length<=5 && noOfFiles<=5){
      //   this.maxfile = false;
         
        for(let i=0;i<event.srcElement.files.length;i++){
        var blob = event.srcElement.files[i];
        
          // if(blob.type=="image/png" || blob.type=="image/jpeg" || blob.type=="image/jpg"){
            this.file[i+noOfFiles] = event.srcElement.files[i];
          // }
          // else{
          //   $('#errorModal').modal('show');
          //   this.circular.controls['files'].reset();
          //  }
        }  
      // }
      noOfFiles = this.file.length;
      if(noOfFiles>5){
       this.maxfile = true;
      }
      else{
        this.maxfile = false;
      }
      

      this.noOfFiles =noOfFiles;
        console.log(this.file);   
  }
  removeFile( f : any){
    var index = this.file.indexOf(f);
    this.file.splice(index,1);
    var noOfFiles = this.file.length;
    if(noOfFiles<=5){
      this.maxfile = false;
    }
    this.noOfFiles =noOfFiles;
  }
}