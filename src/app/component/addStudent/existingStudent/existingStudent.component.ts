import { Component, OnDestroy } from '@angular/core';
import { Location } from '@angular/common';
import { AdminService } from '../../../providers/admin.service';
import { FormGroup, FormArray, FormControl, FormBuilder, Validators } from '@angular/forms';
import { ValidationService } from '../../../providers/formValidation.service';
import { Router, ActivatedRoute } from '@angular/router';
import { LoaderStop } from '../../../providers/loaderstop.service';
// import { Order } from '../../../providers/order.filter'; 



declare let $: any;
@Component({
  selector: 'existing-student',
  templateUrl: './existingStudent.component.html',
  styleUrls: ['./existingStudent.component.css'],
  // pipes:['Order'];
})

export class ExistingStudentComponent implements OnDestroy {

  public  loader: boolean = false;
  public  standardLoader:boolean=false;
  public  studentLoader:boolean=false;  
  public  addForm: number; //for add sibling/parent form



  public  students: any[]=[];
  public  standards: any[];
  public  addSiblingForm: FormGroup;
  public  selectedStudent: any;
  public  parentLimit: number;
  public  siblingLimit: number;
  public  addParentForm: any;
  public  edit1: boolean = false;
  public  edit2: boolean = false;
  public  edit3: boolean = false;
  public  editStudentForm: FormGroup;
  public  editParentForm: FormGroup;
  public  uploadPicForm: FormGroup;
  public  selectedSibling: any;
  public  selectedParent: any;
  public  imgFile: any;
  public  selectedImageUpload: any;
  public  fileUrl: any;
  public  emptySearchResult: any;
  public  studentsCOPY: any=[];
  public  selectedStandardId:any;
  public  showStudent:boolean=false;
  public  totalStudents:any;
  public  studentsInfo:any[];
  public  showSearch:boolean=false;
  public  showTable:boolean=false;
  public  filter:any=1;
  public  showSibling:boolean=true;
  public  showParent:boolean=true;
  public  showStudentOnly:boolean=false;
  public  noStudents:boolean=false;
  public  standardId:any="";
  // public  showStudentDetails:boolean=false;
  constructor(public  _location: Location,
    public  as: AdminService,
    public  fb: FormBuilder,
    public  router: Router,
    public  ls : LoaderStop,
    public  actRoute:ActivatedRoute) {

    this.actRoute.params.subscribe((param:any)=>{
      if(param['standardId'])  this.standardId = param['standardId'];
      if(param['studentId'])  this.getStudentDetails(param['studentId']);
    })

    this.fileUrl = localStorage.getItem('fileUrl');
    this.ls.setLoader(false);
    this.getStandards();
    // this.initNewStudentForm();
    // this.getStudents();
    // this.initEditParentForm();
    // this.initAddSiblingForm();
    this.uploadPicForm = new FormGroup({
      file: new FormControl(''),
    });

  }

  public  getStandards() {
    this.standardLoader = true;
    this.as.getStandards().subscribe(res => {
      this.standards = res;
      console.log(res);
    this.standardLoader = false;
    },
      err => {
        this.errorPage();
      })
  }

  public  onSelectStandard(e:any){
    this.selectedStandardId=e;
    this.showSearch=true;
    this.getStudents();    
    this.showStudent=true;
  }

  ngOnDestroy(){
     this.ls.setLoader(true); 
    }

  public  getStudents() {
    this.studentLoader = true;
    this.as.getStudents(this.selectedStandardId).subscribe(res => {
      if(res.status==204){
        this.noStudents=true;
      }
      this.noStudents=false;
      this.totalStudents=res.length;
      this.students = res;
      this.studentsCOPY = this.students;
    this.studentLoader = false;
    },
      err => {
        // this.loader = false;
        this.errorPage();
      })
  }
  public  selected: boolean = false;
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

  public  getStudentDetails(ev: any) {
    this.showTable=false;
    this.showSearch=true;
    this.loader = true;
    this.selected = false;
    this.initAddParentForm();
    this.initAddSiblingForm();
    this.as.getStudentDetails(ev).subscribe(res => {

      this.selectedStudent = res;
      this.parentLimit = 3 - this.selectedStudent.parents.length;
      this.siblingLimit = 10 - this.selectedStudent.siblings.length;
      this.loader = false;
    }, err => {
      this.errorPage();

    })
  }

  public  getStudentsByStd(){
    // this.showStudentDetails=false;
    this.loader=true;
      this.showTable=true;
      this.showSearch=false;
    
    this.as.getAllStudents(this.selectedStandardId).subscribe(res=>{
      this.loader=false;
      this.studentsInfo=res;
    },err=>{
      this.errorPage();
    })
  }

  public  initAddSiblingForm() {
    // this.getSiblings();
    this.addSiblingForm = this.fb.group({
      students: this.fb.array([
        this.inItSibling(),
      ])
    })
  }

  public  inItSibling() {
    return this.fb.group({
      "name": ['', [Validators.required]],
      "standardId": ['', [Validators.required]]
    });
  }

  public  addSibling(e: any) {
    const control = <FormArray>e.controls['students'];
    control.push(this.inItSibling());
  }

  public  removeSibling(form: any, index: any) {
    const control = <FormArray>form.controls['students'];
    control.removeAt(index);
    if (control.length == 0) {
      this.addForm = null;
    }
  }

  public  submitSibling() {
    this.loader = true;
    this.as.addSibling(this.selectedStudent.id, this.addSiblingForm.value.students).subscribe(res => {
      $('#updateModal').modal('show');
      this.getStudentDetails(this.selectedStudent.id);
      this.initAddSiblingForm();
      this.loader = false;
    },
      err => {
        // this.loader = false;
        this.errorPage();
      })

  }

  public  initAddParentForm() {
    this.addParentForm = new FormGroup({
      name: new FormControl('', [Validators.required]),
      nickName: new FormControl(''),
      contactNo: new FormControl('', [Validators.required, Validators.maxLength(12),Validators.minLength(9)]),
      email: new FormControl('', [ValidationService.emailValidator]),
    })
  }

  public  submitParentForm() {

    var studentIds = [this.selectedStudent.id];
    // studentIds.push(this.selectedStudent.id);
    this.selectedStudent.siblings.forEach((element: any) => {
      studentIds.push(element.id);
    })

    this.addParentForm.addControl("studentIds", new FormControl(studentIds));
    this.loader = true;
    this.as.addParent(this.selectedStudent.id, this.addParentForm.value).subscribe(res => {
      this.getStudentDetails(this.selectedStudent.id);
      $('#updateModal').modal('show');
      this.initAddParentForm();
      this.loader = false;
    },
      err => {
        this.loader = false;
        if (err === "400 - Bad Request") {
          this.initAddParentForm();
          $('#errModal').modal('show');
        }
        else {
          this.errorPage();
        }
      })

  }

  //Update Information

  public  initEditStudentForm() {
    this.editStudentForm = new FormGroup({
      name: new FormControl(this.selectedSibling.name, [Validators.required]),
      standardId: new FormControl(this.selectedSibling.standardId, [Validators.required]),
    })
  }

  public  submitEditStudentForm() {
    this.loader = true;
    this.as.updateStudent(this.selectedSibling.id, this.editStudentForm.value).subscribe(res => {

      $('#editSiblingModal').modal('hide');
      this.getStudentDetails(this.selectedStudent.id);
      $('#updateModal').modal('show');
      this.loader = false;
    },
      err => {
        this.errorPage();
      })
  }



  public  submitEditParentForm() {
    this.loader = true;
    this.as.updateParent(this.selectedParent.id, this.editParentForm.value).subscribe(res => {
      this.loader = false;      
      $('#editParentModal').modal('hide');
      this.getStudentDetails(this.selectedStudent.id);
      $('#updateModal').modal('show');
      this.editParentForm.reset;
    },
      err => {
      this.loader = false;        
        this.errorPage();
      })
  }

  public  uploadParentImage() {
    this.loader = true;
    let formData = new FormData();
    formData.append('file', this.imgFile);
    this.as.uploadParentImage(this.selectedImageUpload.id, formData).subscribe(res => {
      this.getStudentDetails(this.selectedStudent.id);
      $('#updateModal').modal('show');
      this.uploadPicForm.reset();
      this.loader = false;
    },
      err => {
        this.errorPage();
      })
    this.selectedImageUpload = null;
  }

  public  uploadStudentImage() {
    this.loader = true;
    let formData = new FormData();
    formData.append('file', this.imgFile);
    this.as.uploadStudentImage(this.selectedImageUpload.id, formData).subscribe(res => {
      this.getStudentDetails(this.selectedStudent.id);
      $('#updateModal').modal('show');
      this.uploadPicForm.reset();
      this.loader = false;
    },
      err => {
        this.errorPage();
      })
    this.selectedImageUpload = null;
  }

  getFile(event: any) {
    var blob = event.srcElement.files[0];
    if (blob)
      if (blob.type == "image/png" || blob.type == "image/jpeg" || blob.type == "image/jpg") {
        this.imgFile = event.srcElement.files[0];
      }
      else {
        this.uploadPicForm.controls['file'].reset();
        $('#errorModal').modal('show');
      }

  }

  public  errorPage() {
    this.loader = false;
    this.router.navigate(['/error']);
  }

  public  filterDetails(e:any){
    if(e==1){
      this.showParent=true;
      this.showSibling=true;
      this.showStudentOnly=false;
    }

    else if(e==2){
      this.showParent=false;
      this.showSibling= true;
      this.showStudentOnly=false;
    }

    else if(e==3){
      this.showParent=true;
      this.showSibling=false;
      this.showStudentOnly=false;
    }
    else if(e==4){
      this.showParent=false;
      this.showSibling=false;
      this.showStudentOnly=true;
    }
  }
// public  order:any;
//   public  orderDetails(e:any){    
//     if(e==1){
//       this.studentsInfo.reverse;
//     }
//   }

  public  initEditParentForm() {
    if (this.selectedParent)
      this.editParentForm = new FormGroup({
        name: new FormControl(this.selectedParent.name),
        nickName: new FormControl(this.selectedParent.nickName),
        email: new FormControl(this.selectedParent.email, [ValidationService.emailValidator]),
        // contactNo: new FormControl(this.selectedParent.contactNo,[Validators.maxLength(12),Validators.minLength(9)])
      });
  }
    
public  contactNo:any;
public  contactControl:boolean=false;
public  onContact(e:any){
  if(this.selectedParent.contactNo!=e){
    this.contactControl=true;    
    this.editParentForm.addControl("contactNo", new FormControl(this.selectedParent.contactNo, [Validators.maxLength(12),Validators.minLength(9)]));
    this.editParentForm.controls['contactNo'].patchValue(e);
    // if(this.editParentForm.controls.contactNo.dirty || !this.editParentForm.dirty || this.editParentForm.invalid){
    //   $('#submitBtn').addClass('disabled');
    // }

    // else{
    //   $('#submitBtn').removeClass('disabled');
      
    // }

  }
  else{
    this.contactControl=false;    
    this.editParentForm.removeControl('contactNo');
    
  }
}

}