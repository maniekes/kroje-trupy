import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {HomeRoutingModule} from './home-routing.module';

import {HomeComponent} from './home.component';

import {MatAnchor, MatButton} from "@angular/material/button";
import {MatToolbar} from "@angular/material/toolbar";
import {MatCard, MatCardActions, MatCardContent, MatCardHeader, MatCardModule} from "@angular/material/card";
import {AutopsyUploadComponent} from "../autopsy-upload/autopsy-upload.component";

@NgModule({
    imports: [CommonModule, HomeRoutingModule, MatAnchor, MatToolbar, MatCard, MatCardModule, MatCardHeader, MatCardContent, MatCardActions, MatButton, AutopsyUploadComponent, HomeComponent]
})
export class HomeModule {
}
