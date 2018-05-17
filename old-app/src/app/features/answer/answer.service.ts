import { Injectable, Inject, Optional } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { APP_BASE_HREF } from '@angular/common';

import { Observable ,  of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';

import handleError from '../../core/http.error.handler';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable()
export class AnswerService {

  private answerUrl = 'api/answer';  // URL to web api
  private quizzez = [];


  constructor(private http: HttpClient,
    @Optional() @Inject(APP_BASE_HREF) origin: string) {
    this.answerUrl = `${origin}${this.answerUrl}`;
  }

  /** GET answers from the server */
  getAnswers(id: number): Observable<Answer[]> {
    const url = `${this.answerUrl}/All/${id}`;
    return this.http.get<Answer[]>(url)
      .pipe(
        tap(answers => console.log(`fetched answers by date`)),
        catchError(handleError('getAnswers', []))
      );
  }

  /** GET answer by id. Return `undefined` when id not found */
  getAnswerNo404<Data>(id: number): Observable<Answer> {
    const url = `${this.answerUrl}/?id=${id}`;
    return this.http.get<Answer[]>(url)
      .pipe(
        map(answers => answers[0]), // returns a {0|1} element array
        tap(h => {
          const outcome = h ? `fetched` : `did not find`;
          console.log(`${outcome} answer id=${id}`);
        }),
        catchError(handleError<Answer>(`getAnswer id=${id}`))
      );
  }

  /** GET answer by id. Will 404 if id not found */
  getAnswer(id: number): Observable<Answer> {
    const url = `${this.answerUrl}/${id}`;
    return this.http.get<Answer>(url).pipe(
      tap(_ => console.log(`fetched answer id=${id}`)),
      catchError(handleError<Answer>(`getAnswer id=${id}`))
    );
  }

  /* GET answers whose name contains search term */
  searchAnswers(term: string): Observable<Answer[]> {
    if (!term.trim()) {
      // if not search term, return empty answer array.
      return of([]);
    }
    return this.http.get<Answer[]>(`api/answers/?name=${term}`).pipe(
      tap(_ => console.log(`found answers matching "${term}"`)),
      catchError(handleError<Answer[]>('searchAnswers', []))
    );
  }

  //////// Save methods //////////

  /** POST: add a new answer to the server */
  addAnswer(answer: Answer): Observable<Answer> {
    return this.http.post<Answer>(this.answerUrl, answer, httpOptions).pipe(
      tap((newquiz: Answer) => console.log(`added answer w/ id=${newquiz.id}`)),
      catchError(handleError<Answer>('addAnswer'))
    );
  }

  /** DELETE: delete the answer from the server */
  deleteAnswer(answer: Answer | number): Observable<Answer> {
    const id = typeof answer === 'number' ? answer : answer.id;
    const url = `${this.answerUrl}/${id}`;

    return this.http.delete<Answer>(url, httpOptions).pipe(
      tap(_ => console.log(`deleted answer id=${id}`)),
      catchError(handleError<Answer>('deleteAnswer'))
    );
  }

  /** PUT: update the answer on the server */
  updateAnswer(answer: Answer): Observable<any> {
    return this.http.put(this.answerUrl, answer, httpOptions).pipe(
      tap(_ => console.log(`updated answer id=${answer.id}`)),
      catchError(handleError<any>('updateAnswer'))
    );
  }
}
