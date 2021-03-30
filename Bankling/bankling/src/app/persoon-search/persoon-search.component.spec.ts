import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PersoonSearchComponent } from './persoon-search.component';

describe('PersoonSearchComponent', () => {
  let component: PersoonSearchComponent;
  let fixture: ComponentFixture<PersoonSearchComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PersoonSearchComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PersoonSearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
