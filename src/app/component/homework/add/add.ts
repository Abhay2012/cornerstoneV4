import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { HomeworkService } from '../../../providers/homework.service';
import { Location } from '@angular/common';
import { CommonService } from '../../../providers/common.service';
import { Router } from '@angular/router'

declare let $: any;

@Component({
  selector: 'homework-add',
  templateUrl: './add.html',
  // styleUrls:['../homework.component.css']

})

export class HomeworkAddComponent implements OnInit {

  public  title: string = "New Homework";
  public  homework: FormGroup;
  public  submitProgress: boolean = false;
  invalidDate:boolean = false;
  standards: any = [];
  subjects: any = [];
  public  noOfFiles : number = 0;
  public  emptySubjects: boolean = true;
  public  loader: boolean = false;
  public  standardLoader:boolean=false;
  public  subjectLoader:boolean=false;
  public  maxfile = false;
  constructor(public homeworkService: HomeworkService,
    public commonService: CommonService,
    public _location: Location,
    public  router: Router) {              
 }


  ngOnInit() {
    this.initForm();
    this.getStandards();
  }
  file: any[]=[];

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

  onDueDate(e: any) {
    if (new Date(e.target.value) < new Date(new Date().getFullYear(), new Date().getMonth(), new Date().getDate())) {
      // alert("");
      
      this.homework.controls['dueDate'].patchValue(this.commonService.getTomorrow());
    }else{
      this.invalidDate = false;
    }
  }

  public  initForm() {
    this.homework = new FormGroup({
      description: new FormControl('', [Validators.required]),
      standardId: new FormControl('', [Validators.required]),
      subjectId: new FormControl('', [Validators.required]),
      dueDate: new FormControl(this.commonService.getTomorrow(), [Validators.required]),
      file: new FormControl('')
    });
  }

  getSubjects(a: any) {
    this.subjectLoader = true;
    this.subjects = [];
    this.homework.controls["subjectId"].reset();
    this.homeworkService.getSubjects(a).subscribe(res => {
      if (res.status == 204) {
        this.emptySubjects = true;
        this.subjects = [];
        this.standardLoader = false;
        return;
      }
      this.emptySubjects = false;
      this.subjects = res;
      this.subjectLoader = false;
    }, (err) => {
      this.router.navigate(['/error']);
    });
  }

  public  getStandards() {
    this.standardLoader = true;
    this.homeworkService.getStandards().subscribe((res) => {
      this.standards = res;
      this.commonService.storeData("standards", res);
      this.standardLoader = false;
    }, (err) => {
      this.router.navigate(['/error']);
    });
  }

  submitHomework() {
    this.submitProgress = true;
    let formData : FormData = new FormData();
    formData.append('description', this.homework.value['description']);
    formData.append('standardId', this.homework.value['standardId']);
    formData.append('subjectId', this.homework.value['subjectId']);
    formData.append('dueDate', this.homework.value['dueDate']);
    
    for(let i = 0;i<this.file.length;i++){
      formData.append('files', this.file[i]);
    }
    
    
    console.log(formData);
    this.saveHomework(formData);
    
    // this.submitProgress = false;
  }

  // public  presentActionSheet() {
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

  public  saveHomework(formData: any) {
    this.submitProgress=true;
    this.homeworkService.PostHomework(formData).subscribe((data) => {
      this.initForm();
      this.submitProgress = false;
      $('#homeworkModal').modal('show');
    }, (err) => {
      // this.submitProgress = false;
      this.router.navigate(['/error']);
    });
    this.file=null;
  }
}