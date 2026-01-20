import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { NgxMaskDirective, provideNgxMask } from 'ngx-mask';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-consultar-protocolo',
  imports: [NgxMaskDirective, FormsModule],
  providers: [provideNgxMask()],
  templateUrl: './consultar-protocolo.html',
  styleUrl: './consultar-protocolo.css'
})
export class ConsultarProtocolo {
  protocolo = '';

  constructor(private router: Router) {}

  consultar() {
    if (this.protocolo) {
      this.router.navigate(['/imoveis/visualizar-protocolo'], {
        queryParams: { protocolo: this.protocolo }
      });
    }
  }
}
