import { Component } from '@angular/core';

@Component({
  selector: 'app-valores-abertura-pat',
  imports: [],
  templateUrl: './valores-abertura-pat.html',
  styleUrl: './valores-abertura-pat.css'
})
export class ValoresAberturaPat {
  valores = [
    {
      codigo: '001',
      tipoImovel: 'Residencial',
      avaliacaoInicial: 'R$ 100.000,00',
      avaliacaoFinal: 'R$ 500.000,00',
      diferencaMinimaPat: 'R$ 50.000,00'
    },
    {
      codigo: '002',
      tipoImovel: 'Comercial',
      avaliacaoInicial: 'R$ 200.000,00',
      avaliacaoFinal: 'R$ 1.000.000,00',
      diferencaMinimaPat: 'R$ 100.000,00'
    },
    {
      codigo: '003',
      tipoImovel: 'Industrial',
      avaliacaoInicial: 'R$ 500.000,00',
      avaliacaoFinal: 'R$ 2.000.000,00',
      diferencaMinimaPat: 'R$ 200.000,00'
    }
  ];
}
