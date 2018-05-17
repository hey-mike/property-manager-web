import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { QuestionEditComponent } from './question-edit/question-edit.component';


const routes: Routes = [
    { path: 'question/create/:id', component: QuestionEditComponent },
    { path: 'question/edit/:id', component: QuestionEditComponent },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class QuestionRoutingModule { }
