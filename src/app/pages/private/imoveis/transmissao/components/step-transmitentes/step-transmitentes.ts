import { Component, Input } from '@angular/core';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-step-transmitentes',
  imports: [CommonModule, ReactiveFormsModule, FormsModule],
  templateUrl: './step-transmitentes.html',
  styleUrl: './step-transmitentes.css',
})
export class StepTransmitentes {
  @Input() formGroup!: FormGroup;

  novoTransmitente = {
    nome: '',
    documento: ''
  };

  transmitentes: any[] = [];
  private nextId = 1;

  adicionarTransmitente() {
    if (this.novoTransmitente.nome && this.novoTransmitente.documento) {
      this.transmitentes.push({
        id: this.nextId++,
        nome: this.novoTransmitente.nome,
        documento: this.novoTransmitente.documento,
        principal: this.transmitentes.length === 0
      });
      this.novoTransmitente = { nome: '', documento: '' };
    }
  }

  removerTransmitente(id: number) {
    this.transmitentes = this.transmitentes.filter(t => t.id !== id);
  }

  setPrincipalTransmitente(id: number) {
    this.transmitentes.forEach(t => t.principal = (t.id === id));
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
    
    this.novoTransmitente.documento = value;
    event.target.value = value;
  }
}