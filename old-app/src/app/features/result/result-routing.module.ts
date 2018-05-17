import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ResultEditComponent } from './result-edit/result-edit.component';


const routes: Routes = [
    { path: 'result/create/:id', component: ResultEditComponent },
    { path: 'result/edit/:id', component: ResultEditComponent },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class ResultRoutingModule { }
