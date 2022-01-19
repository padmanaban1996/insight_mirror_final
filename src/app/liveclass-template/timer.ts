import { Component, OnInit, OnDestroy, Input } from '@angular/core';
import { Iquestion } from '../quiz/model/quiz';
import { singleStudentAnswerSheet } from './model';


/**
 * This component template wrap the projected content
 * with a 'cdkPortal'.
 */

@Component({
    selector: 'timer',
    template: `
    <div *ngIf="(start == true || next == true ) && showResults == false">
    <countdown [config]="config" *ngIf="seconds > 0"  class="timer"></countdown>
    </div>
  `
})
export class TimerComponent implements OnInit {
    @Input() currentQuestionData = {} as Iquestion;
    @Input() start: boolean;
    @Input() next: boolean;
    @Input() end: boolean;
    @Input() showResults: boolean;
    @Input() chartData;
    @Input() optionsAndFrequency = {}
    @Input() studentsAnswers = [] as singleStudentAnswerSheet[];
    @Input() scheduleId: string = '';
    @Input() seconds: number;
    config: any;
    constructor() { }


    ngOnInit() {
    }
    ngAfterViewInit() {

    }
    ngOnChanges() {
        this.config = { leftTime: this.seconds, format: 'mm:ss' };
    }
    ngOnDestroy() {

    }
}