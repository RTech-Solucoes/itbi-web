import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NgxMaskDirective, provideNgxMask } from 'ngx-mask';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule, NgxMaskDirective],
  providers: [provideNgxMask()],
  templateUrl: './login.html',
  styleUrl: './login.css'
})
export class LoginComponent {
  cpfCnpj = '';
  senha = '';

  get cpfCnpjMask(): string {
    const cleanValue = this.cpfCnpj.replace(/\D/g, '');
    return cleanValue.length <= 11 ? '000.000.000-00' : '00.000.000/0000-00';
  }

  onSubmit() {
    window.location.href = '/home';
  }

  onForgotPassword() {
    console.log('Forgot password clicked');
  }

  onRegister() {
    window.location.href = '/register';
  }
}