import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { QuizSearchComponent } from './quiz-search.component';

describe('QuizSearchComponent', () => {
  let component: QuizSearchComponent;
  let fixture: ComponentFixture<QuizSearchComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ QuizSearchComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(QuizSearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
