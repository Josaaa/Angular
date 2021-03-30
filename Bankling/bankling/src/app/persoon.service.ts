import { Injectable } from '@angular/core';
import { Persoon } from './persoon'; 
import { PERSONEN } from './mock-personen'; 
import { Observable, of, Subject } from 'rxjs';
import { MessageService } from './message.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, map, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class PersoonService {
  private personenUrl = 'api/personen';  // URL to web api
  private personen$ = new Subject<Persoon[]>(); 

  getPersonen(): Observable<Persoon[]> {
    this.messageService.add('PersoonService: personen geladen');
    return this.http.get<Persoon[]>(this.personenUrl).pipe(
      tap(res =>{
        this.log(`personen opgehaald`)
        // HERE BE DRAGONS
        this.personen$.next(res);
      }),
      catchError(this.handleError<Persoon[]>('updatePersoon'))
    );
  }
  getPersoon$(): Observable<Persoon[]>{
    return this.personen$; 
  }

  getPersoon(id: number): Observable<Persoon> {
    const url = `${this.personenUrl}/${id}`;
  return this.http.get<Persoon>(url).pipe(
    tap(_ => this.log(`fetched persoon id=${id}`)),
    catchError(this.handleError<Persoon>(`getPersoon id=${id}`))
  );
  }
  /** Log a HeroService message with the MessageService */
private log(message: string) {
  this.messageService.add(`PersoonService: ${message}`);
}
private handleError<T>(operation = 'operation', result?: T) {
  return (error: any): Observable<T> => {

    // TODO: send the error to remote logging infrastructure
    console.error(error); // log to console instead

    // TODO: better job of transforming error for user consumption
    this.log(`${operation} failed: ${error.message}`);

    // Let the app keep running by returning an empty result.
    return of(result as T);
  };
}

addPersoon(persoon: Persoon): Observable<Persoon> {
  return this.http.post<Persoon>(this.personenUrl, persoon, this.httpOptions).pipe(
    tap((newHero: Persoon) => this.log(`added hero w/ id=${newHero.id}`)),
    catchError(this.handleError<Persoon>('addHero'))
  );
}


/** PUT: update the hero on the server */
updatePersoon(persoon: Persoon): Observable<any> {
  return this.http.put(this.personenUrl, persoon, this.httpOptions).pipe(
    tap(res =>{
      this.log(`updated persoon id=${persoon.id}`)
      // HERE BE DRAGONS
      this.getPersonen().subscribe(personen => this.personen$.next(personen))
    }),
    catchError(this.handleError<Persoon[]>('updatePersoon'))
  );
}

/** DELETE: delete the hero from the server */
deletePersoon(id: number): Observable<Persoon> {
  const url = `${this.personenUrl}/${id}`;

  return this.http.delete<Persoon>(url, this.httpOptions).pipe(
    tap(_ => this.log(`deleted persoon id=${id}`)),
    catchError(this.handleError<Persoon>('deletePersoon'))
  );
}

/* GET heroes whose name contains search term */
searchPersonen(term: string): Observable<Persoon[]> {
  if (!term.trim()) {
    // if not search term, return empty hero array.
    return of([]);
  }
  return this.http.get<Persoon[]>(`${this.personenUrl}/?naam=${term}`).pipe(
    tap(x => x.length ?
       this.log(`found personen matching "${term}"`) :
       this.log(`no personen matching "${term}"`)),
    catchError(this.handleError<Persoon[]>('searchPersonen', []))
  );
}

httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

  constructor(private http: HttpClient, private messageService: MessageService) { }
}
