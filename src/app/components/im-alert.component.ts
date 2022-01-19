import { Component, Input } from '@angular/core';

// im is short for insight mirror
@Component({
    selector: 'app-im-alert',
    template: '<ngb-alert  [type]="type" *ngIf="open" (close)="open=false"><ng-content></ng-content></ngb-alert>',
})
export class ImAlertComponent {
    public open = true;
    @Input() type = 'info';
}