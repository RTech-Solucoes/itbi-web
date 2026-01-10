import { Component, Input } from '@angular/core';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-step-imovel',
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './step-imovel.html',
  styleUrl: './step-imovel.css',
})
export class StepImovel {
  @Input() formGroup!: FormGroup;
  @Input() tipoImovel = 'urbano';
  @Input() inscricoesImoveis: any[] = [];

  get imovelForm() {
    return this.formGroup.get('imovel') as FormGroup;
  }

  onTipoImovelChange(tipo: string) {
    this.tipoImovel = tipo;
    this.formGroup.get('imovel.tipoImovel')?.setValue(tipo);
  }
}
