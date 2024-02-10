import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AutopsyRoutingModule } from './autopsy-routing.module';
import { AutopsyComponent } from './autopsy.component';


@NgModule({
  declarations: [
    AutopsyComponent
  ],
  imports: [
    CommonModule,
    AutopsyRoutingModule
  ]
})
export class AutopsyModule { }
