import { Component, OnInit,AfterViewInit, OnDestroy  } from '@angular/core';
import { HomeworkService } from '../../../providers/homework.service';
import { Router } from '@angular/router';
import { LoaderStop } from '../../../providers/loaderstop.service';

@Component({
  selector: 'passed-homework',
  styleUrls: ['./../homework.component.css'],
  templateUrl: './homework.html'
})

export class PassedHomework implements OnInit{

  public  fileUrl: string;
  public  title: string = 'Homework';
  public  icon: string = "book";
  public  EmptyHomeworks = true;
  public  homeworks: any = [];
  currentPage = 1;
  dispurl : any;
  loader: boolean = false;
   public  imgindex:number=0;
  public  selectedHomework: any;

  constructor(public homeworkService: HomeworkService,
    public  router: Router,
    public  ls : LoaderStop
  ) {
  }

  ngOnInit(): void {
    this.ls.setLoader(false);
    this.fileUrl = localStorage.getItem("fileUrl") + "/";
    this.getHomeworks();
  }

    ngOnDestroy(){
      this.ls.setLoader(true);
  }

  public  getHomeworks() {
    this.loader = true;
    this.homeworkService.getOldHomework(this.currentPage).subscribe((data) => {
      this.onSuccess(data);
    }, (err) => {
      this.loader = false;
      this.router.navigate(['/error']);
    });
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
//   ngAfterViewInit(){
//         //loading on scroll
//     $(window).scroll(function () { 
//    if ($(window).scrollTop() >= $(document).height() - $(window).height() - 10) {
//       alert('end of page');
//       this.nextHomework();
//    }
// });
//   }
  public  doRefresh(refresher: any) {
    setTimeout(() => {
      this.homeworkService.getOldHomework(1).subscribe((res) => {
        this.onSuccess(res);
        refresher.complete();
      }, (err) => {
        refresher.complete();
        this.onError(err);
      });
    }, 500);
  }
  noMore: boolean = true;
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

  public  doInfinite(infiniteScroll: any) {
    this.currentPage += 1;
    setTimeout(() => {
      this.loadMoreData(infiniteScroll);
    }, 500);
  }

  public  loadMoreData(infiniteScroll: any) {
    this.homeworkService.getOldHomework(this.currentPage).subscribe((res) => {
      infiniteScroll.complete();
      this.loadDataSuccess(res);
    }, (err) => {
      infiniteScroll.complete();
      this.loadDataError(err);
    });
  }

  public  loadDataSuccess(res: any) {
    if (res.status === 204) {
      this.currentPage -= 1;
      return;
    }
    let newHomework = res;
    this.homeworks = this.homeworks.concat(newHomework);
  }

  public  loadDataError(err: any) {
    this.currentPage -= 1;

    this.loader = false;
    this.router.navigate(['/error']);
  }

  public  swipe(a:number){
    console.log(a);
    this.imgindex+=a;
  }
    public  swipebydots(a:number){
    console.log(a);
    this.imgindex=a;
  }

  // public  seletToExpand(a: any) {
  //   this.selectedHomework = a;
  // }

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


