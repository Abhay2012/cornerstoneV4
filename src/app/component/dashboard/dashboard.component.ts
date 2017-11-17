import { Component, NgZone, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { ChartService } from "../../providers/chart.service";
import { LoaderStop } from "../../providers/loaderstop.service";

@Component({
  selector: 'dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnDestroy {
  public  complaintByStatus: any;
  public  suggestionByStatus: any;
  public  complaintByCategoryAndStatus: any;
  public  categoryAndStatusChartOptions: any;
  public  complaintByStatusChartOptions: any;
  public  suggestionByStatusChartOptions: any;
  public  loader: boolean = false;
  public  loader1: boolean = false;
  public  loader2: boolean = false;
  public  responseByStatus: any=[];
  public  responseByCategoryAndStatus: any=[];
  public  responseSuggestionByStatus: any=[];

  constructor(public  cs: ChartService, public router: Router, public ls : LoaderStop, public zone: NgZone) {
     this.ls.setLoader(false);
    this.loader = true;
    this.loader1 = true;
    this.loader2 = true;
    cs.getComplaintByCategoryAndStatus().subscribe((response:any) => {
      if(response.status === 204){
        this.loader=false;
        this.responseByCategoryAndStatus = 0;
        return;
      }
      this.responseByCategoryAndStatus = response
      this.chartByCategoryAndStatus();
    },
    (err:any) =>{
      this.router.navigate(['/error']);
    });
    


    cs.getComplaintByStatus().subscribe((response:any) => {
      if(response.status === 204){
        this.loader1=false;
        this.responseByStatus = 0;
        return;
      }
      this.responseByStatus = response;
      this.chartByStatus();
     
    },
    (err:any) =>{
      this.router.navigate(['/error']);
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

  onSelected(data: any) {
    var dataTable = data.wrapper.getDataTable();
    var parts = data.e.targetID.split('#');
    switch (data.chartId.id) {
      case "complaint_chart_by_status":
        if (parts[0] == "slice") {
          this.zone.run(() => this.router.navigate(['/complaint/status/' + dataTable.getValue(parseInt(parts[1]), 2)]));
        }
        else if (parts[0] == "legendentry"){

        }
        break;
      case "EWNS_suggestion":
        if (parts[0] == "slice") {
          this.zone.run(() => this.router.navigate(['/suggestion/status/' + dataTable.getValue(parseInt(parts[1]), 2)]));
        }
        else if (parts[0] == "legendentry") {
          
        }
        break;
      case "chart_by_category_status":
        if (parts[0] == "vAxis") {
          var categoryId = dataTable.getValue(parseInt(parts[parts.indexOf('label') + 1]), 1);
          this.zone.run(() => this.router.navigate(['/complaint/category-status/category/' + categoryId]));
        }
        else if (parts[0] == "bar") {
          var categoryId = dataTable.getValue(parseInt(parts[2]), 1);
          var statusId = dataTable.getValue(parseInt(parts[2]), (parseInt(parts[1]) + 1) * 2 + 1);
          this.zone.run(() => this.router.navigate(['complaint/category-status/' + categoryId + '/' + statusId]));

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
  }

  onResize(event: any) {
    console.log("check0");
    this.chartByStatus();
    this.chartByCategoryAndStatus();
    this.chartBySuggestionStatus();
    
}

  chartByStatus() {
    console.log("check1");
    var data: any = [];
    data.push(['Status', 'complaint', { type: 'number', role: 'scope' }]);
    for (let i = 0; i < this.responseByStatus.length; i++) {
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
    }
     this.loader1 = false;
  }


  chartByCategoryAndStatus() {
    console.log("check2");
    var data: any = [[]];
    data[0].push('categoryName');
    data[0].push({ type: 'number', role: 'scope' });
    for (let i = 0; i < this.responseByCategoryAndStatus[0].statusResults.length; i++) {
      data[0].push(this.responseByCategoryAndStatus[0].statusResults[i].statusName);
      data[0].push({ type: 'number', role: 'scope' });
    }
    data[0].push('All Status');

    for (let i = 0; i < this.responseByCategoryAndStatus.length; i++) {
      data[i + 1] = [];
      data[i + 1].push(this.responseByCategoryAndStatus[i].categoryName);
      data[i + 1].push(this.responseByCategoryAndStatus[i].categoryId);
      for (let j = 0; j < this.responseByCategoryAndStatus[i].statusResults.length; j++) {
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
    this.loader=false;
  }

  chartBySuggestionStatus() {
    var data: any = [];
    console.log("check3");
    data.push(['Status', 'suggestion', { type: 'number', role: 'scope' }]);
    for (let i = 0; i < this.responseSuggestionByStatus.length; i++) {
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
    }
    this.loader2 = false;
  }
  ngOnDestroy(){
     this.ls.setLoader(true); 
    }
}