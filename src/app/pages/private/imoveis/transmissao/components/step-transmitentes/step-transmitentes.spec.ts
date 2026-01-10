import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StepTransmitentes } from './step-transmitentes';

describe('StepTransmitentes', () => {
  let component: StepTransmitentes;
  let fixture: ComponentFixture<StepTransmitentes>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [StepTransmitentes]
    })
    .compileComponents();

    fixture = TestBed.createComponent(StepTransmitentes);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
