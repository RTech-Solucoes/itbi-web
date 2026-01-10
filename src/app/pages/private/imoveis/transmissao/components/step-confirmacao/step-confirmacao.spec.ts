import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StepConfirmacao } from './step-confirmacao';

describe('StepConfirmacao', () => {
  let component: StepConfirmacao;
  let fixture: ComponentFixture<StepConfirmacao>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [StepConfirmacao]
    })
    .compileComponents();

    fixture = TestBed.createComponent(StepConfirmacao);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
