import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.css'
})
export class DashboardComponent {
  kpis = [
    {
      title: 'Total de Declarações',
      value: 1247,
      icon: '/assets/dashboard/icon_1.svg'
    },
    {
      title: 'Concluídas',
      value: 892,
      icon: '/assets/dashboard/icon_2.svg'
    },
    {
      title: 'Aguardando Análise',
      value: 234,
      icon: '/assets/dashboard/icon_3.svg'
    },
    {
      title: 'Em Contestação',
      value: 121,
      icon: '/assets/dashboard/icon_4.svg'
    }
  ];

  declaracoes = [
    {
      status: 'CONCLUÍDO COM PAT',
      protocolo: '0.093.968/25-67',
      solicitacao: '01/09/2025',
      imovel: '00.02.0202.05.19.0001.0001',
      avalAutomatica: 'NÃO'
    },
    {
      status: 'AGUARDANDO ANÁLISE',
      protocolo: '0.094.125/25-12',
      solicitacao: '05/09/2025',
      imovel: '00.02.0202.05.19.0002.0001',
      avalAutomatica: 'SIM'
    },
    {
      status: 'EM CONTESTAÇÃO',
      protocolo: '0.094.256/25-33',
      solicitacao: '10/09/2025',
      imovel: '00.02.0202.05.19.0003.0001',
      avalAutomatica: 'NÃO'
    },
    {
      status: 'CONCLUÍDO',
      protocolo: '0.094.387/25-45',
      solicitacao: '15/09/2025',
      imovel: '00.02.0202.05.19.0004.0001',
      avalAutomatica: 'SIM'
    },
    {
      status: 'AGUARDANDO ANÁLISE',
      protocolo: '0.094.498/25-78',
      solicitacao: '20/09/2025',
      imovel: '00.02.0202.05.19.0005.0001',
      avalAutomatica: 'NÃO'
    }
  ];
}
