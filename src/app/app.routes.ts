import { Routes } from '@angular/router';
import { AttackComponent } from './attack/attack.component';  // Importe os componentes

export const appRoutes: Routes = [
  { path: '', component: AttackComponent, pathMatch: 'full' },  // Defina a rota principal
];