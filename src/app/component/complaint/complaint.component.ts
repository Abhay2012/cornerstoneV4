import { Component, AfterViewInit, OnInit, OnDestroy } from '@angular/core';
import { LoaderStop } from '../../providers/loaderstop.service';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { ComplaintService } from '../../providers/complaint.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
declare let $: any;

@Component({
  selector: 'complaint',
  templateUrl: './complaint.component.html',
  styleUrls: ['./complaint.component.css']
})
export class ComplaintComponent implements OnInit, AfterViewInit, OnDestroy {

  public  editForm: FormGroup;
  public  closeForm: FormGroup;
  public  complaints: any;
  public  employees: any;
  public  priorities: any;
  public  comments: any;

  public  commentForm: FormGroup;
  public  EmptyComments: boolean = false;
  public  complaintStatus: any;
  public  complaintCategory: any;
  public  complaintsCOPY: any;
  public  EmptyComplaints: boolean = true;
  public  loader: boolean = false;
  public  loader1: boolean = false;
  public  loaderComment: boolean = false;
  public  currentPage = 1;
  public  emptySearchResult: boolean = false;
  public  urlForComment: any;
  public  complaint = {
    title: ""
  }
  public  fileUrl: string;

  public  url: string = "";
  public  status: string = "";
  public  count: any = 0;
  constructor(public  cs: ComplaintService,
    public  ls : LoaderStop,  
    public  router: Router,
    public  route: ActivatedRoute ) {
       
    this.url = this.router.url;

    this.route.params.subscribe(param => {
      if (param['statusId']) this.complaintStatus = param['statusId'];
      if (param['categoryId']) this.complaintCategory = param['categoryId'];
      this.urlForComment = (this.router.url).split('/')[1];
    });
    switch (this.complaintStatus) {
      case '1': this.status = "New"; break;
      case '2': this.status = "Assigned"; break;
      case '3': this.status = "InProgress"; break;
      case '4': this.status = "Closed"; break;
      case '5': this.status = "Reopen"; break;
      case '6': this.status = "Satisfied"; break;
      default: this.status = "All"; break;
    }
  }

  ngOnInit() {
    this.fileUrl = localStorage.getItem("fileUrl") + "/";
    this.fetchComplaints();
    this.ls.setLoader(false);
    this.getEditInfo();
    this.loadForm();
    this.commentForm = new FormGroup({
      comment: new FormControl("")
    });
    this.closeForm = new FormGroup({
      rca: new FormControl("", [Validators.required]),
      comment: new FormControl("", [Validators.required])
    })
  }

    ngOnDestroy(){
    this.ls.setLoader(true);
  }

  public  getEditInfo() {
    this.cs.editInfo().subscribe(response => {

      this.employees = response.employees;
      this.priorities = response.priorities;
    },
      error => {
        this.employees = [];
        this.priorities = [];
        this.router.navigate(['/error']);
      })
  }

  ngAfterViewInit() {
    
    //loading on scroll
//     $(window).scroll(function () { 
//    if ($(window).scrollTop() >= $(document).height() - $(window).height() - 10) {
//       // alert('end of page');
//       this.nextComplaint();
//    }
// });
    $('.panel.panel-chat').hide();
    $(".panel.panel-chat > .panel-heading > .chatMinimize").click(function () {
      if ($(this).parent().parent().hasClass('mini')) {
        $(this).parent().parent().removeClass('mini').addClass('normal');

        $('.panel.panel-chat > .panel-body').animate({ height: "250px" }, 500).show();

        $('.panel.panel-chat > .panel-footer').animate({ height: "75px" }, 500).show();
      }
      else {
        $(this).parent().parent().removeClass('normal').addClass('mini');

        $('.panel.panel-chat > .panel-body').animate({ height: "0" }, 500);

        $('.panel.panel-chat > .panel-footer').animate({ height: "0" }, 500);

        setTimeout(function () {
          $('.panel.panel-chat > .panel-body').hide();
          $('.panel.panel-chat > .panel-footer').hide();
        }, 500);
      }

    });
    $(".panel.panel-chat > .panel-heading > .chatClose").click(function () {
      // $(this).parent().parent().remove();
      $(this).parent().parent().hide();
    });
  }

  public  fetchComplaints() {
    this.loader = true;
    this.cs.getComplaint(this.url, this.currentPage).subscribe((res) => {

      this.onSuccess(res);
    }, (err) => {
      this.onError(err);
    });
  }
  public  noMore: boolean = true;

  public  onSuccess(res: any) {
    this.loader = false;
    if (res.status !== 204) {
      this.EmptyComplaints = false;
      if (this.currentPage == 1)
        this.complaints = res;
      else
        this.complaints = this.complaints.concat(res);
      if (res.length < 12) this.noMore = true;
      else this.noMore = false;
    } else {
      this.EmptyComplaints = true;
    }
  }

  public  onError(err: any) {
    this.complaints = [];
    this.router.navigate(['/error']);
  }

  public  selectedComplaint: any;
  public  selectedIndex: any;

  public  selectComplaint(complaint: any, index: any) {
    this.selectedComplaint = complaint;
    this.selectedIndex = index;
    this.loadFormValue();

  }

  public  seletToExpand(c: any, i: any) {
    this.selectedComplaint = c;
    this.selectedIndex = i;
  }

  public  updateComplaint() {
    if (this.editForm.value['statusId'])
      this.editForm.value['statusId'] = 3;
    else {
      this.loader1 = true;
      delete this.editForm.value['statusId'];
    }
    // if(this.editForm.value['assignedTo'] == this.selectedComplaint.assignedEmployeeId)
    //   delete this.editForm.value['assignedTo'];
    // if(this.editForm.value['priorityId'] == this.selectedComplaint.priorityId)
    //   delete this.editForm.value['priorityId'];
    this.cs.updateComplaint(this.selectedComplaint.id, this.editForm.value, this.urlForComment).subscribe(response => {
      this.complaints[this.selectedIndex] = response;

      this.loader1 = false;
      $('#myModal').modal('hide');
    }, error => {
      this.loader = false;
      this.router.navigate(['/error']);
    });
  }

  public  loadForm() {
    this.editForm = new FormGroup({
      assignedTo: new FormControl(''),
      priorityId: new FormControl(''),
      statusId: new FormControl('')
    })
  }

  public  loadFormValue() {
    this.editForm.patchValue({ "assignedTo": this.selectedComplaint.assignedEmployeeId });
    this.editForm.patchValue({ "priorityId": this.selectedComplaint.priorityId });
  }

  public  closeComplaint() {
    this.loader1 = true;
    this.cs.closeComplaint(this.selectedComplaint.id, this.closeForm.value, this.urlForComment).subscribe(response => {
      this.complaints[this.selectedIndex] = response;
      $('#myModal3').modal('hide');
    }, error => {
      this.router.navigate(['/error']);
    });
    this.loader1 = false;
  }



  public  previousComplaint() {
    delete this.complaints;
    this.currentPage -= 1;
    this.fetchComplaints();
  }

  public  nextComplaint() {
    // delete this.complaints;
    this.currentPage += 1;
    this.fetchComplaints();
  }

  public  loadComplaints() {
    this.complaints = this.complaintsCOPY;
  }

  public  resetComplaints() {
    this.loadFormValue();
  }

  // public  searchComplaints(ev: any) {
  //   let val: any = ev.target.value;
  //   if (val && val.trim() != '') {
  //     this.loader = true;
  //     this.emptySearchResult = false;

  //     this.cs.searchComplaints(this.currentPage, { "search": val }).subscribe((res: any) => {
  //       if (res.status == 204) {
  //         this.complaints = [];
  //         this.loader = false;
  //         this.emptySearchResult = true;
  //         return;
  //       }
  //       this.loader = false;
  //     },
  //       (error: any) => {
  //         this.loader = false;
  //       })
  //   }
  //   else {
  //     this.emptySearchResult = false;
  //     this.complaints = this.complaintsCOPY;
  //   }

  // }

  public  complaintIdOfCommentModel: any;
  public  complaintTitleOfCommentModel: any;
  public  closed: boolean = false;
  currentUser = this.cs.getUserId();

  getComplaintCommentById(complaint: any) {

    this.comments=null;
    this.loaderComment = true;
    if (complaint == undefined)
      complaint = this.selectedComplaint;

    this.selectedComplaint = complaint;
    this.cs.getComplaintCommentById(this.urlForComment, complaint.id).subscribe((res) => {
      if (res.status === 204) {
        this.EmptyComments = true;
        this.comments = [];
        this.count = 0;
        this.loaderComment = false;
        return;
      }
      this.EmptyComments = false;
      this.comments = res;
      this.count = this.comments.length;
      this.loaderComment = false;
    }, (err) => {
      delete this.comments;
      this.loaderComment = false;
      this.router.navigate(['/error']);
    });
    if (complaint.closedOn || complaint.statusId == 6)
    { this.closed = true; }
    else { this.closed = false; }
    this.complaintIdOfCommentModel = complaint.id;

    this.complaints.forEach((element: any) => {
      if (element['id'] == complaint.id)
        this.complaintTitleOfCommentModel = element.title;
    });
    this.sockJsConnection();
  }
  // getComplaintCommentById(complaint: any) {
  //   if (complaint.closed || complaint.statusId == 6) this.closed = true;
  //   this.complaintIdOfCommentModel = complaint.id;

  //   this.complaints.forEach((element: any) => {
  //     if (element['id'] == complaint.id)
  //       this.complaintTitleOfCommentModel = element.title;
  //   });

  //   this.cs.getComplaintCommentById(this.url, complaint.id).subscribe((res) => {
  //     if (res.status === 204) {
  //       this.EmptyComments = true;
  //     } else {
  //       this.EmptyComments = false;
  //       this.comments = res;

  //     }
  //   }, (err) => {
  //     delete this.comments;
  //     this.cs.showToast("Internal server error.. Try again later");
  //   });
  // }
  public  submitComment() {
    this.EmptyComments = false;
    if (this.commentForm.value['comment'])
      this.cs.postComplaintComment(this.complaintIdOfCommentModel, this.commentForm.value, this.urlForComment).subscribe((res) => {
        this.commentForm.value['employeeId'] = this.currentUser;
        this.commentForm.value['createdAt'] = new Date();
        this.commentForm.value['employeePicUrl'] = localStorage.getItem('picTimestamp')
        this.comments.push(this.commentForm.value);

        this.commentForm.reset();
      }, (err) => {
        this.router.navigate(['/error']);
      });
  }

  public  sockJsConnection() {
    let stompClient = this.cs.getSockJs();
    let url = '/management/complaint/'+ this.selectedComplaint.id +'/comment';
    let that = this;
    stompClient.connect({}, function (frame : any ) {
    stompClient.subscribe(url, function (greeting : any) {
    let message = JSON.parse(greeting.body);
    if (!message) {
      return;
    }
    if (!that.comments) {
      that.comments = [];
    }
      that.comments.push(message);
    });
    });
}

  public  clearComment() {
    delete this.comments;
  }

  public  openModal(complaint: any) {
    this.complaint = complaint;
    $('#modal1').modal('show');
  }
}