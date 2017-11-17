"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var foodmenu_service_1 = require("../../providers/foodmenu.service");
var forms_1 = require("@angular/forms");
var moment_ = require("moment");
var http_1 = require("@angular/http");
require("fullcalendar");
var _ = require("jquery");
var loaderstop_service_1 = require("../../providers/loaderstop.service");
var FoodmenuComponent = /** @class */ (function () {
    function FoodmenuComponent(ls, fs, http) {
        var _this = this;
        this.ls = ls;
        this.fs = fs;
        this.http = http;
        this.foodItems = [];
        this.duplicate = false;
        this.loader = false;
        this.itemLoader = false;
        this.snackslist = ["Drag Items Here for Snacks"];
        this.lunchlist = ["Drag Items Here for Lunch"];
        this.selectedMenu = {};
        // public submitProgress:any;
        this.tryfoodtype = "0";
        this.startMenuS = 0;
        this.endMenuS = 4;
        this.startMenuL = 0;
        this.endMenuL = 4;
        this.startMenu = 0;
        this.endMenu = 4;
        this.foodItemsL = [];
        this.foodItemsS = [];
        this.foodItemsL1 = [];
        this.foodItemsS1 = [];
        this.foodItemIds = [];
        this.emptyL = true;
        this.emptyS = true;
        this.menuOptions = {
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
                deleteItem: {
                    text: 'Food Item -',
                    click: function () {
                        $('#deleteItemModal').modal();
                    }
                },
                addItem: {
                    text: 'Food Item +',
                    click: function () {
                        $('#addItemModal').modal();
                    }
                }
            },
            events: [],
            viewRender: function (view, element) {
                var b = _('#menu').fullCalendar('getDate');
                var check = moment_(b, 'YYYY/MM/DD');
                var month = check.format('MM');
                var year = check.format('YYYY');
                _this.menuMonth = year + "-" + month;
                //   console.log(this.menuMonth);
                _this.getMenu();
            },
            select: function (start, end) {
                if (start.isBefore(moment_().subtract(1, "days"))) {
                    _('#menu').fullCalendar('unselect');
                    $('#modal-unselect').modal();
                    return false;
                }
                else {
                    _this.start = moment_(start).format('YYYY-MM-DD');
                    _this.addMenu = _this.addMenuForm();
                    console.log(_this.addMenu);
                    $('#addMenuModal').modal();
                }
            },
            dayRender: function (date, cell) {
                if (date.isBefore(moment_().subtract(1, "days"))) {
                    cell.css("background-color", "#fbfbfb");
                    // cell.css("color","grey");
                }
                else {
                    cell.css("cursor", "pointer");
                }
            },
            eventClick: function (event, jsEvent, view) {
                _this.selectedMenu = event;
                $('#clickModal').modal();
            },
            eventMouseover: function (calEvent, jsEvent) {
                var tooltip = '<div class="tooltipevent" style="width:100px;height:60px;background:#ccc;position:absolute;z-index:10001;padding:7px;color:black;font-weight:500;font-size:15px">Click to view menu</div>';
                $("body").append(tooltip);
                $(this).mouseover(function (e) {
                    $(this).css('z-index', 100);
                    $('.tooltipevent').fadeIn('500');
                    $('.tooltipevent').fadeTo('10', 1.9);
                }).mousemove(function (e) {
                    $('.tooltipevent').css('top', e.pageY + 10);
                    $('.tooltipevent').css('left', e.pageX + 20);
                });
            },
            eventMouseout: function (calEvent, jsEvent) {
                $(this).css('z-index', 8);
                $('.tooltipevent').remove();
            },
            eventDrop: function (event, delta, revertfunc) {
                revertfunc();
            }
        };
        this.menu = [];
        this.startMenuD = 0;
        this.endMenuD = 4;
        this.foodItems1 = [];
        this.ls.setLoader(false);
        this.addItem = this.addItemForm();
        this.addMenu = this.addMenuForm();
        // this.getMenu();
        this.getItem();
    }
    FoodmenuComponent.prototype.ngAfterViewInit = function () {
        //   _('#menu').fullCalendar('renderEvents', this.menuOptions.events, true); 
    };
    FoodmenuComponent.prototype.ngOnDestroy = function () {
        this.ls.setLoader(true);
    };
    FoodmenuComponent.prototype.addItemForm = function () {
        return new forms_1.FormGroup({
            name: new forms_1.FormControl('', [forms_1.Validators.required]),
            type: new forms_1.FormControl('', [forms_1.Validators.required]),
            url: new forms_1.FormControl('', [forms_1.Validators.required])
        });
    };
    FoodmenuComponent.prototype.addMenuForm = function () {
        return new forms_1.FormGroup({
            foodId: new forms_1.FormControl('', [forms_1.Validators.required]),
            day: new forms_1.FormControl(this.start, [forms_1.Validators.required])
        });
    };
    FoodmenuComponent.prototype.getMenu = function () {
        var _this = this;
        this.loader = true;
        this.fs.getMenu(this.menuMonth).subscribe(function (res) {
            if (res.status == 204) {
                _this.loader = false;
            }
            else {
                _this.loader = false;
                var menuObj = {};
                console.log(res);
                console.log("-");
                res.forEach(function (element, index) {
                    menuObj = new Object({
                        title: res[index].foodName,
                        start: res[index].day,
                        foodPicUrl: res[index].foodPicUrl,
                        foodType: res[index].foodType,
                        id: res[index].id
                    });
                    _this.menuOptions.events.push(menuObj);
                });
                for (var item = 0; item < _this.menuOptions.events.length; item++) {
                    for (var j = item + 1; j < _this.menuOptions.events.length; j++) {
                        if (_this.menuOptions.events[item].start == _this.menuOptions.events[j].start && _this.menuOptions.events[item].foodType == _this.menuOptions.events[j].foodType && _this.menuOptions.events[j].title != "") {
                            _this.menuOptions.events[item].title += ", " + _this.menuOptions.events[j].title;
                            _this.menuOptions.events[j].title = "";
                        }
                    }
                }
                for (var item = 0; item < _this.menuOptions.events.length; item++) {
                    if (_this.menuOptions.events[item].title == "") {
                        _this.menuOptions.events.splice(item, 1);
                        item--;
                    }
                }
                console.log(_this.menuOptions.events);
                _('#menu').fullCalendar('removeEvents');
                _('#menu').fullCalendar('renderEvents', _this.menuOptions.events, true);
                console.log(_this.menuOptions.events);
                _this.menuOptions.events = [];
            }
        }, function (err) {
        });
    };
    FoodmenuComponent.prototype.itemSeparation = function () {
        var i = 0, j = 0;
        for (var _i = 0, _a = this.foodItems; _i < _a.length; _i++) {
            var food = _a[_i];
            if (food.type == "Lunch") {
                this.foodItemsL[i++] = food;
            }
            else {
                this.foodItemsS[j++] = food;
            }
        }
        this.foodItemsL1 = this.foodItemsL;
        this.foodItemsS1 = this.foodItemsS;
    };
    FoodmenuComponent.prototype.getItem = function () {
        var _this = this;
        this.itemLoader = true;
        this.fs.getItem().subscribe(function (res) {
            _this.itemLoader = false;
            // this.foodItems=JSON.parse(res);
            _this.foodItems = res;
            _this.itemSeparation();
            _this.foodItems1 = _this.foodItems = res;
            console.log(_this.foodItemsS1);
            if (_this.foodItemsL.length <= 5) {
                _this.endMenuL = _this.foodItemsL.length - 1;
            }
            if (_this.foodItemsS.length <= 5) {
                _this.endMenuS = _this.foodItemsS.length - 1;
            }
            console.log(_this.foodItems);
            console.log(_this.tryfoodtype);
        }, function (err) {
        });
    };
    FoodmenuComponent.prototype.postItem = function () {
        var _this = this;
        $('#addItemModal').modal('hide');
        this.loader = true;
        this.fs.postItem(this.addItem.value).subscribe(function (res) {
            _this.loader = false;
            _this.message = "You have successfully added the food item";
            _this.heading = "Successfully added";
            $('#messageModal').modal();
            _this.getItem();
            _this.getMenu();
        }, function (err) {
            _this.loader = false;
        });
    };
    FoodmenuComponent.prototype.notValid = function () {
        var food = this.addItem.controls["name"].value;
        for (var _i = 0, _a = this.foodItems; _i < _a.length; _i++) {
            var x = _a[_i];
            var x1 = x.name.toLowerCase();
            if (x1 == food.toLowerCase()) {
                this.duplicate = true;
                return;
            }
        }
        this.duplicate = false;
    };
    FoodmenuComponent.prototype.empty = function () {
        this.snackslist = [];
        this.lunchlist = [];
    };
    FoodmenuComponent.prototype.postMenu = function () {
        var _this = this;
        this.foodItemIds = [];
        this.snackslist = [];
        this.lunchlist = [];
        this.loader = true;
        this.fs.postMenu(this.addMenu.value).subscribe(function (res) {
            _this.loader = false;
            _this.message = "You have successfully added the food menu";
            _this.heading = "Successfully added";
            $('#messageModal').modal();
            _this.getMenu();
        }, function (err) {
            _this.loader = false;
        });
    };
    FoodmenuComponent.prototype.onDueDate = function (e) {
        if (new Date(e.target.value) < new Date(new Date().getFullYear(), new Date().getMonth(), new Date().getDate())) {
            this.message = "Please choose an upcoming date from the calendar";
            this.heading = "Invalid date input";
            $('#messageModal').modal('show');
            this.addMenu.controls['day'].patchValue(this.start);
        }
    };
    FoodmenuComponent.prototype.func = function () {
        console.log(this.tryfoodtype);
    };
    FoodmenuComponent.prototype.drag = function (ev, str) {
        ev.dataTransfer.setData("text", str);
        console.log(ev);
    };
    FoodmenuComponent.prototype.allowDrop = function (ev) {
        ev.preventDefault();
    };
    FoodmenuComponent.prototype.removeItem = function (i) {
        var index = this.snackslist.indexOf(i);
        this.snackslist.splice(index, 1);
        for (var _i = 0, _a = this.foodItems; _i < _a.length; _i++) {
            var f = _a[_i];
            if (i == f.name) {
                var index1 = this.foodItemIds.indexOf(f.id);
                this.foodItemIds.splice(index1, 1);
                break;
            }
        }
        if (this.snackslist.length == 0) {
            this.emptyS = true;
            this.snackslist[0] = "Drag Items Here for Snacks";
        }
        console.log("decdc" + this.foodItemIds);
    };
    FoodmenuComponent.prototype.drop = function (ev) {
        this.emptyS = false;
        ev.preventDefault();
        console.log(this.snackslist);
        if (this.snackslist[0] == "Drag Items Here for Snacks") {
            this.snackslist[0] = ev.dataTransfer.getData("Text");
            for (var _i = 0, _a = this.foodItems; _i < _a.length; _i++) {
                var f = _a[_i];
                if (ev.dataTransfer.getData("Text") == f.name) {
                    this.foodItemIds.push(f.id);
                    break;
                }
            }
        }
        else {
            this.snackslist.push(ev.dataTransfer.getData("Text"));
            for (var _b = 0, _c = this.foodItems; _b < _c.length; _b++) {
                var f = _c[_b];
                if (ev.dataTransfer.getData("Text") == f.name) {
                    this.foodItemIds.push(f.id);
                    break;
                }
            }
        }
        console.log("decdc" + this.foodItemIds);
        console.log(ev.dataTransfer.getData("Text"));
        console.log(ev);
        this.addMenu.controls['foodId'].patchValue(this.foodItemIds[0]);
    };
    FoodmenuComponent.prototype.removeItemlunch = function (i) {
        var index = this.lunchlist.indexOf(i);
        this.lunchlist.splice(index, 1);
        for (var _i = 0, _a = this.foodItems; _i < _a.length; _i++) {
            var f = _a[_i];
            if (i == f.name) {
                var index1 = this.foodItemIds.indexOf(f.id);
                this.foodItemIds.splice(index1, 1);
                break;
            }
        }
        if (this.lunchlist.length == 0) {
            this.emptyL = true;
            this.lunchlist[0] = "Drag Items Here for Lunch";
        }
        console.log("decdc " + this.foodItemIds);
    };
    FoodmenuComponent.prototype.droplunch = function (ev) {
        this.emptyL = false;
        ev.preventDefault();
        console.log(this.lunchlist);
        if (this.lunchlist[0] == "Drag Items Here for Lunch") {
            this.lunchlist[0] = ev.dataTransfer.getData("Text");
            for (var _i = 0, _a = this.foodItems; _i < _a.length; _i++) {
                var f = _a[_i];
                if (ev.dataTransfer.getData("Text") == f.name) {
                    this.foodItemIds.push(f.id);
                    break;
                }
            }
        }
        else {
            this.lunchlist.push(ev.dataTransfer.getData("Text"));
            for (var _b = 0, _c = this.foodItems; _b < _c.length; _b++) {
                var f = _c[_b];
                if (ev.dataTransfer.getData("Text") == f.name) {
                    this.foodItemIds.push(f.id);
                    break;
                }
            }
        }
        console.log("decdc" + this.foodItemIds);
        console.log(ev.dataTransfer.getData("Text"));
        console.log(ev);
        this.addMenu.controls['foodId'].patchValue(this.foodItemIds[0]);
    };
    FoodmenuComponent.prototype.moveLeftS = function (startMenu, endMenu) {
        console.log("left start " + startMenu + "-" + endMenu);
        if ((this.foodItemsS.length - 1) == endMenu) {
            console.log("working");
            endMenu = startMenu - 1;
            startMenu -= 5;
            console.log(endMenu);
        }
        else {
            endMenu -= 5;
            startMenu -= 5;
        }
        console.log("left end " + startMenu + "-" + endMenu);
        this.startMenuS = startMenu;
        this.endMenuS = endMenu;
    };
    FoodmenuComponent.prototype.moveRightS = function (startMenu, endMenu) {
        console.log("right start " + startMenu + "-" + endMenu);
        if (this.foodItemsS.length > endMenu) {
            if (this.foodItemsS.length - endMenu > 4) {
                endMenu += 5;
                startMenu += 5;
            }
            else {
                endMenu = this.foodItemsS.length - 1;
                startMenu += 5;
            }
        }
        console.log("right end " + startMenu + "-" + endMenu);
        this.startMenuS = startMenu;
        this.endMenuS = endMenu;
    };
    FoodmenuComponent.prototype.moveLeftL = function (startMenu, endMenu) {
        console.log("left start " + startMenu + "-" + endMenu);
        if ((this.foodItemsL.length - 1) == endMenu) {
            console.log("working");
            endMenu = startMenu - 1;
            startMenu -= 5;
            console.log(endMenu);
        }
        else {
            endMenu -= 5;
            startMenu -= 5;
        }
        console.log("left end " + startMenu + "-" + endMenu);
        this.startMenuL = startMenu;
        this.endMenuL = endMenu;
    };
    FoodmenuComponent.prototype.moveRightL = function (startMenu, endMenu) {
        console.log("right start " + startMenu + "-" + endMenu);
        if (this.foodItemsL.length > endMenu) {
            if (this.foodItemsL.length - endMenu > 4) {
                endMenu += 5;
                startMenu += 5;
            }
            else {
                endMenu = this.foodItemsL.length - 1;
                startMenu += 5;
            }
        }
        console.log("right end " + startMenu + "-" + endMenu);
        console.log(this.foodItemsL);
        this.startMenuL = startMenu;
        this.endMenuL = endMenu;
        console.log("right end " + this.startMenuS + "-" + this.endMenuS);
    };
    FoodmenuComponent.prototype.moveLeftD = function (startMenu, endMenu) {
        console.log("left start " + startMenu + "-" + endMenu);
        if ((this.foodItems.length - 1) == endMenu) {
            console.log("working");
            endMenu = startMenu - 1;
            startMenu -= 5;
            console.log(endMenu);
        }
        else {
            endMenu -= 5;
            startMenu -= 5;
        }
        console.log("left end " + startMenu + "-" + endMenu);
        this.startMenuD = startMenu;
        this.endMenuD = endMenu;
    };
    FoodmenuComponent.prototype.moveRightD = function (startMenu, endMenu) {
        console.log("right start " + startMenu + "-" + endMenu);
        if (this.foodItems.length > endMenu) {
            if (this.foodItems.length - endMenu > 4) {
                endMenu += 5;
                startMenu += 5;
            }
            else {
                endMenu = this.foodItems.length - 1;
                startMenu += 5;
            }
        }
        console.log("right end " + startMenu + "-" + endMenu);
        this.startMenuD = startMenu;
        this.endMenuD = endMenu;
    };
    FoodmenuComponent.prototype.searchS = function (ev) {
        this.itemSeparation();
        this.foodItemsS1 = this.foodItemsS;
        var keyword = ev.target.value;
        // for(let f of this.foodItemsS1){
        this.foodItemsS1 = this.foodItemsS1.filter(function (item) { return (item.name.toLowerCase()).indexOf(keyword.toLowerCase()) != -1; });
        // if((f.name.toLowerCase()).indexOf(keyword.toLowerCase()) != -1){
        //     var index = this.foodItemsS1.indexOf(f);
        //     this.foodItemsS1.splice(index, 1);        
        // }
        // }
        console.log(this.foodItemsS1);
    };
    FoodmenuComponent.prototype.searchD = function (ev) {
        this.itemSeparation();
        this.foodItems1 = this.foodItems;
        var keyword = ev.target.value;
        // for(let f of this.foodItemsS1){
        this.foodItems1 = this.foodItems1.filter(function (item) { return (item.name.toLowerCase()).indexOf(keyword.toLowerCase()) != -1; });
        // if((f.name.toLowerCase()).indexOf(keyword.toLowerCase()) != -1){
        //     var index = this.foodItemsS1.indexOf(f);
        //     this.foodItemsS1.splice(index, 1);        
        // }
        // }
        console.log(this.foodItemsS1);
    };
    FoodmenuComponent.prototype.addItemFunc = function () {
        $('#addItemModal').modal('show');
        $('#addMenuModal').modal('hide');
    };
    FoodmenuComponent.prototype.sureOrNot = function (bool) {
        console.log(bool);
        if (bool == true) {
            this.remove();
        }
    };
    FoodmenuComponent.prototype.removeFoodItem = function (item) {
        $('#confirmModal').modal('show');
        this.selectedItem = item;
    };
    FoodmenuComponent.prototype.remove = function () {
        var _this = this;
        this.foodItems.splice(this.foodItems.indexOf(this.selectedItem), 1);
        this.fs.deleteItem(this.selectedItem.id).subscribe(function (res) {
            _this.message = "Deletion Successful";
            $('#messageModal').modal('show');
        }, function (err) {
            _this.message = "Deletion Unsuccessful";
            $('#messageModal').modal('show');
        });
        this.getItem();
    };
    FoodmenuComponent.prototype.searchL = function (ev) {
        this.itemSeparation();
        this.foodItemsL1 = this.foodItemsL;
        var keyword = ev.target.value;
        this.foodItemsL1 = this.foodItemsL1.filter(function (item) { return (item.name.toLowerCase()).indexOf(keyword.toLowerCase()) != -1; });
        // for(let f of this.foodItemsL1){
        //     if((f.name.toLowerCase()).indexOf(keyword.toLowerCase()) != -1){
        //         var index = this.foodItemsL1.indexOf(f);
        //         this.foodItemsL1.splice(index, 1);        
        //     }
        // }
    };
    FoodmenuComponent = __decorate([
        core_1.Component({
            selector: 'foodmenu',
            templateUrl: './foodmenu.component.html',
            styleUrls: ['./foodmenu.component.css'],
        }),
        __metadata("design:paramtypes", [loaderstop_service_1.LoaderStop,
            foodmenu_service_1.FoodmenuService,
            http_1.Http])
    ], FoodmenuComponent);
    return FoodmenuComponent;
}());
exports.FoodmenuComponent = FoodmenuComponent;
//# sourceMappingURL=foodmenu.component.js.map