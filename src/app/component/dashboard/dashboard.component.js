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
var router_1 = require("@angular/router");
var chart_service_1 = require("../../providers/chart.service");
var loaderstop_service_1 = require("../../providers/loaderstop.service");
var DashboardComponent = /** @class */ (function () {
    function DashboardComponent(cs, router, ls, zone) {
        var _this = this;
        this.cs = cs;
        this.router = router;
        this.ls = ls;
        this.zone = zone;
        this.loader = false;
        this.loader1 = false;
        this.loader2 = false;
        this.responseByStatus = [];
        this.responseByCategoryAndStatus = [];
        this.responseSuggestionByStatus = [];
        this.ls.setLoader(false);
        this.loader = true;
        this.loader1 = true;
        this.loader2 = true;
        cs.getComplaintByCategoryAndStatus().subscribe(function (response) {
            if (response.status === 204) {
                _this.loader = false;
                _this.responseByCategoryAndStatus = 0;
                return;
            }
            _this.responseByCategoryAndStatus = response;
            _this.chartByCategoryAndStatus();
        }, function (err) {
            _this.router.navigate(['/error']);
        });
        cs.getComplaintByStatus().subscribe(function (response) {
            if (response.status === 204) {
                _this.loader1 = false;
                _this.responseByStatus = 0;
                return;
            }
            _this.responseByStatus = response;
            _this.chartByStatus();
        }, function (err) {
            _this.router.navigate(['/error']);
        });
        // cs.getSuggestionByStatus().subscribe((res) => {
        //   if(res.status === 204){
        //      this.responseSuggestionByStatus =0;
        //     return;
        //   }
        //   this.responseSuggestionByStatus = res;
        //   this.chartBySuggestionStatus();
        // }, (err) => {
        //   this.router.navigate(['/error']);
        // });
    }
    DashboardComponent.prototype.onSelected = function (data) {
        var _this = this;
        var dataTable = data.wrapper.getDataTable();
        var parts = data.e.targetID.split('#');
        switch (data.chartId.id) {
            case "complaint_chart_by_status":
                if (parts[0] == "slice") {
                    this.zone.run(function () { return _this.router.navigate(['/complaint/status/' + dataTable.getValue(parseInt(parts[1]), 2)]); });
                }
                else if (parts[0] == "legendentry") {
                }
                break;
            case "EWNS_suggestion":
                if (parts[0] == "slice") {
                    this.zone.run(function () { return _this.router.navigate(['/suggestion/status/' + dataTable.getValue(parseInt(parts[1]), 2)]); });
                }
                else if (parts[0] == "legendentry") {
                }
                break;
            case "chart_by_category_status":
                if (parts[0] == "vAxis") {
                    var categoryId = dataTable.getValue(parseInt(parts[parts.indexOf('label') + 1]), 1);
                    this.zone.run(function () { return _this.router.navigate(['/complaint/category-status/category/' + categoryId]); });
                }
                else if (parts[0] == "bar") {
                    var categoryId = dataTable.getValue(parseInt(parts[2]), 1);
                    var statusId = dataTable.getValue(parseInt(parts[2]), (parseInt(parts[1]) + 1) * 2 + 1);
                    this.zone.run(function () { return _this.router.navigate(['complaint/category-status/' + categoryId + '/' + statusId]); });
                }
                else if (parts[0] == "legendentry") {
                    for (var i = 0; i < this.responseByCategoryAndStatus.length; i++) {
                        for (var j = 0; j < this.responseByCategoryAndStatus[i].statusResults.length; j++) {
                            dataTable.setCell(i, parseInt(this.responseByCategoryAndStatus[i].statusResults[j].statusId) * 2, this.responseByCategoryAndStatus[i].statusResults[j].count);
                        }
                    }
                    if (parseInt(parts[1]) != 6)
                        for (var i = 0; i < this.responseByCategoryAndStatus.length; i++) {
                            for (var j = 0; j < this.responseByCategoryAndStatus[i].statusResults.length; j++) {
                                if (j != parseInt(parts[1]))
                                    dataTable.setCell(i, parseInt(this.responseByCategoryAndStatus[i].statusResults[j].statusId) * 2, 0);
                            }
                        }
                    data.wrapper.draw();
                }
                break;
        }
    };
    DashboardComponent.prototype.onResize = function (event) {
        console.log("check0");
        this.chartByStatus();
        this.chartByCategoryAndStatus();
        this.chartBySuggestionStatus();
    };
    DashboardComponent.prototype.chartByStatus = function () {
        console.log("check1");
        var data = [];
        data.push(['Status', 'complaint', { type: 'number', role: 'scope' }]);
        for (var i = 0; i < this.responseByStatus.length; i++) {
            data.push([this.responseByStatus[i].statusName, this.responseByStatus[i].count, this.responseByStatus[i].statusId]);
        }
        this.complaintByStatus = data;
        this.complaintByStatusChartOptions = {
            // title: "Complaints Report - Statuswise",
            legend: { position: 'bottom', textStyle: { fontName: 'sans-serif', fontSize: 12 }, maxLines: 4 },
            backgroundColor: 'transparent',
            titleTextStyle: {
                fontName: '-apple-system, "Helvetica Neue", "Roboto", sans-serif',
                fontSize: 14
            },
            colors: ['#4CAF50', '#2196f3', '#FFEB3B', '#F48FB1', '#EF5350', '#9C27B0', '#003300'],
            chartArea: { left: '10%', height: "40%", width: "40%", bottom: '10%', right: '10%', top: '0%' },
            is3D: true
        };
        this.loader1 = false;
    };
    DashboardComponent.prototype.chartByCategoryAndStatus = function () {
        console.log("check2");
        var data = [[]];
        data[0].push('categoryName');
        data[0].push({ type: 'number', role: 'scope' });
        for (var i = 0; i < this.responseByCategoryAndStatus[0].statusResults.length; i++) {
            data[0].push(this.responseByCategoryAndStatus[0].statusResults[i].statusName);
            data[0].push({ type: 'number', role: 'scope' });
        }
        data[0].push('All Status');
        for (var i = 0; i < this.responseByCategoryAndStatus.length; i++) {
            data[i + 1] = [];
            data[i + 1].push(this.responseByCategoryAndStatus[i].categoryName);
            data[i + 1].push(this.responseByCategoryAndStatus[i].categoryId);
            for (var j = 0; j < this.responseByCategoryAndStatus[i].statusResults.length; j++) {
                data[i + 1].push(this.responseByCategoryAndStatus[i].statusResults[j].count);
                data[i + 1].push(this.responseByCategoryAndStatus[i].statusResults[j].statusId);
            }
            data[i + 1].push(0);
        }
        this.complaintByCategoryAndStatus = data;
        this.categoryAndStatusChartOptions = {
            // title: "Complaint Report - Categorywise",
            titleTextStyle: {
                fontName: 'sans-serif',
                fontSize: 14,
                bold: true,
            },
            isStacked: 'true', chartArea: {},
            colors: ['#4CAF50', '#2196f3', '#FFEB3B', '#F48FB1', '#EF5350', '#9C27B0', '#FF8C00']
        };
        this.loader = false;
    };
    DashboardComponent.prototype.chartBySuggestionStatus = function () {
        var data = [];
        console.log("check3");
        data.push(['Status', 'suggestion', { type: 'number', role: 'scope' }]);
        for (var i = 0; i < this.responseSuggestionByStatus.length; i++) {
            data.push([this.responseSuggestionByStatus[i].statusName, this.responseSuggestionByStatus[i].count, this.responseSuggestionByStatus[i].statusId]);
        }
        this.suggestionByStatus = data;
        this.suggestionByStatusChartOptions = {
            // title: "Suggestions",
            legend: { position: 'bottom', textStyle: { fontName: 'sans-serif', fontSize: 12 }, maxLines: 4 },
            backgroundColor: 'transparent',
            titleTextStyle: {
                fontName: '-apple-system, "Helvetica Neue", "Roboto", sans-serif',
                fontSize: 14
            },
            colors: ['#4CAF50', '#2196f3', '#FFEB3B', '#F48FB1', '#EF5350', '#9C27B0', '#003300'],
            chartArea: { left: '10%', height: "40%", width: "40%", bottom: '10%', right: '10%', top: '5%' },
            pieHole: 0.4
        };
        this.loader2 = false;
    };
    DashboardComponent.prototype.ngOnDestroy = function () {
        this.ls.setLoader(true);
    };
    DashboardComponent = __decorate([
        core_1.Component({
            selector: 'dashboard',
            templateUrl: './dashboard.component.html',
            styleUrls: ['./dashboard.component.css']
        }),
        __metadata("design:paramtypes", [chart_service_1.ChartService, router_1.Router, loaderstop_service_1.LoaderStop, core_1.NgZone])
    ], DashboardComponent);
    return DashboardComponent;
}());
exports.DashboardComponent = DashboardComponent;
//# sourceMappingURL=dashboard.component.js.map