import { Injectable, Inject, Optional } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { APP_BASE_HREF } from '@angular/common';

import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';

import handleError from '../../core/http.error.handler';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable()
export class ResultService {
  private resultUrl = 'api/result';  // URL to web api
  private quizzez = [];


  constructor(private http: HttpClient,
    @Optional() @Inject(APP_BASE_HREF) origin: string) {
    this.resultUrl = `${origin}${this.resultUrl}`;
  }

  /** GET results from the server */
  getResults(id: number): Observable<Result[]> {
    const url = `${this.resultUrl}/All/${id}`;
    return this.http.get<Result[]>(url)
      .pipe(
        tap(results => console.log(`fetched results by date`)),
        catchError(handleError('getResultzes', []))
      );
  }

  /** GET result by id. Return `undefined` when id not found */
  getResultNo404<Data>(id: number): Observable<Result> {
    const url = `${this.resultUrl}/?id=${id}`;
    return this.http.get<Result[]>(url)
      .pipe(
        map(results => results[0]), // returns a {0|1} element array
        tap(h => {
          const outcome = h ? `fetched` : `did not find`;
          console.log(`${outcome} result id=${id}`);
        }),
        catchError(handleError<Result>(`getResult id=${id}`))
      );
  }

  /** GET result by id. Will 404 if id not found */
  getResult(id: number): Observable<Result> {
    const url = `${this.resultUrl}/${id}`;
    return this.http.get<Result>(url).pipe(
      tap(_ => console.log(`fetched result id=${id}`)),
      catchError(handleError<Result>(`getResult id=${id}`))
    );
  }

  /* GET results whose name contains search term */
  searchResultzes(term: string): Observable<Result[]> {
    if (!term.trim()) {
      // if not search term, return empty result array.
      return of([]);
    }
    return this.http.get<Result[]>(`api/results/?name=${term}`).pipe(
      tap(_ => console.log(`found results matching "${term}"`)),
      catchError(handleError<Result[]>('searchResultzes', []))
    );
  }

  //////// Save methods //////////

  /** POST: add a new result to the server */
  addResult(result: Result): Observable<Result> {
    return this.http.post<Result>(this.resultUrl, result, httpOptions).pipe(
      tap((newquiz: Result) => console.log(`added result w/ id=${newquiz.id}`)),
      catchError(handleError<Result>('addResult'))
    );
  }

  /** DELETE: delete the result from the server */
  deleteResult(result: Result | number): Observable<Result> {
    const id = typeof result === 'number' ? result : result.id;
    const url = `${this.resultUrl}/${id}`;

    return this.http.delete<Result>(url, httpOptions).pipe(
      tap(_ => console.log(`deleted result id=${id}`)),
      catchError(handleError<Result>('deleteResult'))
    );
  }

  /** PUT: update the result on the server */
  updateResult(result: Result): Observable<any> {
    return this.http.put(this.resultUrl, result, httpOptions).pipe(
      tap(_ => console.log(`updated result id=${result.id}`)),
      catchError(handleError<any>('updateResult'))
    );
  }
}
