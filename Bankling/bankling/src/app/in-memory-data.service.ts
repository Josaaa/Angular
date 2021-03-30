import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { InMemoryDbService } from 'angular-in-memory-web-api';
import { Persoon } from './persoon';

@Injectable({
  providedIn: 'root',
})
export class InMemoryDataService implements InMemoryDbService {
  createDb() {
    const personen = [
      { betalen: 0,bedrag: 60, id: 1, naam: 'Joëlle'},
      { betalen: 0,bedrag: 20, id: 2, naam: 'Lina'},
      { betalen: 0,bedrag: 40, id: 3, naam: 'Luna'},

    ];
    return {personen};
  }


  // Overrides the genId method to ensure that a hero always has an id.
  // If the heroes array is empty,
  // the method below returns the initial number (11).
  // if the heroes array is not empty, the method below returns the highest
  // hero id + 1.
  genId(personen: Persoon[]): number {
    return personen.length > 0 ? Math.max(...personen.map(persoon => persoon.id)) + 1 : 11;
  }
}