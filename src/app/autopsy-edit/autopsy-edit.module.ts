import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {AutopsyEditRoutingModule} from './autopsy-edit-routing.module';
import {AutopsyEditComponent} from './autopsy-edit.component';
import {TranslateModule} from "@ngx-translate/core";
import {ReactiveFormsModule} from "@angular/forms";


@NgModule({
  declarations: [
    AutopsyEditComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    AutopsyEditRoutingModule,
    TranslateModule
  ]
})
export class AutopsyEditModule {
}
