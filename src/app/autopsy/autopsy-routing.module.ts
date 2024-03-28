import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {AutopsyComponent} from './autopsy.component';

const routes: Routes = [
  {path: 'autopsy/:id/:edit', component: AutopsyComponent},
    {path: 'autopsy/:id', redirectTo: 'autopsy/:id/display', pathMatch: 'full'},
    {path: 'autopsy', redirectTo: 'autopsy/new/edit', pathMatch: 'full'}
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class AutopsyRoutingModule {
}
