import { Component, OnInit } from '@angular/core';
import { MatSlideToggleChange } from '@angular/material/slide-toggle';
import { Router } from '@angular/router';
import { ThemeService } from './theme.service';

@Component({
    selector: 'app-admin-theme',
    templateUrl: './admin-theme.component.html',
    styleUrls: ['./admin-theme.component.css']
})
export class AdminThemeComponent implements OnInit {
    public useDefault = false;

    constructor(private router: Router, private themeService: ThemeService) { }

    ngOnInit() {
        this.useDefault = this.themeService.gettheme();

    }

    public toggle(event: MatSlideToggleChange) {
        this.useDefault = event.checked;
        if (event.checked == true) {
            this.themeService.toggleDark();
            this.hideDiv = false;
        }
        else {
            this.themeService.toggleLight();
            this.hideDiv = true;
            // localStorage.setItem('toggleButtonState', JSON.stringify(this.useDefault))
        }
    }
    public get hideDiv(): boolean {
        return this.themeService.hideDiv;
    }
    public set hideDiv(value: boolean) {
        this.themeService.hideDiv = value;
    }


}

