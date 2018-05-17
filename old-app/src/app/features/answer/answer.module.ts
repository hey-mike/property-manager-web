import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpModule } from '@angular/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


import { AnswerListComponent } from './answer-list/answer-list.component';
import { AnswerEditComponent } from './answer-edit/answer-edit.component';

import { AnswerRoutingModule } from './answer-routing.module';
import { AnswerService } from './answer.service';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    HttpModule,

    AnswerRoutingModule
  ],
  declarations: [AnswerListComponent, AnswerEditComponent],
  exports: [AnswerListComponent],
  providers: [
    AnswerService
  ],
})
export class AnswerModule { }
