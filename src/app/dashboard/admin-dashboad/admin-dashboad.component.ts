import { DatePipe } from '@angular/common';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ChartDataSets, ChartOptions } from 'chart.js';
import * as moment from 'moment';
import { Color, ThemeService } from 'ng2-charts';
import { element } from 'protractor';
import { LocalUserService } from 'src/app/core/services/local-user.service';
import { UserService } from 'src/app/core/services/user.service';
import { DashboardService } from '../dashboard.service';
import { AdminDashboard } from '../model';

//  chart data reverse the array and add only first 10
// instead of foreach put for loop and iterate till 10th index
@Component({
  selector: 'app-admin-dashboad',
  templateUrl: './admin-dashboad.component.html',
  styleUrls: ['./admin-dashboad.component.css']
})

export class AdminDashboadComponent implements OnInit {
  //line chart
  schoolId: string;
  size: number = 2;
  adminDashboard = {} as AdminDashboard
  lineChartLabels = [];
  lineChartData = [];
  lineChartData2 = [] as number[];
  linechartValue = [] as ChartDataSets[]

  barChartLabels = [] as string[];
  barChartData = [] as number[];
  barChartValue = [] as ChartDataSets[]
  public lineChartType = 'line';
  public lineChartLegend = true;
  public lineChartPlugins = [];

  //bar-chart
  public barChartType = 'bar';
  public barChartLegend = true;
  public barChartPlugins = [];

  @ViewChild('barChart')
  myCanvas: ElementRef<HTMLCanvasElement>;

  //line chart -------data
  public lineChartOptions: ChartOptions = {
    responsive: true,

    legend: {
      display: true,
      labels: {
        fontColor: 'gray'
      }
    },
    scales: {
      xAxes: [{
        ticks: {
          fontColor: 'gray',
        },
        gridLines: { color: '' }
      }],
      yAxes: [{
        ticks: { fontColor: 'gray' ,
        callback: function(val) {
          return Number.isInteger(val) ? val : null;
        }
      },
        gridLines: { color: '' }
      }]
    }
  };

  // bar chart ------- data

  public barChartOptions: ChartOptions = {

    responsive: true,

    legend: {
      display: true,

      labels: {
        fontColor: 'gray'
      }
    },

    scales: {
      xAxes: [{
        ticks: {
          fontColor: 'gray',
        },
        gridLines: { color: '' }
      }],
      yAxes: [{
        ticks: { fontColor: 'gray' },
        gridLines: { color: '' }
      }]
    }
  };


  constructor(private localUserService: LocalUserService,
    private dashboardService: DashboardService,
    private themeService: ThemeService,
    private datePipe: DatePipe,
    private userService: UserService
  ) {
    this.schoolId = this.localUserService.getUser().belongs_to_school;
    this.adminDashboard.closedSchedule = 0;
    this.adminDashboard.liveSchedulesCount = 0;
    this.adminDashboard.studentsCount = 0;
    this.adminDashboard.teachersCount = 0;
    this.adminDashboard.upcomingSchedulesCount = 0;
  }

  ngOnInit(): void {
    this.getAndSetData();

  }

  private getAndSetData() {
    this.dashboardService.getDashboardValue(this.schoolId).subscribe(data => {
      this.adminDashboard = data
      console.log(this.adminDashboard);

      this.adminDashboard.attendancePercentage = data.attendancePercentage.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()).slice(0, 10)
      this.adminDashboard.teacherClosedClassChart = data.teacherClosedClassChart.sort((a, b) => b.count - a.count).slice(0, 10)
      console.log("class chart", this.adminDashboard.teacherClosedClassChart);
      console.log("attended chart", this.adminDashboard.attendancePercentage);



      this.adminDashboard.attendancePercentage.forEach(element => {

        //calculate percentage with participant divide by attendance and push that value
        this.lineChartData.push(element.participants);


        this.lineChartData2.push(element.attended)


      });
      const dates = this.adminDashboard.attendancePercentage.map(item => item.date);
      this.lineChartLabels = []
      dates.forEach(element => {
        const val = new Date(element)
        const date = this.datePipe.transform(val, 'yyyy-MM-dd');
        this.lineChartLabels.push(date)





        // this.lineChartLabels.reverse().slice(0, this.size)

      });
      this.linechartValue[1] = {} as ChartDataSets
      this.linechartValue[1].data = this.lineChartData2;
      this.linechartValue[1].label = "attended";
      this.linechartValue[1].backgroundColor = "#0F9D58"
      this.linechartValue[1].borderColor = "#0F9D58"
      this.linechartValue[0].data = this.lineChartData;
      this.linechartValue[0].label = "Participants";
      this.linechartValue[0].fill = 1
      this.linechartValue[0].backgroundColor = "#F4B400"
      this.linechartValue[0].borderColor = "#F4B400"
      this.linechartValue[0].pointBackgroundColor = "#F4B400"


      this.userService.getAllUsers(this.localUserService.getUser().belongs_to_school).subscribe(data => {


        this.adminDashboard.teacherClosedClassChart.forEach(element => {
          this.barChartLabels.push(data.find(item => item._id == element.host_id).name)
        });
      })
      this.barChartData = this.adminDashboard.teacherClosedClassChart.map(item => item.count);
      var chart = this.myCanvas.nativeElement.getContext('2d'),
        gradient = chart.createLinearGradient(0, 0, 0, 450);

      gradient.addColorStop(0, 'rgba(255, 0,0, 0.5)');
      gradient.addColorStop(0.5, 'rgba(255, 0, 0, 0.25)');
      gradient.addColorStop(1, 'rgba(255, 0, 0, 0)');

      this.barChartValue[0].data = this.barChartData;
      this.barChartValue[0].label = 'Closed Schedules'
      this.barChartValue[0].backgroundColor = gradient
      this.barChartValue[0].hoverBackgroundColor = "#0F9D58"
    })
  }




}

