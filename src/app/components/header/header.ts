import { Component } from '@angular/core';

@Component({
  selector: 'app-header',
  imports: [],
  templateUrl: './header.html',
  styleUrl: './header.css'
})
export class HeaderComponent {
  nomePrefeitura = 'São Paulo'; // Altere aqui o nome da prefeitura
  nomeUsuario = 'João Silva';
}