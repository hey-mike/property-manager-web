import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ShareModule } from '../../shared/shared.module';

import { QuizModule } from '../quiz/quiz.module';
import { DashboardComponent } from './dashboard.component';
import { DashboardRoutingModule } from './dashboard-routing.module';


@NgModule({
  imports: [
    CommonModule,
    ShareModule,
    DashboardRoutingModule,
    QuizModule
  ],
  declarations: [DashboardComponent],
  exports: [
    DashboardComponent
  ],
  providers: [

  ],
})
export class DashboardModule { }
