import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HeartRateInputComponent } from './heart-rate-input.component';

describe('HeartRateInputComponent', () => {
  let component: HeartRateInputComponent;
  let fixture: ComponentFixture<HeartRateInputComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HeartRateInputComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HeartRateInputComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
