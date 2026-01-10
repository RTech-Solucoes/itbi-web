import { Component, Input } from '@angular/core';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-step-confirmacao',
  imports: [CommonModule, ReactiveFormsModule, FormsModule],
  templateUrl: './step-confirmacao.html',
  styleUrl: './step-confirmacao.css',
})
export class StepConfirmacao {
  @Input() formGroup!: FormGroup;

  // Mock data for property inscriptions - in real app this would come from a service
  inscricoesImoveis = [
    {
      id: 1,
      principal: true,
      inscricaoImobiliaria: '00.02.0202.05.19.0001.0001',
      complemento: 'Casa Principal',
      areaTerreno: '250,00 m²',
      areaConstruida: '180,00 m²'
    },
    {
      id: 2,
      principal: false,
      inscricaoImobiliaria: '00.02.0202.05.19.0001.0002',
      complemento: 'Garagem',
      areaTerreno: '50,00 m²',
      areaConstruida: '25,00 m²'
    }
  ];

  // Mock data for transmitentes
  transmitentes = [
    {
      id: 1,
      principal: true,
      nome: 'João Silva Santos',
      documento: '12345678901'
    },
    {
      id: 2,
      principal: false,
      nome: 'Maria Oliveira Costa',
      documento: '98765432100'
    }
  ];

  // Mock data for adquirentes
  adquirentes = [
    {
      id: 1,
      principal: true,
      nome: 'Pedro Almeida Souza',
      documento: '11122233344',
      participacao: '60,00%'
    },
    {
      id: 2,
      principal: false,
      nome: 'Ana Carolina Lima',
      documento: '55566677788',
      participacao: '40,00%'
    }
  ];

  // Mock data for usufrutos - empty by default, only shows if there are items
  usufrutos = [
    {
      id: 1,
      principal: true,
      nome: 'Carlos Eduardo Ferreira',
      documento: '33344455566'
    }
  ];

  // Mock data for attached files
  arquivosAnexados = [
    {
      id: 1,
      nome: 'Matricula_Imovel_Atualizada.pdf',
      tamanho: '2.1 MB',
      tipo: 'matricula'
    },
    {
      id: 2,
      nome: 'Contrato_Compra_Venda.pdf',
      tamanho: '1.8 MB',
      tipo: 'contrato'
    },
    {
      id: 3,
      nome: 'Documentos_Transmitente.pdf',
      tamanho: '950 KB',
      tipo: 'docs-transmitente'
    },
    {
      id: 4,
      nome: 'Documentos_Adquirente.pdf',
      tamanho: '1.2 MB',
      tipo: 'docs-adquirente'
    }
  ];

  // Contact data - editable fields
  dadosContato = {
    email: '',
    confirmeEmail: '',
    celular: '',
    confirmeCelular: '',
    observacoes: ''
  };

  // Mandatory declarations
  declaracoes = {
    adquirentesTransmitentes: false,
    todosOsDados: false
  };

  get emailsMatch(): boolean {
    return this.dadosContato.email === this.dadosContato.confirmeEmail;
  }

  get celularesMatch(): boolean {
    return this.dadosContato.celular === this.dadosContato.confirmeCelular;
  }

  get dadosTransmissao() {
    const transmissao = this.formGroup.get('transmissao')?.value || {};
    const imovel = this.formGroup.get('imovel')?.value || {};
    
    return [
      {
        label: 'NATUREZA DA TRANSAÇÃO',
        value: transmissao.naturezaTransmissao || 'Não informado'
      },
      {
        label: 'FRAÇÃO IDEAL',
        value: transmissao.percentualFracao && transmissao.valorFracao 
          ? `${transmissao.percentualFracao} - ${transmissao.valorFracao}`
          : 'Não informado'
      },
      {
        label: 'VALOR DECLARADO',
        value: transmissao.valor ? `R$ ${transmissao.valor}` : 'Não informado'
      },
      {
        label: 'VALOR FINANCIADO',
        value: transmissao.valorFinanciado ? `R$ ${transmissao.valorFinanciado}` : 'Não informado'
      },
      {
        label: 'TIPO IMÓVEL',
        value: imovel.tipoImovel === 'urbano' ? 'Urbano' : 'Rural'
      },
      {
        label: 'TIPO TRIBUTAÇÃO',
        value: transmissao.financiamentoSFH === 'sim' ? 'SFH' : 'Normal'
      },
      {
        label: 'BASE DE CÁLCULO',
        value: transmissao.valorNaoFinanciado ? `R$ ${transmissao.valorNaoFinanciado}` : 'Não informado'
      },
      {
        label: 'DATA CONCLUSÃO',
        value: new Date().toLocaleDateString('pt-BR')
      }
    ];
  }

  get dadosImovel() {
    const imovel = this.formGroup.get('imovel')?.value || {};
    return {
      endereco: imovel.endereco || 'Não informado'
    };
  }

  get dadosImovelDetalhes() {
    const imovel = this.formGroup.get('imovel')?.value || {};
    
    return [
      {
        label: 'QUADRA/LOTE',
        value: imovel.quadraLote || 'Não informado'
      },
      {
        label: 'MATRÍCULA',
        value: imovel.matricula || 'Não informado'
      },
      {
        label: 'DATA EMISSÃO MATRÍCULA',
        value: imovel.dataEmissaoMatricula || 'Não informado'
      },
      {
        label: 'CARTÓRIO',
        value: imovel.cartorioRegistro || 'Não informado'
      }
    ];
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

  openFile(arquivo: any) {
    // In a real application, this would open the actual file
    // For now, we'll just show an alert
    alert(`Abrindo arquivo: ${arquivo.nome}`);
    // Real implementation would be:
    // window.open(arquivo.url, '_blank');
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
    
    this.dadosContato[field] = value;
    event.target.value = value;
  }

  onPaste(event: Event) {
    event.preventDefault();
  }
}