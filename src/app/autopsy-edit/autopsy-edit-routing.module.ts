import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AutopsyEditComponent } from './autopsy-edit.component';

const routes: Routes = [{ path: '', component: AutopsyEditComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AutopsyEditRoutingModule { }
