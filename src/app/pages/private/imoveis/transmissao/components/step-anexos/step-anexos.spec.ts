import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StepAnexos } from './step-anexos';

describe('StepAnexos', () => {
  let component: StepAnexos;
  let fixture: ComponentFixture<StepAnexos>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [StepAnexos]
    })
    .compileComponents();

    fixture = TestBed.createComponent(StepAnexos);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
