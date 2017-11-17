import { Component, OnInit  } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, FormArray, Validators } from '@angular/forms';
import { CommonService } from '../../../providers/common.service';
import { SurveyService } from '../../../providers/survey.service';
import { ValidationService } from '../../../providers/formValidation.service'
import { Location } from '@angular/common';
import { Router } from '@angular/router';

declare let $: any;

@Component({
  selector: 'add-survey',
  templateUrl: './add.html',
  styleUrls: ['./add.css'],
})

export class AddSurveyComponent implements OnInit {

  public  surveyForm: FormGroup;
  public  standards: any[];
  public  surveyInfo: any;
  public  selectedStandard: any;
  public  loader: boolean = false;
  public  submitProgress:boolean=false;
  public  standardLoader:boolean=false;

  constructor(public  cs: CommonService,
    public  ss: SurveyService,
    public  fb: FormBuilder,
    public  vs: ValidationService,
    public  _location: Location,
    public  router: Router,
  ) {

  }

   ngOnInit() {
    this.getSurveyInfo();
    this.initForm();
    this.getStandards();
  }

 public  getStandards() {
  this.standardLoader=true;
  this.cs.getStandards().subscribe(res => {
        if(res.status == 204){
        this.standardLoader=false;         
        this.standards = null;
        return;
      }
      this.standardLoader=false;               
      this.standards = res;
    },
      err => {
         this.router.navigate(['/error']);
      })
  }

  public  getSurveyInfo() {
     this.loader = true;
    this.cs.getSurveyInfo().subscribe(res => {
      if(res.status === 204){
        this.surveyInfo = null;
        return;
      }
      this.surveyInfo = res;
      this.loader = false;
    },
      err => {
       this.loader = false;
        this.router.navigate(['/error']);
      })
  }

    public  initForm() {
    this.surveyForm = this.fb.group({
      'title': [(''), [Validators.required]],
      'description': [(''), [Validators.required]],
      'surveyTypeId': [(''), [Validators.required]],
      'expiredAt': [(this.cs.getTomorrow()), [Validators.required]],
      // 'standards': [('')],
      'surveyQuestions': this.fb.array([
        this.initQuestions(),
      ], Validators.minLength(1)
        // Validators.compose([ Validators.minLength(1), Validators.maxLength(this.qLimit)])
      ),
    })
  }

    onDueDate(e: any) {
    if (new Date(e.target.value) < new Date(new Date().getFullYear(), new Date().getMonth(), new Date().getDate())) {
      $('#dateErrorModal').modal('show');
      this.surveyForm.controls['expiredAt'].patchValue(this.cs.getTomorrow());
    }
  }

  public  onTypeId(event: any) {
    if (event == "1") {
      this.surveyForm.removeControl("standards");
      this.selectedStandard = [];
    }
    else if (event == "2") {
      this.selectedStandard = [];
      this.surveyForm.addControl("standards", new FormControl((''), [Validators.required]));
    }
  }
  stdIds: any = [];
  selectStandards(a:any,e: any) {
    if(e==true){
      this.stdIds.push(a.id);
    }
    else if(e==false){
      this.stdIds.forEach((element:any, index:any)=>{
         if (element==a.id){
          this.stdIds.splice(index,1);
        }
      })
    }
    this.surveyForm.controls['standardIds'].patchValue(this.stdIds);
  }
  public  onStandards(ev: any) {
    var stan = ev;
    this.surveyForm.controls['standards'].patchValue(stan);
  }

  public  initQuestions() {
    return this.fb.group({
      'type': [(''), [Validators.required]],
      'text': [(''), [Validators.required]],
      'choices': this.fb.array([
        this.initOptions(),
        this.initOptions(),
      ], Validators.minLength(2),
        // Validators.compose([ Validators.minLength(2), Validators.maxLength(this.oLimit)])
      ),
    })
  }

  public  addQuestions(e: any) {
    const control = <FormArray>e.controls['surveyQuestions'];
    control.push(this.initQuestions());
  }

  public  removeQuestions(form: any, index: any) {
    const control = <FormArray>form.controls['surveyQuestions'];
    control.removeAt(index);
  }

  public  initOptions() {
    return this.fb.group({
      'choice': [(''), [Validators.required]],
    })
  }

  public  addOptions(e: any, i: any) {
    const control = <FormArray>e.controls['surveyQuestions'].controls[i].get("choices");
    control.push(this.initOptions());
  }

  public  removeOptions(form: any, i: any, ii: any) {

    const control = <FormArray>form.controls['surveyQuestions'].controls[i].get("choices");
    control.removeAt(ii);
  }

  public  submitSurvey() {
    this.submitProgress = true;
    this.ss.saveSurvey(this.surveyForm.value).subscribe(res => {
      this.submitProgress = false;
      $('#submitModal').modal('show');
      this.initForm();
    },
      err => {
        this.submitProgress = false;
        this.router.navigate(['/error']);
      })
  }

  // public  onQuestionType(ev: any, form: any) {
  //   if (ev == 3) {
  //     // const control = <FormArray>form.controls['surveyQuestions'].controls[i].get("choices");
  //     // control.setValidators(this.vs.minLengthArray(0));
  //     // var l = control.length - 1;
  //     // while (l >= 0) {
  //     //   this.removeOptions(form, i, l);
  //     //   l = l - 1;
  //     // }
  //     <FormGroup>form.removeControl("choices");
  //   }
  //   else {
  //     // const control = <FormArray>form.controls['surveyQuestions'].controls[i].get("choices");
  //     // control.setValidators(this.vs.minLengthArray(2));
  //   }
  // }
}



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

//   public  surveyForm: FormGroup;
//   public  standards: any[];
//   public  surveyInfo: any;
//   public  selectedStandard: any;
//   public  loader: boolean = false;

//   constructor(public  cs: CommonService,
//     public  ss: SurveyService,
//     public  fb: FormBuilder,
//     public  vs: ValidationService,
//     public  _location: Location,
//     public  router: Router,
//   ) {

//   }

//   ngOnInit() {
//     this.getSurveyInfo();
//     this.initForm();
//     this.getStandards();
//   }

//   public  getStandards() {
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

//   public  getSurveyInfo() {
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

//   public  initForm() {
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

//   public  onTypeId(event: any) {
//     if (event == "1") {
//       this.surveyForm.removeControl("standards");
//       this.selectedStandard = [];
//     }
//     else if (event == "2") {
//       this.selectedStandard = [];
//       this.surveyForm.addControl("standards", new FormControl((''), [Validators.required]));
//     }
//   }

//   public  onStandards(ev: any) {
//     var stan = ev;
//     this.surveyForm.controls['standards'].patchValue(stan);
//   }

//   public  initQuestions() {
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

//   public  addQuestions(e: any) {
//     const control = <FormArray>e.controls['surveyQuestions'];
//     control.push(this.initQuestions());
//   }

//   public  removeQuestions(form: any, index: any) {
//     const control = <FormArray>form.controls['surveyQuestions'];
//     control.removeAt(index);
//   }

//   public  initOptions() {
//     return this.fb.group({
//       'choice': [(''), [Validators.required]],
//     })
//   }

//   public  addOptions(e: any, i: any) {
//     const control = <FormArray>e.controls['surveyQuestions'].controls[i].get("choices");
//     control.push(this.initOptions());
//   }

//   public  removeOptions(form: any, i: any, ii: any) {

//     const control = <FormArray>form.controls['surveyQuestions'].controls[i].get("choices");
//     control.removeAt(ii);
//   }

//   public  submitSurvey() {
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

//   // public  onQuestionType(ev: any, form: any) {
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








