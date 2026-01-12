import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NgxMaskDirective, provideNgxMask } from 'ngx-mask';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule, FormsModule, NgxMaskDirective],
  providers: [provideNgxMask()],
  templateUrl: './register.html',
  styleUrl: './register.css'
})
export class RegisterComponent {
  cpfCnpj = '';
  nomeCompleto = '';
  celular = '';
  dataNascimento = '';
  email = '';
  confirmacaoEmail = '';
  senha = '';

  get cpfCnpjMask(): string {
    const cleanValue = this.cpfCnpj.replace(/\D/g, '');
    return cleanValue.length <= 11 ? '000.000.000-00' : '00.000.000/0000-00';
  }

  onSubmit() {
    console.log('Register attempt:', {
      cpfCnpj: this.cpfCnpj,
      nomeCompleto: this.nomeCompleto,
      celular: this.celular,
      dataNascimento: this.dataNascimento,
      email: this.email,
      confirmacaoEmail: this.confirmacaoEmail,
      senha: this.senha
    });
  }
}