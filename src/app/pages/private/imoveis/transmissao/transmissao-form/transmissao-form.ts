import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { StepImovel } from '../components/step-imovel/step-imovel';
import { StepTransmissao } from '../components/step-transmissao/step-transmissao';
import { StepTransmitentes } from '../components/step-transmitentes/step-transmitentes';
import { StepAdquirentes } from '../components/step-adquirentes/step-adquirentes';
import { StepAnexos } from '../components/step-anexos/step-anexos';
import { StepConfirmacao } from '../components/step-confirmacao/step-confirmacao';

@Component({
  selector: 'app-transmissao-form',
  imports: [CommonModule, ReactiveFormsModule, StepImovel, StepTransmissao, StepTransmitentes, StepAdquirentes, StepAnexos, StepConfirmacao],
  templateUrl: './transmissao-form.html',
  styleUrl: './transmissao-form.css',
})
export class TransmissaoForm implements OnInit {
  transmissaoForm!: FormGroup;
  currentStep = 0;
  tipoImovel = 'urbano';
  
  // Controles para switches da transmissão
  financiamentoSFH = 'nao';
  itbiPagoAnteriormente = 'nao';
  isencaoImunidade = 'nao';
  
  // Dados mockados para a tabela
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
  
  steps = [
    { id: 'imovel', title: 'Dados do Imóvel', completed: false },
    { id: 'transmissao', title: 'Transmissão', completed: false },
    { id: 'transmitentes', title: 'Transmitentes', completed: false },
    { id: 'adquirentes', title: 'Adquirentes', completed: false },
    { id: 'anexos', title: 'Anexos', completed: false },
    { id: 'confirmacao', title: 'Confirmar Declaração', completed: false }
  ];

  constructor(private fb: FormBuilder) {}

  ngOnInit() {
    this.initForm();
  }

  initForm() {
    this.transmissaoForm = this.fb.group({
      // Dados do Imóvel
      imovel: this.fb.group({
        tipoImovel: ['urbano'],
        // Campos urbanos
        inscricaoCadastral: [''],
        endereco: [''],
        quadraLote: [''],
        // Campos rurais
        localidadeDistrito: [''],
        referencia: [''],
        // Campos comuns
        matricula: [''],
        dataEmissaoMatricula: [''],
        cartorioRegistro: [''],
        // Campos rurais adicionais
        areaTerreno: [''],
        areaConstruida: ['']
      }),
      // Transmitentes
      transmitentes: this.fb.array([]),
      // Adquirentes
      adquirentes: this.fb.array([]),
      // Transmissão
      transmissao: this.fb.group({
        naturezaTransmissao: [''],
        compraTotalParcial: [''],
        percentualFracao: [''],
        valorFracao: [''],
        financiamentoSFH: ['nao'],
        itbiPagoAnteriormente: ['nao'],
        isencaoImunidade: ['nao'],
        valorItbiPago: [''],
        valor: [''],
        valorFinanciado: [''],
        valorNaoFinanciado: ['']
      }),
      // Anexos
      anexos: this.fb.array([]),
      // Confirmação
      confirmacao: this.fb.group({
        aceiteTermos: [false]
      })
    });
  }

  nextStep() {
    if (this.currentStep < this.steps.length - 1) {
      this.steps[this.currentStep].completed = true;
      this.currentStep++;
    }
  }

  prevStep() {
    if (this.currentStep > 0) {
      this.steps[this.currentStep].completed = false;
      this.currentStep--;
    }
  }

  goToStep(stepIndex: number) {
    // Marca steps anteriores como completos
    for (let i = 0; i < stepIndex; i++) {
      this.steps[i].completed = true;
    }
    // Remove completed do step atual e posteriores
    for (let i = stepIndex; i < this.steps.length; i++) {
      this.steps[i].completed = false;
    }
    this.currentStep = stepIndex;
  }

  onSubmit() {
    if (this.transmissaoForm.valid) {
      console.log('Form submitted:', this.transmissaoForm.value);
    }
  }

  onTipoImovelChange(tipo: string) {
    this.tipoImovel = tipo;
    this.transmissaoForm.get('imovel.tipoImovel')?.setValue(tipo);
  }

  onFinanciamentoSFHChange(valor: string) {
    this.financiamentoSFH = valor;
    this.transmissaoForm.get('transmissao.financiamentoSFH')?.setValue(valor);
  }

  onItbiPagoAnteriormenteChange(valor: string) {
    this.itbiPagoAnteriormente = valor;
    this.transmissaoForm.get('transmissao.itbiPagoAnteriormente')?.setValue(valor);
  }

  onIsencaoImunidadeChange(valor: string) {
    this.isencaoImunidade = valor;
    this.transmissaoForm.get('transmissao.isencaoImunidade')?.setValue(valor);
  }
}
