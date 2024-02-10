import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AutopsyRoutingModule } from './autopsy-routing.module';
import { AutopsyComponent } from './autopsy.component';
import {MatButton} from "@angular/material/button";


@NgModule({
  declarations: [
    AutopsyComponent
  ],
  imports: [
    CommonModule,
    AutopsyRoutingModule,
    MatButton
  ]
})
export class AutopsyModule { }
