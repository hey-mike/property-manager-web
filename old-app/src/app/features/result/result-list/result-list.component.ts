import { Component, OnInit, Input, OnChanges, SimpleChanges } from '@angular/core';
import { Router } from '@angular/router';
import { ResultService } from '../result.service';

@Component({
  selector: 'app-result-list',
  templateUrl: './result-list.component.html',
  styleUrls: ['./result-list.component.css']
})
export class ResultListComponent implements OnInit, OnChanges {
  @Input() quiz: Quiz;
  results: Result[];
  title: string;

  constructor(private resultService: ResultService, private router: Router) {
    this.results = [];
  }


  ngOnChanges(changes: SimpleChanges) {
    if (changes['quiz']) {

      // retrieve the quiz variable change info
      const change = changes['quiz'];

      // only perform the task if the value has been changed
      if (!change.isFirstChange()) {
        // execute the Http request and retrieve the result
        this.loadData();
      }
    }
  }

  ngOnInit() {

  }

  loadData() {
    this.resultService.getResults(this.quiz.id).subscribe(results => this.results = results);
  }

  onCreate() {
    this.router.navigate(['/result/create', this.quiz.id]);
  }

  onEdit(result: Result) {
    this.router.navigate(['/result/edit', result.id]);
  }

  onDelete(result: Result) {
    if (confirm('Do you really want to delete this result?')) {
      this.resultService.deleteResult(result.id).subscribe(res => {
        console.log('Result ' + result.id + ' has been deleted.');

        // refresh the result list
        this.loadData();
      });
    }
  }

}
