import { Component, Input } from '@angular/core';

// im is short for insight mirror
@Component({
    selector: 'app-im-modal',
    template: '<ngb-alert [type]="type" *ngIf="open" (close)="open=false"><ng-content></ng-content></ngb-alert>',
})
export class ImModalComponent {
    public open = true;
    @Input() type = 'info';
}