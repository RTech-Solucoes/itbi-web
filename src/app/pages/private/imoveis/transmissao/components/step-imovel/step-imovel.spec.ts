import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StepImovel } from './step-imovel';

describe('StepImovel', () => {
  let component: StepImovel;
  let fixture: ComponentFixture<StepImovel>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [StepImovel]
    })
    .compileComponents();

    fixture = TestBed.createComponent(StepImovel);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
