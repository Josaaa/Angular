import { Component, OnInit } from '@angular/core';
import { Observable, Subject } from 'rxjs';

import {
   debounceTime, distinctUntilChanged, switchMap
 } from 'rxjs/operators';

import { Persoon } from '../persoon';
import { PersoonService } from '../persoon.service';

@Component({
  selector: 'app-persoon-search',
  templateUrl: './persoon-search.component.html',
  styleUrls: ['./persoon-search.component.scss']
})
export class PersoonSearchComponent implements OnInit {

  personen$!: Observable<Persoon[]>;
  private searchTerms = new Subject<string>();

  constructor(private persoonService: PersoonService) {}

  // Push a search term into the observable stream.
  search(term: string): void {
    this.searchTerms.next(term);
  }

  ngOnInit(): void {
    this.personen$ = this.searchTerms.pipe(
      // wait 300ms after each keystroke before considering the term
      debounceTime(300),

      // ignore new term if same as previous term
      distinctUntilChanged(),

      // switch to new search observable each time the term changes
      switchMap((term: string) => this.persoonService.searchPersonen(term)),
    );
  }
}
