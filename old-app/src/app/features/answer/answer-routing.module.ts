import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AnswerEditComponent } from './answer-edit/answer-edit.component';


const routes: Routes = [
    { path: 'answer/create/:id', component: AnswerEditComponent },
    { path: 'answer/edit/:id', component: AnswerEditComponent },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class AnswerRoutingModule { }
