import { Component, OnInit, OnDestroy } from '@angular/core';
import { HomeworkService } from '../../../providers/homework.service';
import { Router } from '@angular/router';
import { LoaderStop } from '../../../providers/loaderstop.service';


@Component({
  selector: 'current-homework',
  templateUrl: './homework.html',
  styleUrls: ['./../homework.component.css']
})

export class CurrentHomework implements OnInit, OnDestroy {
  public  selectedHomework: any;
  public  fileUrl: string;
  public  title: string = "Homework";
  public  icon: string = "book";
  public  currentPage = 1;
  public  homeworks: any = [];
  public  dispurl : any ;
  loader: boolean = false;
  public  EmptyHomeworks: boolean = true;
  public  imgindex:number=0;

  constructor(public homeworkService: HomeworkService, public ls : LoaderStop,
    public  router: Router) { this.ls.setLoader(false); }

  ngOnInit(): void {
    this.fileUrl = localStorage.getItem("fileUrl") + "/";
    this.getHomeworks();
  }

    ngOnDestroy(){
      this.ls.setLoader(true);
  }
  public  getHomeworks() {
    // this.nl.showLoader();
    this.loader = true;
    this.homeworkService.getHomework(this.currentPage).subscribe((data) => {
      this.onSuccess(data);
    }, (err) => {
      this.loader = false;
      this.router.navigate(['/error']);
    });
  }

  public  noMore: boolean = true;
  public  onSuccess(res: any) {
    // this.nl.hideLoader();
    this.loader = false;
    if (res.status === 204) {
      this.EmptyHomeworks = true;
    } else {
      this.EmptyHomeworks = false;
      if(this.currentPage ==1)
      this.homeworks = res;
      else
      this.homeworks = this.homeworks.concat(res);
      if (res.length < 12) this.noMore = true;
      else this.noMore = false;

    }
  }

  public  onError(err: any) {
    this.loader = false;
    this.router.navigate(['/error']);
  }

  // public  previousHomework() {
  //   delete this.homeworks;
  //   this.currentPage -= 1;
  //   this.getHomeworks();
  // }

  public  nextHomework() {
    // delete this.homeworks;
    this.currentPage += 1;
    this.getHomeworks();
  }
  public  swipe(a:number){
    console.log(a);
    this.imgindex+=a;
  }
    public  swipebydots(a:number){
    console.log(a);
    this.imgindex=a;
  }
  public  seletToExpand(a: any, i:any) {
    this.selectedHomework = a;
    console.log("index :" + this.imgindex);
    this.imgindex = 0;
    console.log("index :" + this.imgindex);
    if(a.files){
      this.dispurl= this.fileUrl + a.files[0].fileTimestamp;
    }
    console.log(this.dispurl);
    console.log(this.selectedHomework);
  }
}
