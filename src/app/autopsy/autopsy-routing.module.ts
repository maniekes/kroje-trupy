import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {AutopsyComponent} from './autopsy.component';
import {AutopsyDisplayComponent} from "../autopsy-display/autopsy-display.component";
import {AutopsyEditComponent} from "../autopsy-edit/autopsy-edit.component";

const routes: Routes = [{
    path: '', component: AutopsyComponent,
    children: [
        {
            path: '',
            component: AutopsyDisplayComponent,
            pathMatch: 'full'
        },
        {
            path: ':edit',
            component: AutopsyEditComponent
        }
    ]
}];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class AutopsyRoutingModule {
}
