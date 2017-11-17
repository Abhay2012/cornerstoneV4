import {Component} from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { SuggestionService } from '../../../providers/suggestion.service';
import { CommonService } from '../../../providers/common.service';
import { Location } from '@angular/common';
import { Router } from '@angular/router';

 @Component({
  selector:'suggestion-add',
  templateUrl:'./add.html',
  // styleUrls:''
 })
 export class SuggestionAddComponent{

  // public  title: string = "New Suggestion";
  public  suggestion: FormGroup;
  public  submitProgress:boolean = false;
  public  stan:any;
  standards:any = [];
  public  standardId:any;
  public  emptyStandards:boolean =  false;
  public  emptyStudents: boolean = false;
  students:any=[];
  public  standardLoader:boolean=false;
  public  studentLoader:boolean=false;
  // subjects:any = [];
  constructor(  public suggestionService:SuggestionService,
                public commonService:CommonService,
                public _location: Location,
                public  router: Router,
                ){
  
                  // this.getStudents(a);
  }

  ngOnInit() {
    this.getStandards();
    this.initForm();
  }

    public  initForm() {
      this.standardId = null;
    this.suggestion = new FormGroup({
      description: new FormControl('', [Validators.required,Validators.maxLength(2500)]),
      studentId: new FormControl('', [Validators.required]),
      title: new FormControl('', [Validators.required,Validators.maxLength(50)]),
            // standardId: new FormControl('', [Validators.required]),
      

    });
  }
    submitSuggestion(){
    this.submitProgress = true;
        this.suggestionService.postSuggestion(this.suggestion.value).subscribe((res) => {
      this.submitProgress = false;
      this.initForm();
      // $('#circularModal').modal('show');
    }, (err) => {
       this.router.navigate(['/error']);
    });
    }

  public  getStandards() {
    this.standardLoader=true;
    this.suggestionService.getStandards().subscribe((res) => {
      if(res.status===204){
    this.standardLoader=false;        
        this.emptyStandards = true;
        return;
      }
    this.standardLoader=false;              
      this.emptyStandards=false;
      this.standards = res;

    }, (err) => {
       this.router.navigate(['/error']);
    });
  }

   public  getStudents(standardId:any) {
    this.studentLoader=true;
    this.suggestion.controls["studentId"].reset();
    this.suggestionService.getStudents(standardId).subscribe((res) => {
      if(res.status === 204){
    this.studentLoader=false;        
        this.emptyStudents = true;
        return;
      }
    this.studentLoader=false;      
      this.emptyStudents = false;;
      this.students = res;
    }, (err) => {
       this.router.navigate(['/error']);
    });
  }
 }