import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TransmissaoForm } from './transmissao-form';

describe('TransmissaoForm', () => {
  let component: TransmissaoForm;
  let fixture: ComponentFixture<TransmissaoForm>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TransmissaoForm]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TransmissaoForm);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
