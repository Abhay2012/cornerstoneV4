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
var login_gaurd_1 = require("../login/login.gaurd");
var MainComponent = /** @class */ (function () {
    function MainComponent(log) {
        this.log = log;
        this.displayProfile = true;
        this.isLoggedIn = false;
        this.selectedIndex = 0;
        this.pages = [
            { title: 'Dashboard', icon: 'icons/dashboard.png', url: '/dashboard' },
            { title: 'Complaints', icon: 'icons/complaint.png', url: '/complaint' },
            // { title: 'Suggestion', component: SuggestionComponent, icon: 'icons/suggestion.png', url: '/suggestion/for-me'} ,
            { title: 'Appreciation', icon: 'icons/appreciation.png', url: '/appreciation' },
            { title: 'Messaging', icon: 'icons/message.png', url: '/conversation' },
            { title: 'Events', icon: 'icons/event.png', url: '/event' },
            { title: 'Poll', icon: 'icons/poll.png', url: '/poll' },
            // { title: 'Survey', component: SurveyComponent, icon: 'icons/survey.png', url: '/survey' },
            // { title: 'Food Menu', component: FoodmenuComponent, icon: 'icons/food.png', url: '/foodmenu' },    
            { title: 'Circular', icon: 'icons/circular.png', url: '/circular' },
            { title: 'Homework', icon: 'icons/homework.png', url: '/homework' },
            { title: 'Student Rating', icon: 'icons/rating.png', url: '/student-profile' },
        ];
    }
    MainComponent.prototype.getSelectedLink = function (i) {
        this.selectedIndex = i;
    };
    MainComponent.prototype.ngOnInit = function () {
        jQuery.noConflict();
        if (this.log.isLoggedIn())
            this.isLoggedIn = true;
        else
            this.isLoggedIn = false;
        // this.checkStudentRating();
        this.role = this.log.getData('role');
    };
    MainComponent.prototype.ngAfterViewInit = function () {
        var alterClass = function () {
            var ww = document.body.clientWidth;
            if (ww >= 521) {
                $("#wrapper").toggleClass("toggled");
            }
            else if (ww < 520) {
                $('#wrapper').removeClass('toggled');
            }
            ;
        };
        var shiftLeft = function () {
            if ($('#wrapper').hasClass('toggled')) {
                $('#page-content-wrapper').addClass('shiftLeft');
            }
            else {
                $('#page-content-wrapper').removeClass('shiftLeft');
            }
        };
        $(window).resize(function () {
            alterClass();
            shiftLeft();
        });
        alterClass();
        shiftLeft();
        $("#menu-toggle").click(function (e) {
            $("#wrapper").toggleClass("toggled");
            shiftLeft();
        });
        //   $("body").mouseup(function(e:any) 
        // {
        //     var container = $("#profile-card");
        //     // if the target of the click isn't the container nor a descendant of the container
        //     if (!container.is(e.target) && container.has(e.target).length === 0) 
        //     {
        //         container.hide();
        //     }
        // });
    };
    MainComponent.prototype.logout = function () {
        localStorage.clear();
    };
    MainComponent = __decorate([
        core_1.Component({
            selector: 'main',
            templateUrl: "./main.component.html",
            styleUrls: ['./main.component.css']
        }),
        __metadata("design:paramtypes", [login_gaurd_1.LoggedInGuard])
    ], MainComponent);
    return MainComponent;
}());
exports.MainComponent = MainComponent;
//# sourceMappingURL=main.component.js.map