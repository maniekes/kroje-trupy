import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {AutopsyEditRoutingModule} from './autopsy-edit-routing.module';
import {AutopsyEditComponent} from './autopsy-edit.component';
import {TranslateModule} from "@ngx-translate/core";
import {ReactiveFormsModule} from "@angular/forms";
import {MatFormField, MatFormFieldModule, MatHint, MatLabel} from "@angular/material/form-field";
import {MatOption, MatSelect} from "@angular/material/select";
import {
  MatDatepicker,
  MatDatepickerInput,
  MatDatepickerModule,
  MatDatepickerToggle
} from "@angular/material/datepicker";
import {MatButton} from "@angular/material/button";
import {MatInput} from "@angular/material/input";
import {MatNativeDateModule} from "@angular/material/core";


@NgModule({
  declarations: [
    AutopsyEditComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    AutopsyEditRoutingModule,
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
    MatInput
  ]
})
export class AutopsyEditModule {
}
