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
var GoogleChart = /** @class */ (function () {
    // @Input('chartData') public chartData: Object;
    function GoogleChart(element) {
        this.element = element;
        this.onSelected = new core_1.EventEmitter();
        this._element = this.element.nativeElement;
    }
    GoogleChart.prototype.ngOnInit = function () {
        google.charts.load('current', { 'packages': ['corechart', 'table'] });
    };
    Object.defineProperty(GoogleChart.prototype, "chartData", {
        set: function (data) {
            this.drawGraph(this.chartOptions, this.chartType, data, this._element);
        },
        enumerable: true,
        configurable: true
    });
    GoogleChart.prototype.drawGraph = function (chartOptions, chartType, chartData, ele) {
        google.charts.setOnLoadCallback(drawChart);
        var that = this;
        function drawChart() {
            var wrapper;
            wrapper = new google.visualization.ChartWrapper({
                chartType: chartType,
                dataTable: chartData,
                options: chartOptions || {},
                containerId: ele.id
            });
            google.visualization.events.addListener(wrapper, 'ready', onReady);
            wrapper.draw();
            function onReady() {
                google.visualization.events.addListener(wrapper.getChart(), 'click', selectHandler);
                google.visualization.events.addListener(wrapper.getChart(), 'onmouseover', onmouseover);
                google.visualization.events.addListener(wrapper.getChart(), 'onmouseout', onmouseout);
            }
            function selectHandler(e) {
                that.selectedData = {};
                that.selectedData = {
                    wrapper: wrapper,
                    chartId: ele,
                    e: e
                };
                that.onSelected.emit(that.selectedData);
            }
            function onmouseover() {
                $('#' + ele.id).css('cursor', 'pointer');
            }
            function onmouseout() {
                $('#' + ele.id).css('cursor', 'default');
            }
        }
    };
    GoogleChart.prototype.reDrawGraph = function () {
        this.drawGraph(this.chartOptions, this.chartType, this.chartData, this._element);
    };
    __decorate([
        core_1.Input('chartType'),
        __metadata("design:type", Object)
    ], GoogleChart.prototype, "chartType", void 0);
    __decorate([
        core_1.Input('chartOptions'),
        __metadata("design:type", Object)
    ], GoogleChart.prototype, "chartOptions", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", Object),
        __metadata("design:paramtypes", [Object])
    ], GoogleChart.prototype, "chartData", null);
    __decorate([
        core_1.Output(),
        __metadata("design:type", core_1.EventEmitter)
    ], GoogleChart.prototype, "onSelected", void 0);
    GoogleChart = __decorate([
        core_1.Directive({
            selector: '[GoogleChart]'
        }),
        __metadata("design:paramtypes", [core_1.ElementRef])
    ], GoogleChart);
    return GoogleChart;
}());
exports.GoogleChart = GoogleChart;
//# sourceMappingURL=chart.directive.js.map