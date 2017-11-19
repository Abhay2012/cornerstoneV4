import { Component, AfterViewInit, OnInit, OnDestroy } from '@angular/core';
import { MessageService } from '../../providers/message.service';
import { FormGroup, FormControl, Validators } from '@angular/forms'
import { CommonService } from '../../providers/common.service'
import { Router } from '@angular/router';
import { LoaderStop } from '../../providers/loaderstop.service';

declare let $: any;

@Component({
  selector: 'message',
  templateUrl: './message.component.html',
  styleUrls: ['./message.component.css'],

}
)

export class MessageComponent implements AfterViewInit, OnInit {

  public  fileUrl: string = "";

  //Display Old Messages
  public  messageForm: FormGroup; //Send Message on an old thread
  public  pictureForm: FormGroup;
  public  currentPage: number = 1; //For recipients
  public  noMore: boolean = false;
  public  currentMessagePage: number = 1; //For Messages
  public  noMoreMessages: boolean = false;
  public  oldMessageRecipients: any[]; //List of old messages
  public  emptyOldRecipient: boolean = false;
  public  oldMessageRecipientsCOPY: any[];
  public  selectedIndex: number; //for styling selected nav element
  public  selectedOldRecipient: any[]; // Message Array
  public  emptyOldMessages: boolean = false;

  public  emptySearchResult: boolean = false;
  public  loader: boolean = true;
  public  loader1:boolean=true;
  public  closed: boolean = false;
  public  recipientName: any;
  public  file: any;
  public  imgUrl: any;
  public  selectedId: any;
  public  currentUser: any;
  public  selcate : any = -1;

  //New Message
  public  standardsArray: any[];
  public  newMessageForm: FormGroup;
  public  students: any[];
  public  categories: any[];
  public  standard: any = "-1";
  public  selectedStudent: any;
  public  newMsg:any;

  public  standardLoader:boolean=false;
  public  studentLoader:boolean=false;
  public  categoryLoder:boolean=false;
  public  submitProgress:boolean=false;
  constructor(public  ms: MessageService, 
    public  cs: CommonService,
    public  router:Router,
    public  ls : LoaderStop) {
     
  }

  ngOnInit() {
    this.currentUser = localStorage.getItem("name");
    this.fileUrl = localStorage.getItem("fileUrl") + "/";
    this.getMessages();
    this.initForm();
    this.initnewMessageForm();
    this.getStandards();
    
    this.pictureForm = new FormGroup({
      // message: new FormControl('', [Validators.required]),
    })

  }

    ngOnDestroy(){
      this.ls.setLoader(true);
  }
  ngAfterViewInit() {

  }

  //Old Messages

  public  getMessages() {
    this.loader1 = true;
    this.ms.getAllMessages(this.currentPage).subscribe(res => {
      if (res.status == 204) {
        this.oldMessageRecipients = [];
        this.emptyOldRecipient = true;
        this.loader1 = false;
        return;
      }
      this.loader1=false;
      this.emptyOldRecipient = false;
      this.oldMessageRecipients = res;
      this.oldMessageRecipientsCOPY = this.oldMessageRecipients
      this.selectOldRecipient(this.oldMessageRecipients[0], 0);
      if (this.oldMessageRecipients.length < 12) {
        this.noMore = true;
      }
      else {
        this.noMore = false;
      }

    },
      err => {
        this.errPage();
      })

    this.loader = false;
  }

  selectstudent(a:number){
    this.selectedStudent = this.students.find(student => student.id === a);
  }

  initForm() {
    this.messageForm = new FormGroup({
      message: new FormControl('', [Validators.required]),
    });
  }

  public  selectOldRecipient(r: any, i: any) {
    this.initForm();
    this.currentMessagePage = 1;
    this.selectedIndex = i;
    this.selectedId = r.id;  //for submit
    if (r.againstParentName != null)
      this.recipientName = r.againstParentName;
    else
      this.recipientName = r.firstMessage.parentName;
    if (r.isClosed)
      this.closed = true;
    else
      this.closed = false;
    this.getSelectedMessage(this.selectedId);
  }

  
  public  getSelectedMessage(id: any) {
    this.loader = true;    
    var oldMessages: any[];
    oldMessages = this.selectedOldRecipient;
    this.ms.getMessage(id, this.currentMessagePage).subscribe(res => {
      if (res.status == 204) {
        this.selectedOldRecipient = [];
        this.emptyOldMessages = true;
        $("#noMessageModal").modal('show');
        this.currentMessagePage -= 1;
        this.getSelectedMessage(this.selectedId);
        this.loader = false;
        return;
      }
      this.selectedOldRecipient = res;
      this.emptyOldMessages = false;
      // For Old Messages
      if (this.selectedOldRecipient.length < 6 && this.currentMessagePage != 1) {
        this.noMoreMessages = true;
        this.selectedOldRecipient = oldMessages.concat(this.selectedOldRecipient);
      }

      if (this.selectedOldRecipient.length < 12) {
        this.noMoreMessages = true;
      }
      else {
        this.noMoreMessages = false;
        // this.selectedOldRecipient = res;
      }

      //For New Messages

      this.loader = false;
    },
      err => {
        this.loader = false;
        this.errPage();
      })
  }

  public  loadOldMessages() {
    // delete this.selectedOldRecipient;
    this.currentMessagePage += 1;
    this.getSelectedMessage(this.selectedId);
  }

  public  loadNewMessages() {
    // delete this.selectedOldRecipient;
    this.currentMessagePage -= 1;
    this.getSelectedMessage(this.selectedId);
  }

  public  previousPage() {
    delete this.oldMessageRecipients;
    this.currentPage -= 1;
    this.getMessages();
  }

  public  nextPage() {
    delete this.oldMessageRecipients;
    this.currentPage += 1;
    this.getMessages();
  }

  public  searchMessages(ev: any) {
    console.log("cdcdsa");
    this.oldMessageRecipients = this.oldMessageRecipientsCOPY;
    let val = ev.target.value;
    if (val && val.trim() != '') {
      this.emptySearchResult = false;
      this.oldMessageRecipients = this.oldMessageRecipientsCOPY.filter((item: any) => {
        console.log(item);
        return (item.title.toLowerCase().indexOf(val.toLowerCase()) > -1 || item.firstMessage.message.toLowerCase().indexOf(val.toLowerCase()) > -1 );
      })
      if (this.oldMessageRecipients.length === 0)
        this.emptySearchResult = true;
      else
        this.emptySearchResult = false;
    }
  }

  getFile(event: any) {
    var ext = event.srcElement.files[0];
    var reader = new FileReader();
    if(ext.type=="image/png" || ext.type=="image/jpeg" || ext.type=="image/jpg"){
      this.file = event.srcElement.files[0];
    }
    else{
       $('#errorModal').modal('show');
      // this.newMessageForm.controls['file'].reset();      
    }
    reader.onload = function (e: any) {
             $('#getFileModal').modal('show');   //file upload modal   

      $('#img33')
        .attr('src', e.target.result)
    };
    // var blob = event.srcElement.files[0];
    // if(blob.type=="image/png" || blob.type=="image/jpeg" || blob.type=="image/jpg"){
    //   this.file = event.srcElement.files[0];
    // }
    // else{
    //    $('#errorModal').modal('show');
    //   this.circular.controls['file'].reset();
    // }
    reader.readAsDataURL(event.srcElement.files[0]);

  }


  submitMessageForm() {
    this.submitProgress = true;
    this.ms.conversationComment(this.selectedId, this.messageForm.value).subscribe(res => {
      this.currentMessagePage = 1;
      this.messageForm.value['employeeName'] = this.currentUser;
      this.messageForm.value['createdAt'] = new Date();
      this.messageForm.value['employeePicTimestamp'] = localStorage.getItem("picTimestamp");
      this.selectedOldRecipient.unshift(this.messageForm.value);
      this.initForm();
      this.submitProgress = false;
    },
      er => {
        this.errPage();
      })

  }

  public  submitFormWithPicture() {
    this.submitProgress = true;
    let formData = new FormData();
    formData.append('file', this.file);
    this.ms.conversationCommentWithPicture(this.selectedId, formData).subscribe(res => {
      this.currentMessagePage = 1;
      this.getSelectedMessage(this.selectedId);
      this.file = null;
      this.submitProgress = false;
    }, er => {
      this.errPage();
    })

  }

  public  closeConversation() {
    this.loader = true;
    this.ms.closeConversation(this.selectedId).subscribe(res => {
      this.closed = true;
      this.oldMessageRecipients[this.selectedIndex].isClosed = true;

    },
      err => {
        this.errPage();
      })
    this.loader = false;
  }


  //New Message

  public  newMessage() {
    this.selectedOldRecipient = null;
    // this.createMessage = true;
    this.newMsg=true;
    // this.selectedRecipient = null;
    this.initnewMessageForm();
    // this.getStandards();
  }

  public  initnewMessageForm() {
    this.standard = -1;
    this.categories = null;
    this.students = null;
    this.newMessageForm = new FormGroup({
      // standards: new FormControl('', Validators.required),
      title: new FormControl('', [Validators.required]),
      message: new FormControl('', [Validators.required]),
      categoryId: new FormControl('', [Validators.required]),
      // againstParentId: new FormControl('', [Validators.required])
    })
  }

  public  getStandards() {
    this.standardLoader = true;
    this.ms.getStandards().subscribe(res => {
      if (res.status === 204) {
        this.standardsArray = null;
        this.standardLoader = false;
            return;
      }
    this.standardLoader = false;          
      this.standardsArray = res;
     
    },
      err => {
        this.errPage();
      })
  }

  public  onStandard(ev: any) {
    this.studentLoader = true;
      this.categoryLoder=true;    
    this.ms.getMessageCategory(ev).subscribe(res => {
      if (res.status === 204) {
        this.categoryLoder=false; 
        this.studentLoader = false;             
        this.categories = null;
        this.students = null;
        return;
      }
      this.students = res.students;
      this.students.splice(0,0,{ id:-1, name : 'Select Student' });
      this.selectstudent(-1);
      this.categories = res.categories;
      this.categories.splice(0,0,{ id:-1, name : 'Select Category' });
      this.categoryLoder=false;
      this.studentLoader = false;
    },
      err => {
        this.errPage();
      })
  }

  public  submitNewMessage() {
    this.loader = true;
    var temp = {
      againstParentId: this.selectedStudent.parentId,
      againstStudentId: this.selectedStudent.id,
    }
      ;
    temp = Object.assign(temp, this.newMessageForm.value)
    this.ms.newConversation(temp).subscribe(res => {
      this.getMessages();
      $("#submitModal").modal('show');
      this.initnewMessageForm();
    },
      err => {
        this.errPage();
      })
    this.loader = false;
  }

  public  errPage() {
    this.loader = false;
    this.router.navigate(['/error']);
  }

}
