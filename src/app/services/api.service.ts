import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

/**
 * Service para comunicação com a API
 *
 * A URL da API vem do environment:
 * - Desenvolvimento local: http://localhost:8080/api
 * - Produção/Desenvolvimento: api.itbi (será substituído por $API_URL no Docker)
 */
@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private readonly apiUrl = environment.apiUrl;

  constructor(private http: HttpClient) {
    console.log('API URL configurada:', this.apiUrl);

  }

}
