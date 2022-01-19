import { Component, Input, OnInit } from '@angular/core';
import { ChartDataSets, ChartOptions } from 'chart.js';
import { Color } from 'ng2-charts';
import { QuizResultsService } from 'src/app/quiz/quiz-results.service';

@Component({
    selector: 'app-result-chart',
    templateUrl: './result-chart.component.html',
    styleUrls: ['./result-chart.component.css']
})

export class ResultChartComponent implements OnInit {
    sort: any[];
    view: any[] = [];
    showXAxis = true;
    showYAxis = false;
    gradient = false;
    ShowDataLabel = true;
    showLegend = true;
    showXAxisLabel = true;
    xAxisLabel = 'Options';
    showYAxisLabel = true;
    yAxisLabel = 'Selected';
    numbers: any[];
    colorScheme = {
        domain: ['#EF5BA1', '#A6CE39', '#00AEEF', '#A20A43']
    };
    onSelect(event) {
        console.log(event);
    }

    @Input() chartData = []
    constructor(private quizResultsService: QuizResultsService) {

    }
    chartLabels = []
    valuesFromObjec = []
    chartValue = [] as ChartDataSets[]
    @Input() scheduleId: string = '';
    ngOnInit() {
    }
    onActivate(event) {
        console.log(event);
    }
    ngOnChanges() {
        console.log("chart data is", this.chartData);
        console.log("scheduleId++++", this.scheduleId);
        const mapped = Object.keys(this.chartData).map(key => ({ name: key.toLocaleUpperCase(), value: this.chartData[key] }));
        const A = mapped.find(x => x.name == 'A')
        console.log("A", A);
        if (A == undefined) {
            mapped.push({ "name": "A", value: 0 })
        }
        const B = mapped.find(x => x.name == 'B')
        console.log("B", B);
        if (B == undefined) {
            mapped.push({ "name": "B", value: 0 })
        }
        const C = mapped.find(x => x.name == 'C')
        console.log("C", C);
        if (C == undefined) {
            mapped.push({ "name": "C", value: 0 })
        }
        const D = mapped.find(x => x.name == 'D')
        console.log("D", D);
        if (D == undefined) {
            mapped.push({ "name": "D", value: 0 })
        }
        console.log("MAPPED", mapped);
        const sort = mapped.sort((a, b) => a.name.localeCompare(b.name))
        Object.assign(this, { sort })
    }
}

