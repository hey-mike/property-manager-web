import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { QuizComponent } from './quiz.component';
import { QuizEditComponent } from './quiz-edit/quiz-edit.component';
import { AppLayoutComponent } from '../../core/components/app-layout/app-layout.component';

const routes: Routes = [
    {
        path: '',
        component: AppLayoutComponent,
        children: [
            { path: 'quiz/edit/:id', component: QuizEditComponent },
            { path: 'quiz/create', component: QuizEditComponent },
            { path: 'quiz/:id', component: QuizComponent },
        ]
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class QuizRoutingModule { }
