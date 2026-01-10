import { Component, Input } from '@angular/core';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-step-adquirentes',
  imports: [CommonModule, ReactiveFormsModule, FormsModule],
  templateUrl: './step-adquirentes.html',
  styleUrl: './step-adquirentes.css',
})
export class StepAdquirentes {
  @Input() formGroup!: FormGroup;

  novoAdquirente = {
    nome: '',
    documento: '',
    participacao: ''
  };

  contato = {
    email: '',
    confirmeEmail: '',
    celular: '',
    confirmeCelular: '',
    aceitaTermos: false
  };

  adquirentes: any[] = [];
  private nextId = 1;

  get emailsMatch(): boolean {
    return this.contato.email === this.contato.confirmeEmail;
  }

  get celularesMatch(): boolean {
    return this.contato.celular === this.contato.confirmeCelular;
  }

  get totalParticipacao(): number {
    return this.adquirentes.reduce((total, adq) => {
      const participacao = parseFloat(adq.participacao.replace('%', '').replace(',', '.')) || 0;
      return total + participacao;
    }, 0);
  }

  get novaParticipacaoExcederia(): boolean {
    const novaParticipacao = parseFloat(this.novoAdquirente.participacao.replace('%', '').replace(',', '.')) || 0;
    return (this.totalParticipacao + novaParticipacao) > 100;
  }

  get participacaoStatus(): string {
    const total = this.totalParticipacao;
    if (total === 100) return 'valid';
    if (total > 100) return 'exceeded';
    return 'insufficient';
  }

  get participacaoRestante(): number {
    return Math.max(0, 100 - this.totalParticipacao);
  }

  get podeAdicionar(): boolean {
    return !!this.novoAdquirente.nome && 
           !!this.novoAdquirente.documento && 
           !!this.novoAdquirente.participacao && 
           !this.novaParticipacaoExcederia;
  }

  adicionarAdquirente() {
    if (this.podeAdicionar) {
      this.adquirentes.push({
        id: this.nextId++,
        nome: this.novoAdquirente.nome,
        documento: this.novoAdquirente.documento,
        participacao: this.novoAdquirente.participacao,
        principal: this.adquirentes.length === 0
      });
      this.novoAdquirente = { nome: '', documento: '', participacao: '' };
    }
  }

  removerAdquirente(id: number) {
    this.adquirentes = this.adquirentes.filter(a => a.id !== id);
  }

  setPrincipalAdquirente(id: number) {
    this.adquirentes.forEach(a => a.principal = (a.id === id));
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
      value = value.substring(0, 14);
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
    
    this.novoAdquirente.documento = value;
    event.target.value = value;
  }

  onCelularInput(event: any, field: 'celular' | 'confirmeCelular') {
    let value = event.target.value.replace(/\D/g, '');
    
    if (value.length > 0) {
      if (value.length <= 10) {
        // (00) 0000-0000
        value = value.replace(/(\d{2})(\d{4})(\d{0,4})/, '($1) $2-$3');
      } else {
        // (00) 0 0000-0000
        value = value.replace(/(\d{2})(\d{1})(\d{4})(\d{0,4})/, '($1) $2 $3-$4');
      }
    }
    
    this.contato[field] = value;
    event.target.value = value;
  }

  onPaste(event: Event) {
    event.preventDefault();
  }

  onParticipacaoInput(event: any) {
    let value = event.target.value.replace(/[^\d,]/g, '');
    
    // Limit to 2 decimal places
    const parts = value.split(',');
    if (parts[1] && parts[1].length > 2) {
      parts[1] = parts[1].substring(0, 2);
      value = parts.join(',');
    }
    
    // Add % at the end
    if (value && !value.endsWith('%')) {
      value = value + '%';
    }
    
    this.novoAdquirente.participacao = value;
    event.target.value = value;
  }
}