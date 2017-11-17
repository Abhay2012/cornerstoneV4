import {Component, OnInit, OnDestroy} from '@angular/core';
import { CircularService } from '../../providers/circular.service';
import { Router } from '@angular/router';
import { LoaderStop } from '../../providers/loaderstop.service';
@Component({
  selector:'circular',
  templateUrl:'./circular.component.html',
  styleUrls:['./circular.component.css']
})
export class CircularComponent implements OnInit, OnDestroy {

  title: string = 'Circular';
  public  icon = "ios-paper-outline";
  public  allCirculars:any;
  public currentPage = 1;
  public  circulars:any;
  public EmptyCirculars: boolean = true;
  public  loader:boolean = false;
  public  fileUrl: string;
  public  selectedCircular:any;
   public  noMore:boolean = true;
   public  imgindex:number = 0;
  constructor(public circularService: CircularService,
                public  router: Router , public ls : LoaderStop) {
    this.ls.setLoader(false);
                   
    
  }

  ngOnInit() {
    this.fileUrl = localStorage.getItem("fileUrl") + "/";
    this.getCirculars();
  }

  ngOnDestroy(){
    this.ls.setLoader(true);
  }

  public getCirculars() {
    this.loader = true;
    this.circularService.GetCirculars(this.currentPage).subscribe((res) => {
      this.onSuccess(res);
      console.log(res);
    }, (err) => {
      this.onError(err);
    });
  }
 
  public onSuccess(data:any) {
    this.loader = false;
    if (data.status === 204) {  
      this.circulars = [];    
      this.EmptyCirculars = true;
      return;
    } else {
      if(this.currentPage==1)this.circulars=data
      else
      this.circulars = this.circulars.concat(data);
      if(data.length < 12) this.noMore = true;
      else this.noMore = false;
      this.EmptyCirculars = false;
    }
  }

  public onError(err:any) {
     this.loader = false;
      this.router.navigate(['/error']);
  }

  previousCircular(){
    delete this.circulars;
    this.currentPage -= 1;
    this.getCirculars();
  }

   public  swipe(a:number){
    console.log(a);
    this.imgindex+=a;
  }
    public  swipebydots(a:number){
    console.log(a);
    this.imgindex=a;
  }


  nextCircular(){
    // delete this.circulars;
    this.currentPage += 1;
    this.getCirculars();
  }

  try(){
    console.log("working");
  }

  // public  onCircularSelected(circular) {
  //   this.circularService.GetparticularCircular(circular.id).subscribe((res) => {
      
  //   }, (err) => {

  //   })
  // }

 public  seletToExpand(circular:any){
   this.imgindex = 0;
   console.log(circular);
    this.selectedCircular = circular;
  }

  // pdfDisplay(name : String){
  //   if(name.indexOf('.pdf')){
  //     return true;
  //   }
  //   return false;
  // }
  //   imgDisplay(name : String){
  //   if(name.indexOf('.pdf')){
  //     return false;
  //   }
  //   return true;
  // }

  // public  doRefresh(refresher) {
  //   setTimeout(() => {
  //     this.circularService.GetCirculars(1).subscribe((res) => {
  //       this.onSuccess(res);
  //       refresher.complete();
  //     }, (err) => {
  //       refresher.complete();
  //       this.onError(err);
  //     });
  //   }, 500);
  // }

  // public  doInfinite(infiniteScroll) {
  //   this.currentPage += 1;
  //   setTimeout(() => {
  //     this.circularService.GetCirculars(this.currentPage).subscribe(response => {
  //       infiniteScroll.complete();
  //       if (response.status === 204) {
  //         this.currentPage -= 1;
  //         return;
  //       }
  //       this.circulars = this.circulars.concat(response);
  //     }, (err) => {
  //       this.currentPage -= 1;
  //       infiniteScroll.complete();
  //     });
  //   }, 1000);
  // }
}