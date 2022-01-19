import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AdminThemeComponent } from './admin-theme.component';
import { MaterialModule } from '../core/material.modute';


@NgModule({
    declarations: [AdminThemeComponent],
    exports: [AdminThemeComponent],
    imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        MaterialModule,
    ]
})
export class AdminThemeModule { }
