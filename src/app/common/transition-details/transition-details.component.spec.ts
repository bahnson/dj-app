import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TransitionDetailsComponent } from './transition-details.component';

describe('TransitionDetailsComponent', () => {
  let component: TransitionDetailsComponent;
  let fixture: ComponentFixture<TransitionDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TransitionDetailsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TransitionDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
