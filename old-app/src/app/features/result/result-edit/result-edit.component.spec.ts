import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ResultEditComponent } from './result-edit.component';

describe('ResultEditComponent', () => {
  let component: ResultEditComponent;
  let fixture: ComponentFixture<ResultEditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ResultEditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ResultEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
