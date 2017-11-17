import { Component, OnInit , OnDestroy } from '@angular/core';
import { LoggedInGuard } from '../login/login.gaurd';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { CommonService } from '../../providers/common.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AuthService } from '../../providers/auth.service';
import { LoaderStop } from '../../providers/loaderstop.service';

declare let $: any;

@Component({
    selector: 'my-account',
    templateUrl: './account.component.html',
    styleUrls: ['./account.component.css']
})

export class AccountComponent implements OnInit, OnDestroy {
    public  details: any;
    public  uploadPicForm: FormGroup;
    public  id:any;
    public  name: any = "";
    public  nickName: any;
    public  picUrl: any;
    public  role: any;
    public  email: any;
    public  url: any = "";
    public  newPicTimestamp: any;
    public  imgFile: any;
    public  loader: boolean = false;
	public  error : boolean = false;
    public  resetform:FormGroup;
    public  passwordMismatch:any="";
    constructor(public  lg: LoggedInGuard,
        public  ls : LoaderStop,
        public  cs: CommonService,
        public  au: AuthService,
        public  router: Router,
        public  route: ActivatedRoute, ) {
          
        this.url = this.router.url;

    }


    ngOnInit() {
        this.buildForm();
        this.loadAccountDetails(this.details);
       this.initForm();

    }
    ngOnDestroy(){
     this.ls.setLoader(true); 
    }

    public  initForm(){
         this.uploadPicForm = new FormGroup({
            imgFile: new FormControl("", [Validators.required]),

        })
    }

    mismatch:boolean=false;

  public  buildForm() {
    this.resetform = new FormGroup({
      oldPassword: new FormControl('', [Validators.required]),
      newPassword: new FormControl('', [Validators.required, Validators.minLength(3)]),
      confirmPassword: new FormControl('', [Validators.required, Validators.minLength(3)]),
    }, passwordMatchValidator);
    function passwordMatchValidator(g: FormGroup) {
       return g.get('newPassword').value === g.get('confirmPassword').value ? null : {'mismatch': true};
    }
  }

    public  loadAccountDetails(details: any) {

        this.name = this.lg.getData('name');
        this.nickName = this.lg.getData('nickName');
        this.role = this.lg.getData('role');
        this.email = this.lg.getData('email');
        this.picUrl = this.lg.getData('picUrl');
        this.id=this.lg.getData('id');

    }

     getFile(event: any) {
    var blob = event.srcElement.files[0];
    if(blob.type=="image/png" || blob.type=="image/jpeg" || blob.type=="image/jpg"){
      this.imgFile = event.srcElement.files[0];
    }
    else{
       $('#errorModal').modal('show');
      this.initForm();
    }
  }

    public  submitAccountDetails( ) {
        this.loader = true;
        let formData = new FormData();
        formData.append('file', this.imgFile);
        this.au.uploadImage(formData).subscribe((res: any) => {
            localStorage.setItem('picUrl', localStorage.getItem('fileUrl') + "/" + res.fileTimestamp);
            $('#myModal').modal('hide');
            this.uploadPicForm.reset();
            this.loader = false;
        },
            err => {
                this.loader = false;
                this.router.navigate(['/error']);
            })

    }

    public  resetImage(){
        this.loader=true;
        this.au.resetImage().subscribe(res=>{
        this.loader=false;
        },err=>{
            this.loader=false;            
            this.router.navigate(['/error']);
        })
    }

    onclick(){
  	this.error = false;
  }
  onSubmit(){
  	this.au.resetPassword(this.resetform.value)
    .subscribe(response => {
    },err => {
        $('#mismatch').modal('show');
    });
    

  }

 
}