import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators, FormControl, FormArray } from '@angular/forms';
import { AdminService } from '../../providers/admin.service';
import { HomeworkService } from '../../providers/homework.service';
import { ValidationService } from '../../providers/formValidation.service';
import { AuthService } from '../../providers/auth.service';
import { Router } from '@angular/router';
import { Location } from '@angular/common';
import { LoaderStop } from '../../providers/loaderstop.service';

declare let $: any;

@Component({
  selector: 'add-employee',
  templateUrl: './addEmployee.component.html',
  styleUrls: ['./addEmployee.component.css']
})

export class AddEmployeeComponent implements OnInit, OnDestroy {
  public  standards: any = [];
  public  subjects: any = [[]];
  public  imgFile: any;
  public  newEmpId: any;
  public  loader: boolean = false;
  public  userNameValid: boolean;
  public  emailValid: boolean;
  public  passwordValid: boolean;
  public  contactValid: boolean;
  public  profilePic: any = 'parent%2f39945169084408330481.jpg?alt=media';
  public  fileUrl: any;
  public  uploadPicForm: FormGroup;
  public  addEmployeeForm = this.fb.group({
  })
  constructor(public  as: AdminService,
    public  au: AuthService,
    public  hs: HomeworkService,
    public  fb: FormBuilder,
    public  ls : LoaderStop,
    public  router: Router,
    public  _location: Location, ) {
        
      this.fileUrl = localStorage.getItem('fileUrl');

  }

  ngOnInit() {
    this.initForm();

    this.uploadPicForm = new FormGroup ({
      imgFile: new FormControl(''),
    })

    // this.getStandards();
  }

  ngOnDestroy(){
     this.ls.setLoader(true); 
    }

  initForm() {
    this.profilePic = 'parent%2f39945169084408330481.jpg?alt=media';
    this.addEmployeeForm = this.fb.group({
      "name": ['',[Validators.required]],
      "username": ['', [Validators.required, Validators.minLength(4), Validators.maxLength(20), Validators.pattern('[A-Za-z]{1}[A-Za-z0-9]{3,19}')]],
      "nickName": [''],
      "password": ['', [Validators.required, Validators.pattern('^(?=.*[0-9])[a-zA-Z0-9!@#$%^&*]{5,100}$')]],
      'email': ['', [ValidationService.emailValidator]],
      'contactNo': ['', [Validators.pattern('[2-9]{2}[0-9]{8}$')]],
      // "standardSubjects": this.fb.array([

      // ])
    })
    // this.profilePic = null;

  }

  public  submitDetails() {
       this.uploadPicForm.controls['imgFile'].reset();
    
    
    // $('#myModal').modal('show');
    this.as.addEmployee(this.addEmployeeForm.value).subscribe(res => {
      this.newEmpId = res.id;
   
   
      $('#myModal').modal('show');
    },
      err => {
        if (err == "409 - Bad Request")
          $('#errorModal').modal('show');
        else {
          this.router.navigate(['/error']);
        }
      })
  
  }

  public  getFile(event: any) {
    var blob = event.srcElement.files[0];
    if(blob)
    if (blob.type == "image/png" || blob.type == "image/jpeg" || blob.type == "image/jpg") {
      this.imgFile = event.srcElement.files[0];
    }
    else {
       this.uploadPicForm.controls['file'].reset();
      $('#errorModal').modal('show');
     }
  }

  public  changePicture() {
    this.loader = true;
    let formData = new FormData();
    formData.append('file', this.imgFile);
    this.as.uploadImage(formData, this.newEmpId).subscribe((res: any) => {
      this.profilePic = res.fileTimestamp;
     $('#myModal').modal('show');
      this.loader = false;
    },
      err => {
        this.loader = false;
        this.router.navigate(['/error']);
      })
  }
}

 // getStandards() {
  //   this.as.getStandards().subscribe(res => {
  //     this.standards = res;
  //   },
  //     err => {
  //     })
  // }

  // getSubjects(id: any, index: any) {
  //   this.hs.getSubjects(id).subscribe(res => {
  //     this.subjects[index] = res;
  //   },
  //     err => {
  //     })
  // }

  // addStandard(e: any) {
  //   const control = <FormArray>e.controls['teacherStandards'];
  //   control.push(this.inItStandard());
  // }

  // removeStandard(form: any, index: any) {
  //   const control = <FormArray>form.controls['teacherStandards'];
  //   control.removeAt(index);
  // }

  // inItStandard() {
  //   return this.fb.group({
  //     "standardId": ['', Validators.required],
  //     "subjectId": ['', Validators.required],
  //   });
  // }