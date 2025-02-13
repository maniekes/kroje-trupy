import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {PageNotFoundComponent} from './shared/components';

import {HomeRoutingModule} from './home/home-routing.module';
import {DetailRoutingModule} from './detail/detail-routing.module';
import {AutopsyRoutingModule} from "./autopsy/autopsy-routing.module";

const routes: Routes = [
    {
        path: '',
        redirectTo: 'home',
        pathMatch: 'full'
    },
    {
        path: '**',
        component: PageNotFoundComponent
    }
];

@NgModule({
    imports: [
        RouterModule.forRoot(routes, {}),
        HomeRoutingModule,
        DetailRoutingModule,
        AutopsyRoutingModule
    ],
    exports: [RouterModule]
})
export class AppRoutingModule {
}
