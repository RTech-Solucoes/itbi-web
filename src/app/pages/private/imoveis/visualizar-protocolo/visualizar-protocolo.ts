import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ProtocoloPipe } from '../../../../pipes/protocolo.pipe';

@Component({
  selector: 'app-visualizar-protocolo',
  imports: [CommonModule, ProtocoloPipe],
  templateUrl: './visualizar-protocolo.html',
  styleUrl: './visualizar-protocolo.css'
})
export class VisualizarProtocolo implements OnInit {
  nrProtocolo = '';

  dadosProtocolo = [
    { label: 'PROTOCOLO', value: this.nrProtocolo },
    { label: 'STATUS DO PROTOCOLO', value: 'Em Contestação' },
    { label: 'STATUS DO PAGAMENTO ITBI', value: 'Pendente' },
    { label: 'DATA SOLICITAÇÃO', value: '10/01/2025' },
    { label: 'STATUS DO ACEITE FISCAL', value: 'Aguardando' },
    { label: 'Nº PROCESSO PAT', value: 'PAT-2025-001' },
    { label: 'STATUS PAGAMENTO AVALIAÇÃO', value: 'Pago' }
  ];

  dadosTransmissao = [
    { label: 'NATUREZA DA TRANSAÇÃO', value: 'Compra e Venda' },
    { label: 'FRAÇÃO IDEAL', value: '100% - R$ 350.000,00' },
    { label: 'VALOR DECLARADO', value: 'R$ 350.000,00' },
    { label: 'VALOR FINANCIADO', value: 'R$ 280.000,00' },
    { label: 'TIPO IMÓVEL', value: 'Urbano' },
    { label: 'TIPO TRIBUTAÇÃO', value: 'SFH' },
    { label: 'BASE DE CÁLCULO', value: 'R$ 70.000,00' },
    { label: 'DATA CONCLUSÃO', value: '15/01/2025' }
  ];

  dadosImovel = {
    endereco: 'Rua das Flores, 123 - Centro - Uberlândia/MG - CEP: 38400-000'
  };

  dadosImovelDetalhes = [
    { label: 'QUADRA/LOTE', value: 'Q-15 L-08' },
    { label: 'MATRÍCULA', value: '12345' },
    { label: 'DATA EMISSÃO MATRÍCULA', value: '10/12/2024' },
    { label: 'CARTÓRIO', value: '1º Ofício de Registro de Imóveis' }
  ];

  inscricoesImoveis = [
    {
      id: 1,
      principal: true,
      inscricaoImobiliaria: '00.02.0202.05.19.0001.0001',
      complemento: 'Casa Principal',
      areaTerreno: '250,00 m²',
      areaConstruida: '180,00 m²'
    }
  ];

  transmitentes = [
    { id: 1, principal: true, nome: 'João Silva Santos', documento: '12345678901' }
  ];

  adquirentes = [
    { id: 1, principal: true, nome: 'Pedro Almeida Souza', documento: '11122233344', participacao: '100,00%' }
  ];

  usufrutos: any[] = [];

  arquivosAnexados = [
    { id: 1, nome: 'Matricula_Imovel_Atualizada.pdf', tamanho: '2.1 MB' },
    { id: 2, nome: 'Contrato_Compra_Venda.pdf', tamanho: '1.8 MB' }
  ];

  constructor(private route: ActivatedRoute) {}

  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      this.nrProtocolo = params['protocolo'] || '';
      this.dadosProtocolo[0].value = this.nrProtocolo;
    });
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
    alert(`Abrindo arquivo: ${arquivo.nome}`);
  }

  emitirProtocolo() {
    console.log('Emitir protocolo:', this.nrProtocolo);
  }

  cancelarDeclaracao() {
    console.log('Cancelar declaração:', this.nrProtocolo);
  }
}
