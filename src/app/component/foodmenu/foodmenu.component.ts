import {Component, AfterViewInit, OnDestroy } from '@angular/core';
import { FoodmenuService} from '../../providers/foodmenu.service';
import { FormGroup, FormArray, FormControl, Validators } from '@angular/forms';
import * as moment_ from 'moment';
import { Http } from '@angular/http';
import 'fullcalendar';
import * as _ from 'jquery';
import { Router } from '@angular/router';
declare let $: any;
import { LoaderStop } from '../../providers/loaderstop.service';

@Component({
    selector:'foodmenu',
    templateUrl:'./foodmenu.component.html',
    styleUrls:['./foodmenu.component.css'],
})

export class FoodmenuComponent implements AfterViewInit, OnDestroy{

    public  addItem:FormGroup;
    public  addMenu:FormGroup;
    public  message:any;
    public  heading:any;
    public  menuMonth:any;
    public  foodItems:any[] = [];
    public  duplicate :any = false;
    public  loader:boolean=false;
    public  itemLoader:boolean=false;
    public  start:any;
    public  snackslist:any[]=["Drag Items Here for Snacks"];
    public  lunchlist:any[]=["Drag Items Here for Lunch"];
    public  selectedMenu:any={};
    // public  submitProgress:any;
    public  tryfoodtype : any = "0";
    public  startMenuS : number = 0;
    public  endMenuS : number = 4;
    public  startMenuL : number = 0;
    public  endMenuL : number = 4;
    public  startMenu : number = 0;
    public  endMenu : number = 4;
    public  foodItemsL : any[]=[];
    public  foodItemsS : any[]=[];
    public  foodItemsL1 : any[]=[];
    public  foodItemsS1 : any[]=[];
    public foodItemIds : any [] = [];
    public  emptyL : boolean =true;
    public  emptyS : boolean =true; 
    constructor(
        public ls : LoaderStop,
        public fs:FoodmenuService,
            public http: Http,
    ){
        this.ls.setLoader(false);
        this.addItem=this.addItemForm();
        this.addMenu=this.addMenuForm();
        // this.getMenu();
        this.getItem();
    }


      ngAfterViewInit(){
    //   _('#menu').fullCalendar('renderEvents', this.menuOptions.events, true); 
  }
  ngOnDestroy(){
      this.ls.setLoader(true);
  }

        public  menuOptions:any={
        fixedWeekCount: false,
        editable: true,
        eventLimit: true,
        firstDay: 1,
        selectable: true,
        selectHeader: true,
        timeFormat: ' ',
        header: {
          right: 'today,month,listMonth, deleteItem, addItem prev,next '
        },
            customButtons: {
        deleteItem : {
            text: 'Food Item -',
            click: function() {
  
                $('#deleteItemModal').modal();
            }
                },
        addItem: {
            text: 'Food Item +',
            click: function() {
  
                $('#addItemModal').modal();
            }
        }
    },
        events: [
          ],
        
        viewRender: (view:any, element:any)=> {
          var b = _('#menu').fullCalendar('getDate');
          var check = moment_(b, 'YYYY/MM/DD');
          var month = check.format('MM');
          var year  = check.format('YYYY');       
          this.menuMonth= year + "-" + month;
        //   console.log(this.menuMonth);
          this.getMenu();
      },

        select:(start:any,end:any)=>{
        if(start.isBefore(moment_().subtract(1, "days"))) {
            _('#menu').fullCalendar('unselect');
            $('#modal-unselect').modal();
            return false;
        }
        else{
            this.start=moment_(start).format('YYYY-MM-DD');
            this.addMenu=this.addMenuForm();
            console.log(this.addMenu);
            $('#addMenuModal').modal();    
        }
      },

        dayRender:function(date:any,cell:any){
          if(date.isBefore(moment_().subtract(1, "days"))){
          cell.css("background-color","#fbfbfb");
          // cell.css("color","grey");
          }
        else{
          cell.css("cursor","pointer");
          
        }
        },

    eventClick:(event:any, jsEvent:any, view:any)=> {
          this.selectedMenu=event; 
          $('#clickModal').modal();
                

        },

        eventMouseover: function(calEvent:any, jsEvent:any) {
            var tooltip = '<div class="tooltipevent" style="width:100px;height:60px;background:#ccc;position:absolute;z-index:10001;padding:7px;color:black;font-weight:500;font-size:15px">Click to view menu</div>';
            $("body").append(tooltip);
            $(this).mouseover(function(e:any) {
                $(this).css('z-index', 100);
                $('.tooltipevent').fadeIn('500');
                $('.tooltipevent').fadeTo('10', 1.9);
            }).mousemove(function(e:any) {
                $('.tooltipevent').css('top', e.pageY + 10);
                $('.tooltipevent').css('left', e.pageX + 20);
            });
        },

        eventMouseout: function(calEvent:any, jsEvent:any) {
            $(this).css('z-index', 8);
            $('.tooltipevent').remove();
        },
        eventDrop : function(event:any , delta:any , revertfunc:any){
            revertfunc();
        }
        }
        

    public  addItemForm(){
        return new FormGroup({
            name:new FormControl('',[Validators.required]),
            type:new FormControl('', [Validators.required]),
            url:new FormControl('',[Validators.required])
        })
    }

    public  addMenuForm(){
        return new FormGroup({
            foodIds :  new FormControl('',[Validators.required]),
            day:new FormControl(this.start,[Validators.required])
        })
    }
    public  menu:any=[];
     public  getMenu(){
         this.loader=true;
        this.fs.getMenu(this.menuMonth).subscribe(res=>{
            if(res.status==204){
                this.loader=false;
            }
            else{
                this.loader=false;
                var menuObj:any={};         
                console.log( res);
                console.log("-");
                res.forEach((element:any,index:any) => { 
                    menuObj=new Object({
                        title:res[index].foodName,
                        start:res[index].day,
                        foodPicUrl:res[index].foodPicUrl,
                        foodType:res[index].foodType,
                        id:res[index].id
                    });
                    this.menuOptions.events.push(menuObj);
                })    

                for(let item=0; item<this.menuOptions.events.length;item++){
                    for(let j=item+1; j<this.menuOptions.events.length;j++){
                        if(this.menuOptions.events[item].start == this.menuOptions.events[j].start && this.menuOptions.events[item].foodType == this.menuOptions.events[j].foodType && this.menuOptions.events[j].title != "" ){
                            this.menuOptions.events[item].title += ", " + this.menuOptions.events[j].title;
                            this.menuOptions.events[j].title = ""; 
                        }
                    }
                }

                for(let item=0; item<this.menuOptions.events.length;item++){
                    if(this.menuOptions.events[item].title == ""){
                        this.menuOptions.events.splice(item,1);
                        item--;
                    }                    
                }
                console.log(this.menuOptions.events);

                _('#menu').fullCalendar('removeEvents');                 
                _('#menu').fullCalendar('renderEvents', this.menuOptions.events, true); 
                console.log(this.menuOptions.events);
                this.menuOptions.events=[];
                
            }            
        },err=>{

        })
        
    }
    
    public  selectedItem : any ;

    public  itemSeparation(){
        let i=0,j=0;
        for(let food of this.foodItems){
            if(food.type == "Lunch"){
                this.foodItemsL[i++] = food;
            }
            else{
                this.foodItemsS[j++] = food;   
            }
        }
        this.foodItemsL1=this.foodItemsL;
        this.foodItemsS1=this.foodItemsS;
    }

    public  getItem(){
        this.itemLoader=true;
        this.fs.getItem().subscribe(res=>{
        this.itemLoader=false;            
        // this.foodItems=JSON.parse(res);

        this.foodItems=res;
        this.itemSeparation();
        this.foodItems1 = this.foodItems=res;
        
        console.log(this.foodItemsS1);
        if(this.foodItemsL.length <= 5){
            this.endMenuL = this.foodItemsL.length -1;
        }
        if(this.foodItemsS.length <= 5){
            this.endMenuS = this.foodItemsS.length -1;
        }

        console.log(this.foodItems);
        console.log(this.tryfoodtype);
        },err=>{
        })
    }

    public  postItem(){ 
        $('#addItemModal').modal('hide'); 
            this.loader=true;
            this.fs.postItem(this.addItem.value).subscribe(res=>{
                this.loader=false;            
                this.message="You have successfully added the food item";
                this.heading="Successfully added";
                $('#messageModal').modal();
                
                this.getItem();
                this.getMenu();
                

        },err=>{
                            this.loader=false;            

        })
        
    }

    notValid(){
        let food = this.addItem.controls["name"].value;
        for(let x of this.foodItems){
            var x1 = (<String>x.name).toLowerCase();
            if(x1 == food.toLowerCase()){

                this.duplicate = true;
                return;
            }
        }
        this.duplicate = false;
    }

    empty(){
        this.snackslist=[];
        this.lunchlist=[];
    }
    public  postMenu(){
        this.foodItemIds = [];
        this.snackslist=[];
        this.lunchlist=[];
        this.loader=true;     
        
        this.fs.postMenu(this.addMenu.value).subscribe(res=>{
            this.loader=false;            
            this.message="You have successfully added the food menu";
            this.heading="Successfully added";
            $('#messageModal').modal();
            this.getMenu();            
        },err=>{
            this.loader = false;
        })
    }

    public  onDueDate(e:any){
        if(new Date(e.target.value) < new Date(new Date().getFullYear(),new Date().getMonth(),new Date().getDate())){
      this.message="Please choose an upcoming date from the calendar";
      this.heading="Invalid date input";
      $('#messageModal').modal('show');               
      this.addMenu.controls['day'].patchValue(this.start);
    }

    }
    func(){
        
        console.log(this.tryfoodtype);
    }
    public  drag(ev:any,str:any){
        ev.dataTransfer.setData("text", str);
        console.log(ev);
    }
    allowDrop(ev:any) {
        ev.preventDefault();
    }

    removeItem(i:string){
        var index = this.snackslist.indexOf(i);
        this.snackslist.splice(index, 1);
        
        for(let f of this.foodItems){

                if(i == f.name){
                    var index1 = this.foodItemIds.indexOf(f.id);
                    this.foodItemIds.splice(index1, 1);
                    break;
                }
        }

        if(this.snackslist.length==0){
            this.emptyS =true;
            this.snackslist[0]="Drag Items Here for Snacks";            
        }

        console.log("decdc" + this.foodItemIds);
    }
    
    public  drop(ev:any){
        this.emptyS = false;
        ev.preventDefault();
        
        console.log(this.snackslist);
        if(this.snackslist[0]=="Drag Items Here for Snacks"){
            this.snackslist[0] = ev.dataTransfer.getData("Text");
            for(let f of this.foodItems){
                if(ev.dataTransfer.getData("Text") == f.name){
                    this.foodItemIds.push(f.id);
                    break;
                }
            }
        }
        else{
            this.snackslist.push(ev.dataTransfer.getData("Text"));
                for(let f of this.foodItems){
                if(ev.dataTransfer.getData("Text") == f.name){
                    this.foodItemIds.push(f.id);
                    break;
                }
            }        
        }
         console.log("decdc" + this.foodItemIds);
        console.log(ev.dataTransfer.getData("Text"));
        console.log(ev);
        this.addMenu.controls['foodIds'].patchValue(this.foodItemIds);
    }

    removeItemlunch(i:string){
        var index = this.lunchlist.indexOf(i);
        this.lunchlist.splice(index, 1);
        
        for(let f of this.foodItems){

                if(i == f.name){
                    var index1 = this.foodItemIds.indexOf(f.id);
                    this.foodItemIds.splice(index1, 1);
                    break;
                }
        }

        if(this.lunchlist.length==0){
            this.emptyL =true;
            this.lunchlist[0]="Drag Items Here for Lunch";            
        }

        console.log("decdc " + this.foodItemIds);
    }
    
    public  droplunch(ev:any){
        this.emptyL =false;
        ev.preventDefault();
        
        console.log(this.lunchlist);

        if(this.lunchlist[0]=="Drag Items Here for Lunch"){
            this.lunchlist[0] = ev.dataTransfer.getData("Text");
            for(let f of this.foodItems){
                if(ev.dataTransfer.getData("Text") == f.name){
                    this.foodItemIds.push(f.id);
                    break;
                }
            }
             

        }
        else{
            this.lunchlist.push(ev.dataTransfer.getData("Text"));
            for(let f of this.foodItems){
                if(ev.dataTransfer.getData("Text") == f.name){
                    this.foodItemIds.push(f.id);
                    break;
                }
            }        
        }
          console.log("decdc" + this.foodItemIds);
        console.log(ev.dataTransfer.getData("Text"));
        console.log(ev);
        this.addMenu.controls['foodIds'].patchValue(this.foodItemIds);
    }


    moveLeftS(startMenu:any , endMenu:any ){
        console.log("left start "+ startMenu + "-"+ endMenu );
        if((this.foodItemsS.length - 1) == endMenu){ 
            console.log("working");
            
            endMenu = startMenu -1 ;
            startMenu -= 5;
            console.log(  endMenu);
        }
        else{
            endMenu -= 5 ;
            startMenu -= 5;   
        }
        console.log("left end "+ startMenu + "-"+ endMenu );
        this.startMenuS = startMenu;
        this.endMenuS = endMenu;    

    }
    moveRightS(startMenu:any , endMenu:any){
        console.log("right start "+ startMenu + "-"+ endMenu );
        if(this.foodItemsS.length > endMenu){
            if(this.foodItemsS.length - endMenu > 4 ){
                endMenu += 5;
                startMenu += 5;
            }
            else{
                 endMenu = this.foodItemsS.length -1 ;
                startMenu += 5;   
            }
        }
        console.log("right end "+ startMenu + "-"+ endMenu );
        this.startMenuS = startMenu;
        this.endMenuS = endMenu;
        
    }

    moveLeftL(startMenu:any , endMenu:any){
        console.log("left start "+ startMenu + "-"+ endMenu );
        if((this.foodItemsL.length - 1) == endMenu){ 
            console.log("working");
            
            endMenu = startMenu -1 ;
            startMenu -= 5;
            console.log(  endMenu);
        }
        else{
            endMenu -= 5 ;
            startMenu -= 5;   
        }
        console.log("left end "+ startMenu + "-"+ endMenu );
        
            this.startMenuL = startMenu;
            this.endMenuL = endMenu;

    }
    moveRightL(startMenu:any , endMenu:any){
        console.log("right start "+ startMenu + "-"+ endMenu );
        if(this.foodItemsL.length > endMenu){
            if(this.foodItemsL.length - endMenu > 4 ){
                endMenu += 5;
                startMenu += 5;
            }
            else{
                 endMenu = this.foodItemsL.length -1 ;
                startMenu += 5;   
            }
        }
        console.log("right end "+ startMenu + "-"+ endMenu );
        console.log(this.foodItemsL);        
            this.startMenuL = startMenu;
            this.endMenuL = endMenu;
            console.log("right end "+ this.startMenuS + "-"+ this.endMenuS );
    }
public  startMenuD : any = 0;
public  endMenuD : any = 4;
    moveLeftD(startMenu:any , endMenu:any){
        console.log("left start "+ startMenu + "-"+ endMenu );
        if((this.foodItems.length - 1) == endMenu){ 
            console.log("working");
            
            endMenu = startMenu -1 ;
            startMenu -= 5;
            console.log(  endMenu);
        }
        else{
            endMenu -= 5 ;
            startMenu -= 5;   
        }
        console.log("left end "+ startMenu + "-"+ endMenu );
        
            this.startMenuD = startMenu;
            this.endMenuD = endMenu;

    }

    moveRightD(startMenu:any , endMenu:any){
        console.log("right start "+ startMenu + "-"+ endMenu );
        if(this.foodItems.length > endMenu){
            if(this.foodItems.length - endMenu > 4 ){
                endMenu += 5;
                startMenu += 5;
            }
            else{
                 endMenu = this.foodItems.length -1 ;
                startMenu += 5;   
            }
        }
        console.log("right end "+ startMenu + "-"+ endMenu );
        
            this.startMenuD = startMenu;
            this.endMenuD = endMenu;
    }

    searchS(ev : any){
        this.itemSeparation();
        this.foodItemsS1 = this.foodItemsS;
        
        var keyword = ev.target.value;
        
        // for(let f of this.foodItemsS1){

        this.foodItemsS1 = this.foodItemsS1.filter((item) => { return (item.name.toLowerCase()).indexOf(keyword.toLowerCase()) != -1 } );

            // if((f.name.toLowerCase()).indexOf(keyword.toLowerCase()) != -1){
                
            //     var index = this.foodItemsS1.indexOf(f);
            //     this.foodItemsS1.splice(index, 1);        
            // }
        // }
        console.log(this.foodItemsS1);            
    }

public  foodItems1 : any[]=[];
    searchD(ev : any){
        this.itemSeparation();
        this.foodItems1 = this.foodItems;
        
        var keyword = ev.target.value;
        
        // for(let f of this.foodItemsS1){

        this.foodItems1 = this.foodItems1.filter((item) => { return (item.name.toLowerCase()).indexOf(keyword.toLowerCase()) != -1 } );

            // if((f.name.toLowerCase()).indexOf(keyword.toLowerCase()) != -1){
                
            //     var index = this.foodItemsS1.indexOf(f);
            //     this.foodItemsS1.splice(index, 1);        
            // }
        // }
        console.log(this.foodItemsS1);            
    }

    addItemFunc(){
        $('#addItemModal').modal('show');
        $('#addMenuModal').modal('hide');
    }

    sureOrNot(bool : boolean){
        console.log(bool);
        if(bool== true){
            this.remove();
        }
    }

    removeFoodItem(item:any){
        $('#confirmModal').modal('show');
        this.selectedItem = item; 
    }
    remove(){
            this.foodItems.splice(this.foodItems.indexOf(this.selectedItem),1);
            this.fs.deleteItem(this.selectedItem.id).subscribe( (res)=>{
                this.message = "Deletion Successful";
                $('#messageModal').modal('show');
                },(err) => {
                    this.message = "Deletion Unsuccessful";
                $('#messageModal').modal('show');
            });    
            this.getItem();
    }

    searchL(ev : any){

        this.itemSeparation();
        this.foodItemsL1 = this.foodItemsL;
        var keyword = ev.target.value;
        this.foodItemsL1 = this.foodItemsL1.filter((item) => { return (item.name.toLowerCase()).indexOf(keyword.toLowerCase()) != -1 } )
        // for(let f of this.foodItemsL1){
        //     if((f.name.toLowerCase()).indexOf(keyword.toLowerCase()) != -1){
        //         var index = this.foodItemsL1.indexOf(f);
        //         this.foodItemsL1.splice(index, 1);        
        //     }
        // }

    }


}
