import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FtpInputComponent } from './ftp-input.component';

describe('FtpInputComponent', () => {
  let component: FtpInputComponent;
  let fixture: ComponentFixture<FtpInputComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FtpInputComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FtpInputComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
