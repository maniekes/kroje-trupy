import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {AutopsyRoutingModule} from './autopsy-routing.module';
import {AutopsyComponent} from './autopsy.component';
import {MatAnchor, MatButton, MatIconAnchor, MatIconButton} from "@angular/material/button";
import {MatFormField, MatFormFieldModule, MatHint, MatLabel} from "@angular/material/form-field";
import {MatAutocompleteModule, MatOption} from "@angular/material/autocomplete";
import {MatSelect} from "@angular/material/select";
import {ReactiveFormsModule} from "@angular/forms";
import {AutopsyDisplayComponent} from "../autopsy-display/autopsy-display.component";
import {TranslateModule} from "@ngx-translate/core";
import {MatDatepicker, MatDatepickerInput, MatDatepickerToggle} from "@angular/material/datepicker";
import {MatInput} from "@angular/material/input";
import {AutopsyEditComponent} from "../autopsy-edit/autopsy-edit.component";
import {MatToolbar} from "@angular/material/toolbar";
import {MatIcon} from "@angular/material/icon";
import {MatSlideToggle} from "@angular/material/slide-toggle";
import {MatMenu, MatMenuItem, MatMenuTrigger} from "@angular/material/menu";
import {MatTooltip} from "@angular/material/tooltip";


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
    AutopsyEditComponent,
    MatAnchor,
    MatToolbar,
    MatIcon,
    MatSlideToggle,
    MatMenu,
    MatMenuTrigger,
    MatIconButton,
    MatIconAnchor,
    MatTooltip,
    MatMenuItem
  ]
})
export class AutopsyModule {
}
