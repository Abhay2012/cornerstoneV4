"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var foodmenu_component_1 = require("./foodmenu.component");
var router_1 = require("@angular/router");
var shared_module_1 = require("../../shared.module");
var foodmenu_service_1 = require("../../providers/foodmenu.service");
var ng2_drag_drop_1 = require("ng2-drag-drop");
var FoodmenuModule = /** @class */ (function () {
    function FoodmenuModule() {
    }
    FoodmenuModule = __decorate([
        core_1.NgModule({
            imports: [shared_module_1.SharedModule, ng2_drag_drop_1.Ng2DragDropModule.forRoot(), router_1.RouterModule.forChild([
                    {
                        path: '',
                        component: foodmenu_component_1.FoodmenuComponent
                    }
                ])],
            declarations: [foodmenu_component_1.FoodmenuComponent],
            providers: [foodmenu_service_1.FoodmenuService]
        })
    ], FoodmenuModule);
    return FoodmenuModule;
}());
exports.FoodmenuModule = FoodmenuModule;
//# sourceMappingURL=foodmenu.module.js.map