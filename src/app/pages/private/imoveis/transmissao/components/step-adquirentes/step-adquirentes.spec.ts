import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StepAdquirentes } from './step-adquirentes';

describe('StepAdquirentes', () => {
  let component: StepAdquirentes;
  let fixture: ComponentFixture<StepAdquirentes>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [StepAdquirentes]
    })
    .compileComponents();

    fixture = TestBed.createComponent(StepAdquirentes);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
