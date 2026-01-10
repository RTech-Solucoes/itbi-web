import { Component, Input } from '@angular/core';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-step-transmissao',
  imports: [CommonModule, ReactiveFormsModule, FormsModule],
  templateUrl: './step-transmissao.html',
  styleUrl: './step-transmissao.css',
})
export class StepTransmissao {
  @Input() formGroup!: FormGroup;
  @Input() financiamentoSFH = 'nao';
  @Input() itbiPagoAnteriormente = 'nao';
  @Input() isencaoImunidade = 'nao';

  novoUsufruto = {
    nome: '',
    documento: ''
  };

  usufrutos: any[] = [];
  private nextId = 1;

  get transmissaoForm() {
    return this.formGroup.get('transmissao') as FormGroup;
  }

  adicionarUsufruto() {
    if (this.novoUsufruto.nome && this.novoUsufruto.documento) {
      this.usufrutos.push({
        id: this.nextId++,
        nome: this.novoUsufruto.nome,
        documento: this.novoUsufruto.documento,
        principal: this.usufrutos.length === 0
      });
      this.novoUsufruto = { nome: '', documento: '' };
    }
  }

  removerUsufruto(id: number) {
    this.usufrutos = this.usufrutos.filter(u => u.id !== id);
  }

  setPrincipalUsufruto(id: number) {
    this.usufrutos.forEach(u => u.principal = (u.id === id));
  }

  formatDocument(documento: string): string {
    const numbers = documento.replace(/\D/g, '');
    if (numbers.length === 11) {
      return numbers.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, '$1.$2.$3-$4');
    } else if (numbers.length === 14) {
      return numbers.replace(/(\d{2})(\d{3})(\d{3})(\d{4})(\d{2})/, '$1.$2.$3/$4-$5');
    }
    return documento;
  }

  onDocumentInput(event: any) {
    let value = event.target.value.replace(/\D/g, '');
    
    if (value.length <= 11) {
      // CPF mask
      if (value.length > 9) {
        value = value.replace(/(\d{3})(\d{3})(\d{3})(\d{0,2})/, '$1.$2.$3-$4');
      } else if (value.length > 6) {
        value = value.replace(/(\d{3})(\d{3})(\d{0,3})/, '$1.$2.$3');
      } else if (value.length > 3) {
        value = value.replace(/(\d{3})(\d{0,3})/, '$1.$2');
      }
    } else {
      // CNPJ mask
      value = value.substring(0, 14); // Limit to 14 digits
      if (value.length > 12) {
        value = value.replace(/(\d{2})(\d{3})(\d{3})(\d{4})(\d{0,2})/, '$1.$2.$3/$4-$5');
      } else if (value.length > 8) {
        value = value.replace(/(\d{2})(\d{3})(\d{3})(\d{0,4})/, '$1.$2.$3/$4');
      } else if (value.length > 5) {
        value = value.replace(/(\d{2})(\d{3})(\d{0,3})/, '$1.$2.$3');
      } else if (value.length > 2) {
        value = value.replace(/(\d{2})(\d{0,3})/, '$1.$2');
      }
    }
    
    this.novoUsufruto.documento = value;
    event.target.value = value;
  }

  onFinanciamentoSFHChange(valor: string) {
    this.financiamentoSFH = valor;
    this.formGroup.get('transmissao.financiamentoSFH')?.setValue(valor);
  }

  onItbiPagoAnteriormenteChange(valor: string) {
    this.itbiPagoAnteriormente = valor;
    this.formGroup.get('transmissao.itbiPagoAnteriormente')?.setValue(valor);
  }

  onIsencaoImunidadeChange(valor: string) {
    this.isencaoImunidade = valor;
    this.formGroup.get('transmissao.isencaoImunidade')?.setValue(valor);
  }
}
