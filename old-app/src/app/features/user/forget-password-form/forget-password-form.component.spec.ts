import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ForgetPasswordFormComponent } from './forget-password-form.component';

describe('ForgetPasswordFormComponent', () => {
  let component: ForgetPasswordFormComponent;
  let fixture: ComponentFixture<ForgetPasswordFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ForgetPasswordFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ForgetPasswordFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
