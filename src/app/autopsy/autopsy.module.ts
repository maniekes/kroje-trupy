import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {AutopsyRoutingModule} from './autopsy-routing.module';
import {AutopsyComponent} from './autopsy.component';
import {MatButton} from "@angular/material/button";
import {MatFormField, MatFormFieldModule, MatHint, MatLabel} from "@angular/material/form-field";
import {MatAutocompleteModule, MatOption} from "@angular/material/autocomplete";
import {MatSelect} from "@angular/material/select";
import {ReactiveFormsModule} from "@angular/forms";
import {AutopsyDisplayComponent} from "../autopsy-display/autopsy-display.component";
import {TranslateModule} from "@ngx-translate/core";
import {MatDatepicker, MatDatepickerInput, MatDatepickerToggle} from "@angular/material/datepicker";
import {MatInput} from "@angular/material/input";
import {AutopsyEditComponent} from "../autopsy-edit/autopsy-edit.component";


@NgModule({
    declarations: [
        AutopsyComponent
    ],
    imports: [
        CommonModule,
        AutopsyRoutingModule,
        MatButton,
        MatFormField,
        MatLabel,
        MatOption,
        MatSelect,
        ReactiveFormsModule,
        AutopsyDisplayComponent,
        MatAutocompleteModule,
        CommonModule,
        ReactiveFormsModule,
        TranslateModule,
        MatFormField,
        MatLabel,
        MatFormField,
        MatSelect,
        MatHint,
        MatFormFieldModule,
        MatOption,
        MatDatepickerToggle,
        MatDatepicker,
        MatDatepickerInput,
        MatButton,
        MatInput,
        AutopsyEditComponent
    ]
})
export class AutopsyModule {
}
