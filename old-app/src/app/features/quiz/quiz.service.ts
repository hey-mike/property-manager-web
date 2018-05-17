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
export class QuizService {
  private quizzesByDateUrl = 'api/quiz/Latest';  // URL to web api
  private quizzesByTitleUrl = 'api/quiz/ByTitle';  // URL to web api
  private quizzesByRandomUrl = 'api/quiz/Random';  // URL to web api
  private quizUrl = 'api/quiz';  // URL to web api
  private quizzez = [];


  constructor(private http: HttpClient,
    @Optional() @Inject(APP_BASE_HREF) origin: string) {
    this.quizzesByDateUrl = `${origin}${this.quizzesByDateUrl}`;
    this.quizzesByTitleUrl = `${origin}${this.quizzesByTitleUrl}`;
    this.quizzesByRandomUrl = `${origin}${this.quizzesByRandomUrl}`;
    this.quizUrl = `${origin}${this.quizUrl}`;

  }

  /** GET quizzes from the server */
  getQuizzesByDate(): Observable<Quiz[]> {
    return this.http.get<Quiz[]>(this.quizzesByDateUrl)
      .pipe(
        tap(quizzes => console.log(`fetched quizzes by date`)),
        catchError(handleError('getQuizzes', []))
      );
  }

  getQuizzesByTitle(): Observable<Quiz[]> {
    return this.http.get<Quiz[]>(this.quizzesByTitleUrl)
      .pipe(
        tap(quizzes => console.log(`fetched quizzes by title`)),
        catchError(handleError('getQuizzes', []))
      );
  }
  getQuizzesByRandom(): Observable<Quiz[]> {
    return this.http.get<Quiz[]>(this.quizzesByRandomUrl)
      .pipe(
        tap(quizzes => console.log(`fetched quizzes by random`)),
        catchError(handleError('getQuizzes', []))
      );
  }

  /** GET quiz by id. Return `undefined` when id not found */
  getQuizNo404<Data>(id: number): Observable<Quiz> {
    const url = `${this.quizzesByDateUrl}/?id=${id}`;
    return this.http.get<Quiz[]>(url)
      .pipe(
        map(quizzes => quizzes[0]), // returns a {0|1} element array
        tap(h => {
          const outcome = h ? `fetched` : `did not find`;
          console.log(`${outcome} quiz id=${id}`);
        }),
        catchError(handleError<Quiz>(`getQuiz id=${id}`))
      );
  }

  /** GET quiz by id. Will 404 if id not found */
  getQuiz(id: number): Observable<Quiz> {
    const url = `${this.quizUrl}/${id}`;
    return this.http.get<Quiz>(url).pipe(
      tap(_ => console.log(`fetched quiz id=${id}`)),
      catchError(handleError<Quiz>(`getQuiz id=${id}`))
    );
  }

  /* GET quizzes whose name contains search term */
  searchQuizzes(term: string): Observable<Quiz[]> {
    if (!term.trim()) {
      // if not search term, return empty quiz array.
      return of([]);
    }
    return this.http.get<Quiz[]>(`api/quizzes/?name=${term}`).pipe(
      tap(_ => console.log(`found quizzes matching "${term}"`)),
      catchError(handleError<Quiz[]>('searchQuizzes', []))
    );
  }

  //////// Save methods //////////

  /** POST: add a new quiz to the server */
  addQuiz(quiz: Quiz): Observable<Quiz> {
    return this.http.post<Quiz>(this.quizUrl, quiz, httpOptions).pipe(
      tap((newquiz: Quiz) => console.log(`added quiz w/ id=${newquiz.id}`)),
      catchError(handleError<Quiz>('addQuiz'))
    );
  }

  /** DELETE: delete the quiz from the server */
  deleteQuiz(quiz: Quiz | number): Observable<Quiz> {
    const id = typeof quiz === 'number' ? quiz : quiz.id;
    const url = `${this.quizUrl}/${id}`;

    return this.http.delete<Quiz>(url, httpOptions).pipe(
      tap(_ => console.log(`deleted quiz id=${id}`)),
      catchError(handleError<Quiz>('deleteQuiz'))
    );
  }

  /** PUT: update the quiz on the server */
  updateQuiz(quiz: Quiz): Observable<any> {
    return this.http.put(this.quizUrl, quiz, httpOptions).pipe(
      tap(_ => console.log(`updated quiz id=${quiz.id}`)),
      catchError(handleError<any>('updateQuiz'))
    );
  }
}
