import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AutopsyRoutingModule } from './autopsy-routing.module';
import { AutopsyComponent } from './autopsy.component';
import {MatButton} from "@angular/material/button";
import {MatFormField, MatLabel} from "@angular/material/form-field";
import {MatOption} from "@angular/material/autocomplete";
import {MatSelect} from "@angular/material/select";
import {ReactiveFormsModule} from "@angular/forms";
import {AutopsyDisplayComponent} from "../autopsy-display/autopsy-display.component";


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
    AutopsyDisplayComponent
  ]
})
export class AutopsyModule { }
