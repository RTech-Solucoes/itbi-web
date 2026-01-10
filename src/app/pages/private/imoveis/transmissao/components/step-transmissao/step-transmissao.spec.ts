import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StepTransmissao } from './step-transmissao';

describe('StepTransmissao', () => {
  let component: StepTransmissao;
  let fixture: ComponentFixture<StepTransmissao>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [StepTransmissao]
    })
    .compileComponents();

    fixture = TestBed.createComponent(StepTransmissao);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
