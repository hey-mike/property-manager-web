import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AboutComponent } from './core/components/about/about.component';
import { PagenotfoundComponent } from './core/components/pagenotfound/pagenotfound.component';
import { AppLayoutComponent } from './core/components/app-layout/app-layout.component';

import { AuthGuard } from './core/guards/auth.guard';

const appRoutes: Routes = [
    { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
    { path: '**', component: PagenotfoundComponent }
];

@NgModule({
    imports: [
        RouterModule.forRoot(
            appRoutes,
            { enableTracing: false } // <-- debugging purposes only
        )
    ],
    exports: [
        RouterModule
    ]
})
export class AppRoutingModule { }
