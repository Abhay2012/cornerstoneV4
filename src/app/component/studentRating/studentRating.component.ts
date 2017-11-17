import { Component,OnInit, OnDestroy } from '@angular/core';
import { StudentRatingService } from '../../providers/studentRating.service';
import { FormGroup, FormControl, FormArray, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { LoaderStop } from '../../providers/loaderstop.service';
// import * as moment_ from 'moment';



declare let $: any;


@Component({
  selector: 'student-rating',
  templateUrl: './studentRating.component.html',
  styleUrls: ['./studentRating.component.css']
})

export class StudentRatingComponent implements OnInit, OnDestroy{

  constructor(public  srs: StudentRatingService,
    public  fb: FormBuilder, public  ls: LoaderStop,  public  router:Router,
  ) { 
     this.ls.setLoader(false);
  }

  ngOnInit(){
     this.getStudents();
  }
    ngOnDestroy(){
      this.ls.setLoader(true);
  }
  
  public  students: any[];
  public  studentsCOPY: any[];
  public  emptyStudents: boolean = false;
  public  respStu: any;
  public  respStuCopy: any;
  public  selectedStudent: any;
  public  selectedStudentCopy: any;
  public  selected: boolean = false;
  public  emptySearchResult: boolean = false;
  public  loader: boolean = false;
  public  loader1: boolean = false;
  public  ratingForm = this.fb.group({});

  public  getStudents() {
    this.loader=true;
    this.srs.getStudents().subscribe(res => {
      if (res.status === 204) {
        this.loader=false;
        this.students = [];
        this.emptyStudents = true;
        // $('#noDataModal').modal('show');
      }
      this.loader=false;
      this.students = res;
      this.studentsCOPY = this.students;
    },
      err => {
         this.router.navigate(['/error']);
      })
  }

  public  selectStudent(stu: any) {
    this.selected = false;
    this.selectedStudent = stu;
    this.selectedStudentCopy =  stu;
    this.getStudentRating(stu.id);

  }

  public  getStudentRating(id: any) {
    this.loader1=true
    this.srs.getStudentRating(id).subscribe(res => {
      this.respStu = res;
      this.respStuCopy = this.respStu;
      this.initForm();
      this.loader1 = false;
    },
      err => {
        this.loader1 = false;
        this.router.navigate(['/error']);
      });
  }
  public  updaterating(e:any,x:number,x1:number){
      for(let i =0 ;i<5; i++){
      (<HTMLInputElement>document.getElementById("star"+x1+"a"+i+"1")).checked=false;

      }
      for(let i =0 ;i<=x; i++){
      (<HTMLInputElement>document.getElementById("star"+x1+"a"+i+"1")).checked=true;      
      }

  }
  public  initForm() {
    this.ratingForm = this.fb.group({
      'studentId': [this.selectedStudent.id],
      'responsibilitiesWithRating': this.fb.array([
      ]),
    })
    this.addResp();
  }

  public  addResp() {
    this.respStu.profile.forEach((item: any, index: any) => {
      const control = <FormArray>this.ratingForm.controls['responsibilitiesWithRating'];
      control.push(this.initStudentRating());
    })
  }

  public  initStudentRating() {
    return this.fb.group({
      'ratingId': ['', [Validators.required]],
      'responsibilityId': [''],
      'profileId': [''],
    })
  }

  public  searchStudents(ev: any) {
    this.selected = true;
    let val = ev.target.value;
    if (val && val.trim() != '') {
      this.emptySearchResult = false;
      this.students = this.studentsCOPY.filter((item: any) => {
        return (item.name.toLowerCase().indexOf(val.toLowerCase()) > -1);
      })
      if (this.students.length == 0) {
        this.emptySearchResult = true;
      }
    }
    else {
      this.selected = false;
    }
  }

  public  submitRating() {
    this.srs.saveStudentRating(this.ratingForm.value, this.respStu.isEmpty).subscribe(res => {
      $('#submitModal').modal('show');
      this.selectedStudent = null;
    },
      err => {
        this.selectedStudent = null;
        this.router.navigate(['/error']);
      })
  }

  public  resetForm() {
    if (this.respStu.isEmpty) {
      this.initForm();
    }
    else {
      this.ratingForm.value.responsibilitiesWithRating.forEach((item: any, index: any) => {
        (<FormArray>this.ratingForm.controls['responsibilitiesWithRating']).at(index).patchValue({ "ratingId": this.respStuCopy.profile[index].ratingId });
      })
    }
    // this.ratingForm.controls.responsibilitiesWithRating.markAsPristine()
  }

}