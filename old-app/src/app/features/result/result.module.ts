import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpModule } from '@angular/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { ResultListComponent } from './result-list/result-list.component';
import { ResultEditComponent } from './result-edit/result-edit.component';

import { ResultRoutingModule } from './result-routing.module';
import { ResultService } from './result.service';

import { AnswerModule } from '../answer/answer.module';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    HttpModule,

    ResultRoutingModule,
    AnswerModule
  ],
  declarations: [ResultListComponent, ResultEditComponent],
  exports: [
    ResultListComponent
  ],
  providers: [
    ResultService
  ],
})
export class ResultModule { }
