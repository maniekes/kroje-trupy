import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AutopsyComponent } from './autopsy.component';

const routes: Routes = [{ path: '', component: AutopsyComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AutopsyRoutingModule { }
